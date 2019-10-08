/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Iterators } from 'fabric-shim';
//модели
import { Obligation} from '../models/obligationModel'
import { Trade} from '../models/tradeModel'
import { History} from '../models/historyModel'
import { DataResult} from '../models/dataResult';
//модели

//requests
import { AddObligationStatusRequest } from '../requests/obligation/addObligationStatusRequest';
import { GetBycontrID } from '../requests/tradeRequests/getBycontrID';
//requests

///logs
import { AddObligationStatusLog } from '../log_history/addObligationStatusLog';
import { CreateObligationLog } from '../log_history/createObligationLog';
///logs

import { HistoryContract } from './historyController';

import { ValidationObligation } from '../validation/validationObligation';

///enums
import { DescriptionForHistory } from '../enums/descriptionForHistory';
import { TradeLifeStage,TradeLifeStageInfo } from '../enums/tradeLifeStage';
import { PerformanceStatus } from '../enums/performanceStatus';
import { ObligationPartRepo } from '../enums/obligationPartRepo';
///enums


///response
import { GetObligationListResponse } from '../responses/getObligationListResponse';
///response


@Info({title: 'ObligationContract', description: 'My Smart Contract' })
export class ObligationContract extends Contract {

    public async parseStateQueryIterator(stateQueryIterator:Iterators.StateQueryIterator) : Promise<any[]>
    {
        const keys = [];
        const allResults = [];

        let res: Iterators.NextResult;
        while (res == null || !res.done) {
            res = await stateQueryIterator.next();

            if (res.value && res.value.value.toString()) {
                let parsedItem: any;

                try {
                    parsedItem = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    parsedItem = res.value.value.toString('utf8');
                }
                allResults.push(parsedItem);
            }
        }

        await stateQueryIterator.close();

        return allResults;
    }

    @Transaction(false)
    @Returns('boolean')
    public async isExists(ctx: Context,objId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(objId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    @Returns('DataResult<string>')
    public async createObligation(ctx: Context, _obligationStr: string,type:string): Promise<DataResult<string>> {
        var result = new DataResult<string>();
        try{
            var _obligation = new Obligation();
            try{
                _obligation =  JSON.parse(_obligationStr) as Obligation;
            }
            catch(e){
                throw new Error("Error parse json to Obligation");
            }
            const collection = (new Obligation).constructor.name;
            const exists = await this.isExists(ctx,collection+_obligation.id);
            if (exists) {
                throw new Error(`The obligation ${_obligation.id} already exists`);
            }
            _obligation.typeObject=collection;
            const buffer = Buffer.from(JSON.stringify(_obligation));
            await ctx.stub.putState(collection+_obligation.id,buffer);
            const collectionHistory = (new History).constructor.name;
            const historyContract = new HistoryContract();

            var _addCreateObligationLog = new CreateObligationLog();
            _addCreateObligationLog.nameMethod = "createObligationForNewTrade";
            _addCreateObligationLog.obligationId = _obligation.id;
            _addCreateObligationLog.deal_amount = _obligation.deal_amount;
            _addCreateObligationLog.quantitySecurities = _obligation.quantitySecurities;
            _addCreateObligationLog.performanceStatus = _obligation.performanceStatus;

            const _descriptionInfo = JSON.stringify(_addCreateObligationLog);

            var _history = new History();
            _history.WhoMadeChanges = _obligation.initiator;
            _history.contrID= _obligation.idTrade;
            _history.id = collectionHistory+ctx.stub.getTxTimestamp().getSeconds()+_obligation.id;
            _history.Detailing = DescriptionForHistory.CREATE_OBLIGATION.replace("debitorOrCreditor", type =="creditor" ? "кредитора" : "заемщика");
            _history.WhatHasChanged = _descriptionInfo;
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx,_logInfo,"true");
            result.withData("SUCCESS");
            return result;
        }
        catch(e){
            result.withError(`${e}`);
            return result;
        }
    }

    @Transaction(false)
    @Returns('DataResult<Obligation>')
    public async viewObligation(ctx: Context, obligationId: string): Promise<DataResult<Obligation>> {
        var result = new DataResult<Obligation>();
        try{
            const collection = (new Obligation).constructor.name;
            const exists = await this.isExists(ctx,collection+obligationId);
            if (!exists) {
                throw new Error(`The obligation ${obligationId} does not exist`);
            }
            const buffer = await ctx.stub.getState(collection+obligationId);
            const obligation = JSON.parse(buffer.toString()) as Obligation;
            result.withData(obligation);
            return result;
        }
        catch(e){
            result.withError(`${e}`);
            return result;
        }
    }




    @Transaction()
    @Returns('DataResult<string>')
   //"{ \"dealNum\":\"117\", \"commitmentID\":\"com1v2\", \"date\":1560082367, \"User\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":1 }"
   //"{ \"dealNum\":\"117\", \"commitmentID\":\"com2v2\", \"date\":1560082368, \"User\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":1 }"
    public async addObligationStatus(ctx: Context, _addObligationStatusRequestStr :string): Promise<DataResult<string>> {
        var result = new DataResult<string>();
        try{
            var _addObligationStatusRequest = new AddObligationStatusRequest();
            try{
                _addObligationStatusRequest =  JSON.parse(_addObligationStatusRequestStr) as AddObligationStatusRequest;
            }
            catch(e){
                throw new Error("Error parse json from request");
            }
            const resultValidation = ValidationObligation.addObligationStatusObjectIsValid(_addObligationStatusRequest);
            if(!resultValidation.isSuccess){
                throw new Error("Validation error:"+resultValidation.error);
            }
            const collectionTrade = (new Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx,collectionTrade+_addObligationStatusRequest.contrID);
            if (!isExistTrade) {
                throw new Error(`The deal ${_addObligationStatusRequest.contrID} doesn't exists`);
            }

            const bufferReadTrade = await ctx.stub.getState(collectionTrade+_addObligationStatusRequest.contrID);
            const trade = JSON.parse(bufferReadTrade.toString()) as Trade;
            if(trade.lifeStage!=TradeLifeStage.ACCEPT_CONTRACT_CREDITOR && trade.lifeStage!=TradeLifeStage.ADD_PRICE_TO_CONTRACT
                 && trade.lifeStage!=TradeLifeStage.CLOSE_CONTRACT){
                throw new Error(TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }

            const collectionObligation = (new Obligation).constructor.name;
            const exists = await this.isExists(ctx, collectionObligation+ _addObligationStatusRequest.CommitmentID);
            if (!exists) {
                throw new Error(`The obligation ${_addObligationStatusRequest.CommitmentID} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collectionObligation+ _addObligationStatusRequest.CommitmentID);
            var obligation = JSON.parse(bufferRead.toString()) as Obligation;
            if(obligation.performanceStatus==PerformanceStatus.EXECUTED)
            {
                throw new Error(`The obligation is already in status executed`);
            }
            //obligation.initiator = _addObligationStatusRequest.User;
            obligation.performanceStatus=_addObligationStatusRequest.PerformanceStatus;
            if (_addObligationStatusRequest.PerformanceStatus > 0)
            {
                obligation.textDescription = _addObligationStatusRequest.TextDescription;
            }
            else if (_addObligationStatusRequest.PerformanceStatus == 0)
            {
                obligation.textDescription = null;
                obligation.dateExecution = _addObligationStatusRequest.DateTime;
            }
            const buffer = Buffer.from(JSON.stringify(obligation));
            await ctx.stub.putState(collectionObligation+_addObligationStatusRequest.CommitmentID, buffer);

            if(!obligation.is_revaluation)
            {
                
                const bufferForChangeState = await ctx.stub.getQueryResult(`{"selector":{"idTrade":"${_addObligationStatusRequest.contrID}","typeObject":"${collectionObligation}","obligationPartRepo":${obligation.obligationPartRepo},"is_revaluation":false}}`);
                const obligationrForChangeState =(await this.parseStateQueryIterator(bufferForChangeState)) as Obligation[];
                var isNeedChangeLifeStage = true;
                for(var i=0;i<obligationrForChangeState.length;i++){
                    if(obligationrForChangeState[i].id!=_addObligationStatusRequest.CommitmentID)
                        isNeedChangeLifeStage=isNeedChangeLifeStage&&(obligationrForChangeState[i].performanceStatus==PerformanceStatus.EXECUTED);
                }
                isNeedChangeLifeStage=isNeedChangeLifeStage&&(obligation.performanceStatus==PerformanceStatus.EXECUTED);
                if(isNeedChangeLifeStage) 
                {
                    if(trade.lifeStage==TradeLifeStage.ACCEPT_CONTRACT_CREDITOR ){
                        trade.lifeStage=TradeLifeStage.ADD_OBLIGATION_STATUS;
                    }
                
                    if(trade.lifeStage==TradeLifeStage.CLOSE_CONTRACT){
                        trade.lifeStage=TradeLifeStage.ADD_OBLIGATION_STATUS_CLOSE;
                    }
                }
                const bufferTrade = Buffer.from(JSON.stringify(trade));
                await ctx.stub.putState(collectionTrade + trade.dealNum, bufferTrade);
            }


            const collectionHistory = (new History).constructor.name;
            const historyContract = new HistoryContract();
            var _addObligationStatusLog = new AddObligationStatusLog();
            _addObligationStatusLog.nameMethos="confirmDeal";
            _addObligationStatusLog.commitmentID=_addObligationStatusRequest.CommitmentID;
            _addObligationStatusLog.date=_addObligationStatusRequest.DateTime;
            _addObligationStatusLog.textDescription=_addObligationStatusRequest.TextDescription;
            _addObligationStatusLog.performanceStatus=_addObligationStatusRequest.PerformanceStatus;
            const _descriptionInfo = JSON.stringify(_addObligationStatusLog);
            var _history = new History();
            _history.Detailing = DescriptionForHistory.ADD_OBLIGATION_STATUS;
            _history.WhoMadeChanges = _addObligationStatusRequest.WhoMadeChanges;
            _history.WhatHasChanged = _descriptionInfo;
            _history.contrID= _addObligationStatusRequest.contrID;
            
            _history.id = collectionHistory+ctx.stub.getTxTimestamp().getSeconds();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx,_logInfo);
            result.withData("SUCCESS");
            return result;
        }catch(e){
            result.withError(`${e}`);
            return result;
        }
    }


    @Transaction(false)
    @Returns('DataResult<Obligation[]>')
    public async getObligationList(ctx: Context, contrID: string): Promise<DataResult<GetObligationListResponse[]>> {
        var result = new DataResult<GetObligationListResponse[]>();
        try{
            // var _getBycontrID = new GetBycontrID();
            // try {
            //     _getBycontrID = JSON.parse(getBycontrIDStr) as GetBycontrID;
            // }
            // catch (e) {
            //     throw new Error("Error parse json from request");
            // }
            const collectionTrade = (new Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx,collectionTrade+contrID);
            if (!isExistTrade) {
                throw new Error(`The deal ${contrID} doesn't exists`);
            }
            const collection = (new Obligation).constructor.name;
            const buffer = await ctx.stub.getQueryResult(`{"selector":{"idTrade":"${contrID}","typeObject":"${collection}"}}`);
            const obligation =(await this.parseStateQueryIterator(buffer)) as Obligation[];
            let listObligation =[] as GetObligationListResponse[];
            obligation.forEach(element => {
                let newobligation = new GetObligationListResponse();
                newobligation.CommitmentID=element.id;
                newobligation.DateTime=element.dateExecution;
                newobligation.WhoMadeChanges=element.initiator;
                newobligation.TextDescription=element.textDescription;
                newobligation.Amount=element.deal_amount;
                newobligation.QuantitySecurities=element.quantitySecurities;
                newobligation.PerformanceStatus=element.performanceStatus;
                listObligation.push(newobligation);
            });
            result.withData(listObligation);
            return result;
        }catch(e){
            result.withError(`${e}`);
            return result;
        }
    }


}
