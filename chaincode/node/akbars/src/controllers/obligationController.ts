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
            _addCreateObligationLog.amount = _obligation.amount;
            _addCreateObligationLog.quantitySecurities = _obligation.quantitySecurities;
            _addCreateObligationLog.performanceStatus = _obligation.performanceStatus;

            const _descriptionInfo = JSON.stringify(_addCreateObligationLog);

            var _history = new History();
            _history.initiator = _obligation.initiator;
            _history.idTrade= _obligation.idTrade;
            _history.id = collectionHistory+ctx.stub.getTxTimestamp().getSeconds()+_obligation.id;
            _history.description = DescriptionForHistory.CREATE_OBLIGATION.replace("sellerOrBuyer", type =="buyer" ? "кредитора" : "заемщика");
            _history.whatHasChanged = _descriptionInfo;
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
   //"{ \"tradeId\":\"117\", \"commitmentID\":\"com1v2\", \"date\":1560082367, \"whoMadeChanges\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":1 }"
   //"{ \"tradeId\":\"117\", \"commitmentID\":\"com2v2\", \"date\":1560082368, \"whoMadeChanges\":\"admin123\", \"textDescription\":\"change\", \"performanceStatus\":1 }"
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
            const isExistTrade = await this.isExists(ctx,collectionTrade+_addObligationStatusRequest.tradeId);
            if (!isExistTrade) {
                throw new Error(`The trade ${_addObligationStatusRequest.tradeId} doesn't exists`);
            }

            const bufferReadTrade = await ctx.stub.getState(collectionTrade+_addObligationStatusRequest.tradeId);
            const trade = JSON.parse(bufferReadTrade.toString()) as Trade;
            if(trade.lifeStage!=TradeLifeStage.ACCEPT_CONTRACT_SELLER
                 && trade.lifeStage!=TradeLifeStage.CLOSE_CONTRACT){
                throw new Error(TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }

            const collectionObligation = (new Obligation).constructor.name;
            const exists = await this.isExists(ctx, collectionObligation+ _addObligationStatusRequest.commitmentID);
            if (!exists) {
                throw new Error(`The obligation ${_addObligationStatusRequest.commitmentID} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collectionObligation+ _addObligationStatusRequest.commitmentID);
            var obligation = JSON.parse(bufferRead.toString()) as Obligation;
            if(obligation.performanceStatus==PerformanceStatus.EXECUTED)
            {
                throw new Error(`The obligation is already in status executed`);
            }
            //obligation.initiator = _addObligationStatusRequest.whoMadeChanges;
            obligation.performanceStatus=_addObligationStatusRequest.performanceStatus;
            if (_addObligationStatusRequest.performanceStatus > 0)
            {
                obligation.textDescription = _addObligationStatusRequest.textDescription;
            }
            else if (_addObligationStatusRequest.performanceStatus == 0)
            {
                obligation.textDescription = null;
                obligation.dateExecution = _addObligationStatusRequest.date;
            }
            const buffer = Buffer.from(JSON.stringify(obligation));
            await ctx.stub.putState(collectionObligation+_addObligationStatusRequest.commitmentID, buffer);

            const bufferForChangeState = await ctx.stub.getQueryResult(`{"selector":{"idTrade":"${_addObligationStatusRequest.tradeId}","typeObject":"${collectionObligation}","obligationPartRepo":${obligation.obligationPartRepo}}}`);
            const obligationrForChangeState =(await this.parseStateQueryIterator(bufferForChangeState)) as Obligation[];
            var isNeedChangeLifeStage = true;
            for(var i=0;i<obligationrForChangeState.length;i++){
                if(obligationrForChangeState[i].id!=_addObligationStatusRequest.commitmentID)
                    isNeedChangeLifeStage=isNeedChangeLifeStage&&(obligationrForChangeState[i].performanceStatus==PerformanceStatus.EXECUTED);
            }
            isNeedChangeLifeStage=isNeedChangeLifeStage&&(obligation.performanceStatus==PerformanceStatus.EXECUTED);
            if(isNeedChangeLifeStage) 
            {
                if(trade.lifeStage==TradeLifeStage.ACCEPT_CONTRACT_SELLER ){
                    trade.lifeStage=TradeLifeStage.ADD_OBLIGATION_STATUS;
                }

                if(trade.lifeStage==TradeLifeStage.CLOSE_CONTRACT){
                    trade.lifeStage=TradeLifeStage.ADD_OBLIGATION_STATUS_CLOSE;
                }
            }
            const bufferTrade = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + trade.id, bufferTrade);

            const collectionHistory = (new History).constructor.name;
            const historyContract = new HistoryContract();
            var _addObligationStatusLog = new AddObligationStatusLog();
            _addObligationStatusLog.nameMethos="acceptContract";
            _addObligationStatusLog.commitmentID=_addObligationStatusRequest.commitmentID;
            _addObligationStatusLog.date=_addObligationStatusRequest.date;
            _addObligationStatusLog.textDescription=_addObligationStatusRequest.textDescription;
            _addObligationStatusLog.performanceStatus=_addObligationStatusRequest.performanceStatus;
            const _descriptionInfo = JSON.stringify(_addObligationStatusLog);
            var _history = new History();
            _history.description = DescriptionForHistory.ADD_OBLIGATION_STATUS;
            _history.initiator = _addObligationStatusRequest.whoMadeChanges;
            _history.whatHasChanged = _descriptionInfo;
            _history.idTrade= _addObligationStatusRequest.tradeId;
            
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
    public async getObligationList(ctx: Context, tradeId: string): Promise<DataResult<Obligation[]>> {
        var result = new DataResult<Obligation[]>();
        try{
            const collection = (new Obligation).constructor.name;
            const buffer = await ctx.stub.getQueryResult(`{"selector":{"idTrade":"${tradeId}","typeObject":"${collection}"}}`);
            const obligation =(await this.parseStateQueryIterator(buffer)) as Obligation[];
            result.withData(obligation);
            return result;
        }catch(e){
            result.withError(`${e}`);
            return result;
        }
    }


}
