/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { StateQueryResponse, Iterators } from 'fabric-shim';

///модели
import { Trade, SUO, ContrSigned } from '../models/tradeModel'
import { History } from '../models/historyModel'
import { Obligation } from '../models/obligationModel'
import { DataResult } from '../models/dataResult'
///модели

///enum
import { TradeState } from '../enums/tradeState';
import { PerformanceStatus } from '../enums/performanceStatus';
import { TradeLifeStage, TradeLifeStageInfo } from '../enums/tradeLifeStage';
import { DescriptionForHistory } from '../enums/descriptionForHistory';
import { ObligationPartRepo } from '../enums/obligationPartRepo';
///enum


///Requests
import { CloseTradeRequest } from '../requests/tradeRequests/closeTradeRequest';
import { AcceptTradeRequest } from '../requests/tradeRequests/acceptTradeRequest';
import { AddTradeRequest } from '../requests/tradeRequests/addTradeRequest';
import { AddSignToTradeRequest } from '../requests/tradeRequests/addSignToTradeRequest';
import { UpdTradeRequest } from '../requests/tradeRequests/updTradeRequest';
import { AddPriceToTradeRequest } from '../requests/tradeRequests/addPriceToTradeRequest';
///Requests

///logs
import { AcceptTradeLog } from '../log_history/acceptTradeLog';
import { AddTradeLog } from '../log_history/addTradeLog';
import { CloseTradeLog } from '../log_history/closeTradeLog';
import { UpdTradeLog } from '../log_history/updTradeLog';
import { AddSignToTradeLog } from '../log_history/addSignToTradeLog';
import { AddPriceToTradeLog } from '../log_history/addPriceToTradeLog';
///logs


///validation
import { ValidationTrade } from '../validation/validationTrade';
///validation

///Responses
import { AddPriceToTradeResponse } from '../responses/addPriceToTradeResponse';

///Responses

import { HistoryContract } from './historyController';
import { ObligationContract } from './obligationController';


@Info({ title: 'TradeContract', description: 'My Smart Contract' })
export class TradeContract extends Contract {

    public async parseStateQueryIterator(stateQueryIterator: Iterators.StateQueryIterator): Promise<any[]> {
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
    public async isExists(ctx: Context, tradeId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(tradeId);
        return (!!buffer && buffer.length > 0);
    }


    //"{\"id\":\"116\",\"collateral\":{\"discount\":91,\"price_types_priority\":\"124325\",\"quantity\":999,\"security_code\":\"code123\",\"security_isin\":\"isin123\",\"security_name\":\"name123\"},\"collateral_Buyer\":{\"code\":\"11\",\"short_name\":\"name11\"},\"collateral_Seller\":{\"code\":\"11\",\"short_name\":\"name11\"},\"commitmentID1\":\"com1v3\",\"commitmentID2\":\"com2v3\",\"master_agreement\":{\"code\":\"code123\",\"date\":1560000190},\"suo\":{\"auto_margin\":\"Y\",\"return_var\":\"return_var\",\"reuse\":\"Y\",\"shift_term_date\":\"shift_term_date\"},\"whoMadeChanges\":\"admin123\", \"deal_num\":\"num1241\", \"deal_date\":1560000190, \"leg1_date\":1560000190, \"leg2_date\":1560000190, \"amount\":2142, \"currency\":\"BTC\", \"leg1_deal_type\":\"DVP1\", \"threshold1\":2.0, \"threshold2\":999.0, \"repo_rate\":3252, \"int_meth\":\"365/366\"}"
    @Transaction()
    @Returns('DataResult<string>')
    public async addTrade(ctx: Context, addTradeRequestStr: string): Promise<DataResult<string>> {
        var result =new DataResult<string>();
        try {
            var _addTradeRequest = new AddTradeRequest();
            try {
                _addTradeRequest = JSON.parse(addTradeRequestStr) as AddTradeRequest;
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = ValidationTrade.addTradeObjectIsValid(_addTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collection = (new Trade).constructor.name;

            const exists = await this.isExists(ctx, collection + _addTradeRequest.id);
            if (exists) {
                throw new Error(`The trade ${_addTradeRequest.id} already exists`);
            }

            //////проверяем есть ли такие айди обязательств
            const collectionObligation = (new Obligation).constructor.name;
            const existscommitmentID1 = await this.isExists(ctx,collectionObligation+_addTradeRequest.commitmentID1);
            if (existscommitmentID1) {
                throw new Error(`The obligation ${_addTradeRequest.commitmentID1} already exists`);
            }
            const existscommitmentID2 = await this.isExists(ctx,collection+_addTradeRequest.commitmentID2);
            if (existscommitmentID2) {
                throw new Error(`The obligation ${_addTradeRequest.commitmentID2} already exists`);
            }
            //////

            var _newtrade = new Trade();

            _newtrade.typeObject = collection;
            _newtrade.id = _addTradeRequest.id;
            _newtrade.deal_date = _addTradeRequest.deal_date;
            _newtrade.leg1_date = _addTradeRequest.leg1_date;
            _newtrade.leg2_date = _addTradeRequest.leg2_date;
            _newtrade.amount = _addTradeRequest.amount;
            _newtrade.currency = _addTradeRequest.currency;
            _newtrade.leg1_deal_type = _addTradeRequest.leg1_deal_type;
            _newtrade.threshold1 = _addTradeRequest.threshold1;
            _newtrade.threshold2 = _addTradeRequest.threshold2;
            _newtrade.repo_rate = _addTradeRequest.repo_rate;
            _newtrade.int_meth = _addTradeRequest.int_meth;
            _newtrade.collateral_Buyer = _addTradeRequest.collateral_Buyer;
            _newtrade.collateral_Seller = _addTradeRequest.collateral_Seller;
            _newtrade.master_agreement = _addTradeRequest.master_agreement;
            _newtrade.collateral = _addTradeRequest.collateral;
            var _newsuo = new SUO();
            _newsuo.auto_margin = _addTradeRequest.suo.auto_margin;
            _newsuo.return_var = _addTradeRequest.suo.return_var;
            _newsuo.reuse = _addTradeRequest.suo.reuse;
            _newsuo.shift_term_date = _addTradeRequest.suo.shift_term_date;
            _newtrade.suo = _newsuo;
            _newtrade.lifeStage = TradeLifeStage.ADD_CONTRACT;
            
            const buffer = Buffer.from(JSON.stringify(_newtrade));
            await ctx.stub.putState(collection + _newtrade.id, buffer);

            const historyContract = new HistoryContract();
            const obligationContract = new ObligationContract();

            //кредитор
            var _buyerObligation = new Obligation();
            _buyerObligation.id = _addTradeRequest.commitmentID1;
            _buyerObligation.idTrade = _addTradeRequest.id;
            _buyerObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _buyerObligation.initiator = _addTradeRequest.whoMadeChanges;
            _buyerObligation.amount = _addTradeRequest.amount;
            _buyerObligation.quantitySecurities = 0;
            _buyerObligation.performanceStatus = PerformanceStatus.DEFAULT;
            _buyerObligation.obligationPartRepo = ObligationPartRepo.FIRST;
            const _descriptionbuyerObligation = JSON.stringify(_buyerObligation);
            var createBuyerObligResponse = await obligationContract.createObligation(ctx, _descriptionbuyerObligation,"buyer");
            if(!createBuyerObligResponse.isSuccess &&createBuyerObligResponse.data !== "SUCCESS") {
                throw new Error("Create Buyer Obligation: " + createBuyerObligResponse);
            }
            //заемщик
            var _sellerObligation = new Obligation();
            _sellerObligation.id = _addTradeRequest.commitmentID2;
            _sellerObligation.idTrade = _addTradeRequest.id;
            _sellerObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _sellerObligation.initiator = _addTradeRequest.whoMadeChanges;
            _sellerObligation.amount = 0;
            _sellerObligation.quantitySecurities = -_addTradeRequest.collateral.quantity;
            _sellerObligation.performanceStatus = PerformanceStatus.DEFAULT;
            _sellerObligation.obligationPartRepo = ObligationPartRepo.FIRST;
            const _descriptionsellerObligation = JSON.stringify(_sellerObligation);
            var createSellerObligResponse = await obligationContract.createObligation(ctx, _descriptionsellerObligation,"seller");
            if(!createSellerObligResponse.isSuccess || createSellerObligResponse.data !== "SUCCESS") {
                throw new Error("Create Seller Obligation: " + createSellerObligResponse);
            }
            var _addTradeLog = new AddTradeLog();
            _addTradeLog.nameMethos = "addTrade";
            _addTradeLog.commitmentID1 = _addTradeRequest.commitmentID1;
            _addTradeLog.commitmentID2 = _addTradeRequest.commitmentID2;
            _addTradeLog.newTrade = _newtrade;
            const _descriptionInfo = JSON.stringify(_addTradeLog);
            var _history = new History();
            _history.whatHasChanged = _descriptionInfo;
            _history.initiator = _addTradeRequest.whoMadeChanges;
            _history.description = DescriptionForHistory.ADD_TRADE;
            _history.idTrade = _addTradeRequest.id;
            const collectionHistory = (new History).constructor.name;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo, "true");
            result.withData("SUCCESS")
            return result;
        }
        catch (e) {
            result.withError(`${e}`)
            return result;
        }
    }



    @Transaction(false)
    @Returns('Trade')
    public async viewTrade(ctx: Context, tradeId: string): Promise<DataResult<Trade>> {
        var result = new DataResult<Trade>();
        try {
            const collection = (new Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + tradeId);
            if (!exists) {
                throw new Error(`The trade ${tradeId} does not exist`);
            }
            const buffer = await ctx.stub.getState(collection + tradeId);
            const trade = JSON.parse(buffer.toString()) as Trade;
            result.withData(trade);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }


    @Transaction(false)
    @Returns('DataResult<Trade[]>')
    public async viewListTrade(ctx: Context): Promise<DataResult<Trade[]>> {
        var result = new DataResult<Trade[]>();
        try{
            const collection = (new Trade).constructor.name;
            const buffer = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${collection}"}}`);
            const trade = (await this.parseStateQueryIterator(buffer)) as Trade[];
            result.withData(trade);
            return result;
        }
        catch(e){
            result.withError(`${e}`);
            return result;
        }
    }


   
    @Transaction(false)
    @Returns('DataResult<AddPriceToTradeResponse>')
    public async addPriceToTrade(ctx: Context, addPriceToTradeRequestStr:string): Promise<DataResult<AddPriceToTradeResponse>> {
        var result = new DataResult<AddPriceToTradeResponse>();
        try {
            var _addPriceToTradeResponse= new AddPriceToTradeResponse();
            var _addPriceToTradeRequest = new AddPriceToTradeRequest();
            try {
                _addPriceToTradeRequest = JSON.parse(addPriceToTradeRequestStr) as AddPriceToTradeRequest;
            }
            catch (e) {
                throw new Error("Error parse json to History");
            }

            const collection = (new Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _addPriceToTradeRequest.tradeId);
            if (!exists) {
                throw new Error(`The trade ${_addPriceToTradeRequest.tradeId} does not exist`);
            }

            const bufferRead = await ctx.stub.getState(collection + _addPriceToTradeRequest.tradeId);
            const trade = JSON.parse(bufferRead.toString()) as Trade;
            if (trade.lifeStage != TradeLifeStage.ADD_OBLIGATION_STATUS && trade.lifeStage != TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                throw new Error(TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }
            if(trade.lifeStage != TradeLifeStage.ADD_PRICE_TO_CONTRACT){
                trade.lifeStage = TradeLifeStage.ADD_PRICE_TO_CONTRACT;
                const buffer = Buffer.from(JSON.stringify(trade));
                await ctx.stub.putState(collection + _addPriceToTradeRequest.tradeId, buffer);
            }
            var nowInTimeSt= new Date();
            var nowDate= new Date(nowInTimeSt.getFullYear(),nowInTimeSt.getMonth(), nowInTimeSt.getDate());
            var nowInTimestamp = Math.round((+nowDate)/1000);
            var countday= Math.ceil((nowInTimestamp-trade.dateAcceptInProcessing)/86400);
            _addPriceToTradeResponse.necesSUM=0;
            _addPriceToTradeResponse.rePurchasePriceCur=trade.amount;
            _addPriceToTradeResponse.allSumCollateral=countday*trade.amount*trade.repo_rate/(365*100);
            result.withData(_addPriceToTradeResponse);
            return result;
 
        } catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }

    //"{ \"tradeId\":\"117\", \"dateTime\":12435111, \"typeOrg\":\"buyer\", \"whoMadeChanges\":\"admin123\" }"
    //"{ \"tradeId\":\"117\", \"dateTime\":12435111, \"typeOrg\":\"seller\", \"whoMadeChanges\":\"admin123\" }"
    @Transaction()
    @Returns('DataResult<string>')
    public async acceptTrade(ctx: Context, acceptTradeRequestStr: string): Promise<DataResult<string>> {
        var result = new DataResult<string>();
        try {
            var _acceptTradeRequest = new AcceptTradeRequest();
            try {
                _acceptTradeRequest = JSON.parse(acceptTradeRequestStr) as AcceptTradeRequest;
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }

            const validResult = ValidationTrade.acceptTradeObjectIsValid(_acceptTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }

            const collection = (new Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _acceptTradeRequest.tradeId);
            if (!exists) {
                throw new Error(`The trade ${_acceptTradeRequest.tradeId} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collection + _acceptTradeRequest.tradeId);
            const trade = JSON.parse(bufferRead.toString()) as Trade;
            if (trade.suo == null) {
                throw new Error(`The suo for trade ${_acceptTradeRequest.tradeId} does not exist`);
            }
            switch (_acceptTradeRequest.typeOrg) {
                case "buyer": {
                    if (trade.lifeStage != TradeLifeStage.ADD_SIGN_TO_CONTRACT_BUYER) {
                        throw new Error(TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo.collateral_buyer_accept = 1;
                    trade.lifeStage = TradeLifeStage.ACCEPT_CONTRACT_BUYER;
                    break;
                }
                case "seller": {
                    if (trade.lifeStage != TradeLifeStage.ACCEPT_CONTRACT_BUYER) {
                        throw new Error(TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo.collateral_seller_accept = 1;
                    trade.lifeStage = TradeLifeStage.ACCEPT_CONTRACT_SELLER;
                    break;
                }
                default: {
                    throw new Error(`The typeOrg ${_acceptTradeRequest.typeOrg} does not exist`);
                    break;
                }
            }
            if (trade.suo.collateral_buyer_accept && trade.suo.collateral_seller_accept) {
                trade.status = TradeState.ACCEPT_INPROCESSING;
                var nowInTimeSt= new Date();
                var nowDate= new Date(nowInTimeSt.getFullYear(),nowInTimeSt.getMonth(), nowInTimeSt.getDate());
                trade.dateAcceptInProcessing = Math.round((+nowDate)/1000);

            }
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collection + _acceptTradeRequest.tradeId, buffer);

            const collectionHistory = (new History).constructor.name;
            const historyContract = new HistoryContract();
            var _acceptTradeLog = new AcceptTradeLog();
            _acceptTradeLog.nameMethos = "acceptContract";
            _acceptTradeLog.typeOrg = _acceptTradeRequest.typeOrg;
            _acceptTradeLog.dateTime = _acceptTradeRequest.dateTime;
            const _descriptionInfo = JSON.stringify(_acceptTradeLog);
            var _history = new History();
            _history.initiator = _acceptTradeRequest.whoMadeChanges;
            if (trade.suo.collateral_buyer_accept && trade.suo.collateral_seller_accept) {
                _history.description = DescriptionForHistory.ACCEPT_TRADE_AND_IS_ACTIVE.replace("contrName",_acceptTradeRequest.whoMadeChanges);
            }
            else{
                _history.description = DescriptionForHistory.ACCEPT_TRADE.replace("contrName",_acceptTradeRequest.whoMadeChanges);
            }
            _history.whatHasChanged = _descriptionInfo;
            _history.idTrade = _acceptTradeRequest.tradeId;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }


    //"{ \"tradeId\":\"117\", \"dateTime\":12435111, \"whoAccepted\":\"admin123\", \"typeOrg\":\"buyer\", \"text\":\"ewgergwbgilbwevew\", \"textSigned\":\"325326126126126126161616\", \"signatureAlgorithm\":\"32532652esbs\", \"publicKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    //"{ \"tradeId\":\"117\", \"dateTime\":12435111, \"whoAccepted\":\"admin123\", \"typeOrg\":\"seller\", \"text\":\"ewgergwbgilbwevew\", \"textSigned\":\"325326126126126126161616\", \"signatureAlgorithm\":\"32532652esbs\", \"publicKey\":\"fw3f3f3bfff3bc3bbd332\" }"
    @Transaction()
    @Returns('DataResult<string>')
    public async addSignToTrade(ctx: Context, addSignToTradeRequestStr: string): Promise<DataResult<string>> {
        var result = new DataResult<string>();
        try {

            var _addSignToTradeRequest = new AddSignToTradeRequest();
            try {
                _addSignToTradeRequest = JSON.parse(addSignToTradeRequestStr) as AddSignToTradeRequest;
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }

            const validResult = ValidationTrade.addSingToTradeObjectIsValid(_addSignToTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }

            const collection = (new Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _addSignToTradeRequest.tradeId);
            if (!exists) {
                throw new Error(`The trade ${_addSignToTradeRequest.tradeId} does not exist`);
            }

            const bufferRead = await ctx.stub.getState(collection + _addSignToTradeRequest.tradeId);
            const trade = JSON.parse(bufferRead.toString()) as Trade;
            var newContrSigned = new ContrSigned();
            newContrSigned.Confirmation = 0;
            newContrSigned.dateTime = _addSignToTradeRequest.dateTime;
            newContrSigned.publicKey = _addSignToTradeRequest.publicKey;
            newContrSigned.signatureAlgorithm = _addSignToTradeRequest.signatureAlgorithm;
            newContrSigned.text = _addSignToTradeRequest.text;
            newContrSigned.textSigned = _addSignToTradeRequest.textSigned;
            newContrSigned.whoSigned = _addSignToTradeRequest.whoAccepted;
            switch (_addSignToTradeRequest.typeOrg) {
                case "buyer": {
                    if (trade.lifeStage != TradeLifeStage.ADD_SIGN_TO_CONTRACT_SELLER) {
                        throw new Error(TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo.buyerContrSigned = newContrSigned;
                    trade.lifeStage = TradeLifeStage.ADD_SIGN_TO_CONTRACT_BUYER;
                    break;
                }
                case "seller": {
                    if (trade.lifeStage != TradeLifeStage.ADD_CONTRACT) {
                        throw new Error(TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo.sellerContrSigned = newContrSigned;
                    trade.lifeStage = TradeLifeStage.ADD_SIGN_TO_CONTRACT_SELLER;
                    break;
                }
                default: {
                    throw new Error(`The typeOrg ${_addSignToTradeRequest.typeOrg} does not exist`);
                    break;
                }
            }
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collection + _addSignToTradeRequest.tradeId, buffer);

            const collectionHistory = (new History).constructor.name;
            var historyContract = new HistoryContract();
            const _acceptTradeLog = new AddSignToTradeLog();
            _acceptTradeLog.nameMethos = "addSignToTrade";
            _acceptTradeLog.typeOrg = _addSignToTradeRequest.typeOrg;
            _acceptTradeLog.dateTime = _addSignToTradeRequest.dateTime;
            _acceptTradeLog.publicKey = _addSignToTradeRequest.publicKey;
            _acceptTradeLog.text = _addSignToTradeRequest.text;
            _acceptTradeLog.textSigned = _addSignToTradeRequest.textSigned;

            const _descriptionInfo = JSON.stringify(_acceptTradeLog);
            const _history = new History();
            _history.initiator = _addSignToTradeRequest.whoAccepted;
            _history.whatHasChanged = _descriptionInfo;
            _history.description = DescriptionForHistory.ADD_SIGN_TO_CONTRACT.replace("contrName",_addSignToTradeRequest.whoAccepted);
            _history.idTrade = _addSignToTradeRequest.tradeId;

            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }

    // "{\"tradeId\":\"116\", \"amount\": 10, \"quantitySecurities\": 20, \"dateTimeChange\":12435111, \"whoMadeChanges\":\"admin123\"}"
    @Transaction()
    @Returns('DataResult<string>')
    public async updTrade(ctx: Context, _updTradeRequestStr: string): Promise<DataResult<string>> {
        var _updTradeRequest = new UpdTradeRequest();
        var result = new DataResult<string>();
        try {
            try {
                var _updTradeRequest = JSON.parse(_updTradeRequestStr) as UpdTradeRequest;
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }

            const validResult = ValidationTrade.updTradeObjectIsValid(_updTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }

            const collectionTrade = (new Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + _updTradeRequest.tradeId);
            if (!isExistTrade) {
                throw new Error(`The trade ${_updTradeRequest.tradeId} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + _updTradeRequest.tradeId);
            var trade = JSON.parse(bufferRead.toString()) as Trade;
            trade.amount += _updTradeRequest.amount;
            trade.collateral.quantity += _updTradeRequest.quantitySecurities;
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + _updTradeRequest.tradeId, buffer);

            const collectionObligation = (new Obligation).constructor.name;
            let obligationContract = new ObligationContract();
            let obligationList = await obligationContract.getObligationList(ctx, _updTradeRequest.tradeId);

            if (!obligationList.isSuccess || obligationList.data.length != 2)
                throw new Error(`The obligation list of ${_updTradeRequest.tradeId} trade should have 2 elements`);

            var _buyerObligation, _sellerObligation;
            if (obligationList[0].amount > 0 && obligationList[1].amount < 0) {
                _buyerObligation = obligationList[0];
                _sellerObligation = obligationList[1];
            }
            else if (obligationList[0].amount < 0 && obligationList[1].amount > 0) {
                _buyerObligation = obligationList[1];
                _sellerObligation = obligationList[0];
            }
            else {
                throw new Error(`The trade ${_updTradeRequest.tradeId} has invalid obligations`);
            }
            _buyerObligation.amount += _updTradeRequest.amount;
            _buyerObligation.quantitySecurities += _updTradeRequest.quantitySecurities;
            _sellerObligation.amount -= _updTradeRequest.amount;
            _sellerObligation.quantitySecurities -= _updTradeRequest.quantitySecurities;

            const buyerObligationBuffer = Buffer.from(JSON.stringify(_buyerObligation));
            const sellerObligationBuffer = Buffer.from(JSON.stringify(_sellerObligation));
            await ctx.stub.putState(collectionObligation + _buyerObligation.id, buyerObligationBuffer);
            await ctx.stub.putState(collectionObligation + _sellerObligation.id, sellerObligationBuffer);

            const collectionHistory = (new History).constructor.name;
            const historyContract = new HistoryContract();
            var _updTradeLog = new UpdTradeLog();
            _updTradeLog.nameMethos = "updTrade";
            _updTradeLog.dateTimeChange = _updTradeRequest.dateTimeChange;
            _updTradeLog.amount = _updTradeRequest.amount;
            _updTradeLog.quantitySecurities = _updTradeRequest.quantitySecurities;
            const _descriptionInfo = JSON.stringify(_updTradeLog);
            var _history = new History();
            _history.whatHasChanged = _descriptionInfo;
            _history.initiator = _updTradeRequest.whoMadeChanges;
            _history.description = DescriptionForHistory.UPD_TRADE;
            _history.idTrade = _updTradeRequest.tradeId;
            _history.date = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }


    //"{ \"tradeId\":\"116\", \"dateTime\":12435111, \"commitmentID1\":\"com1v2\", \"commitmentID2\":\"com2v2\", \"whoMadeChanges\":\"admin123\" }"
    @Transaction()
    @Returns('DataResult<string>')
    public async closeTrade(ctx: Context, closeTradeRequestStr: string): Promise<DataResult<string>> {
        var result = new DataResult<string>();
        try {

            var _closeInfo = new CloseTradeRequest();
            try {
                var _closeInfo = JSON.parse(closeTradeRequestStr) as CloseTradeRequest;
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = ValidationTrade.closeTradeObjectIsValid(_closeInfo);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collectionTrade = (new Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + _closeInfo.tradeId);
            if (!isExistTrade) {
                throw new Error(`The trade ${_closeInfo.tradeId} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + _closeInfo.tradeId);

            var trade = JSON.parse(bufferRead.toString()) as Trade;

            if (trade.lifeStage != TradeLifeStage.ADD_OBLIGATION_STATUS && trade.lifeStage != TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                throw new Error(TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }

            trade.lifeStage = TradeLifeStage.CLOSE_CONTRACT;
            trade.status = TradeState.СOMPLETED_CLOSED; // 2 -закрыт
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + _closeInfo.tradeId, buffer);

            const collectionHistory = (new History).constructor.name;
            const historyContract = new HistoryContract();
            var _closeTradeLog = new CloseTradeLog();
            _closeTradeLog.nameMethos = "closeTrade";
            _closeTradeLog.commitmentID1 = _closeInfo.commitmentID1;
            _closeTradeLog.commitmentID2 = _closeInfo.commitmentID2;
            _closeTradeLog.dateTime = _closeInfo.dateTime;
            const _descriptionInfo = JSON.stringify(_closeTradeLog);
            var _history = new History();
            _history.initiator = _closeInfo.whoMadeChanges;
            _history.whatHasChanged = _descriptionInfo;
            _history.description = DescriptionForHistory.CLOSE_CONTRACT;
            _history.idTrade = _closeInfo.tradeId;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            
            let obligationContract = new ObligationContract();
            var _addPriceToTradeRequest = new AddPriceToTradeRequest();
            _addPriceToTradeRequest.tradeId=_closeInfo.tradeId;
            const _addPriceToTradeRequestStr = JSON.stringify(_addPriceToTradeRequest);
            var resultAmount = await this.addPriceToTrade(ctx,_addPriceToTradeRequestStr)
            if(!resultAmount.isSuccess)
            {
                throw new Error(resultAmount.error);
            }
            //кредитор
            var _buyerObligation = new Obligation();
            _buyerObligation.id = _closeInfo.commitmentID1;
            _buyerObligation.idTrade = _closeInfo.tradeId;
            _buyerObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _buyerObligation.initiator = _closeInfo.whoMadeChanges;
            _buyerObligation.amount = 0;
            _buyerObligation.quantitySecurities = trade.collateral.quantity;
            _buyerObligation.performanceStatus = PerformanceStatus.DEFAULT;
            _buyerObligation.obligationPartRepo = ObligationPartRepo.SECOND;
            const _descriptionbuyerObligation = JSON.stringify(_buyerObligation);
            var createBuyerObligResponse = await obligationContract.createObligation(ctx, _descriptionbuyerObligation,"buyer");
            if(!createBuyerObligResponse.isSuccess || createBuyerObligResponse.data !== "SUCCESS") {
                throw new Error("Create Buyer Obligation: " + createBuyerObligResponse);
            }
            //заемщик
            var _sellerObligation = new Obligation();
            _sellerObligation.id = _closeInfo.commitmentID2;
            _sellerObligation.idTrade = _closeInfo.tradeId;
            _sellerObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _sellerObligation.initiator = _closeInfo.whoMadeChanges;
            _sellerObligation.amount = -resultAmount.data;
            _sellerObligation.quantitySecurities = 0;
            _sellerObligation.performanceStatus = PerformanceStatus.DEFAULT;
            _sellerObligation.obligationPartRepo = ObligationPartRepo.SECOND;
            const _descriptionsellerObligation = JSON.stringify(_sellerObligation);
            var createSellerObligResponse = await obligationContract.createObligation(ctx, _descriptionsellerObligation,"seller");
            if(!createSellerObligResponse.isSuccess || createSellerObligResponse.data !== "SUCCESS") {
                throw new Error("Create Seller Obligation: " + createSellerObligResponse);
            }
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }


    @Transaction()
    @Returns('DataResult<string>')
    public async setTradeIsEarly(ctx: Context, idTrade: string, isEarly:boolean,whoMadeChanges:string): Promise<DataResult<string>> {
        var result = new DataResult<string>();
        try{
            const collectionTrade = (new Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + idTrade);
            if (!isExistTrade) {
                throw new Error(`The trade ${idTrade} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + idTrade);

            var trade = JSON.parse(bufferRead.toString()) as Trade;
            trade.isEarly=isEarly;
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + idTrade, buffer);

            const collectionHistory = (new History).constructor.name;
            const historyContract = new HistoryContract();
            var _history = new History();
            _history.initiator = whoMadeChanges;
            _history.description = `Change trade, early is ${isEarly.toString()}`;
            _history.idTrade = idTrade;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }

    @Transaction()
    @Returns('DataResult<string>')
    public async getTradeIsEarly(ctx: Context, idTrade: string): Promise<DataResult<string>> {
        var result = new DataResult<string>();
        try{
            const collectionTrade = (new Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + idTrade);
            if (!isExistTrade) {
                throw new Error(`The trade ${idTrade} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + idTrade);

            var trade = JSON.parse(bufferRead.toString()) as Trade;
            
            result.withData(`early is ${trade.isEarly}`);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
}
