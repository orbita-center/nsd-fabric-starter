"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
///модели
const tradeModel_1 = require("../models/tradeModel");
const historyModel_1 = require("../models/historyModel");
const obligationModel_1 = require("../models/obligationModel");
const dataResult_1 = require("../models/dataResult");
///модели
///enum
const tradeState_1 = require("../enums/tradeState");
const performanceStatus_1 = require("../enums/performanceStatus");
const tradeLifeStage_1 = require("../enums/tradeLifeStage");
const descriptionForHistory_1 = require("../enums/descriptionForHistory");
const obligationPartRepo_1 = require("../enums/obligationPartRepo");
///enum
///Requests
const closeTradeRequest_1 = require("../requests/tradeRequests/closeTradeRequest");
const acceptTradeRequest_1 = require("../requests/tradeRequests/acceptTradeRequest");
const addTradeRequest_1 = require("../requests/tradeRequests/addTradeRequest");
const addSignToTradeRequest_1 = require("../requests/tradeRequests/addSignToTradeRequest");
const updTradeRequest_1 = require("../requests/tradeRequests/updTradeRequest");
const addPriceToTradeRequest_1 = require("../requests/tradeRequests/addPriceToTradeRequest");
///Requests
///logs
const acceptTradeLog_1 = require("../log_history/acceptTradeLog");
const addTradeLog_1 = require("../log_history/addTradeLog");
const closeTradeLog_1 = require("../log_history/closeTradeLog");
const updTradeLog_1 = require("../log_history/updTradeLog");
const addSignToTradeLog_1 = require("../log_history/addSignToTradeLog");
///logs
///validation
const validationTrade_1 = require("../validation/validationTrade");
///validation
///Responses
const addPriceToTradeResponse_1 = require("../responses/addPriceToTradeResponse");
///Responses
const historyController_1 = require("./historyController");
const obligationController_1 = require("./obligationController");
let TradeContract = class TradeContract extends fabric_contract_api_1.Contract {
    async parseStateQueryIterator(stateQueryIterator) {
        const keys = [];
        const allResults = [];
        let res;
        while (res == null || !res.done) {
            res = await stateQueryIterator.next();
            if (res.value && res.value.value.toString()) {
                let parsedItem;
                try {
                    parsedItem = JSON.parse(res.value.value.toString('utf8'));
                }
                catch (err) {
                    parsedItem = res.value.value.toString('utf8');
                }
                allResults.push(parsedItem);
            }
        }
        await stateQueryIterator.close();
        return allResults;
    }
    async isExists(ctx, tradeId) {
        const buffer = await ctx.stub.getState(tradeId);
        return (!!buffer && buffer.length > 0);
    }
    //"{\"id\":\"116\",\"collateral\":{\"discount\":91,\"price_types_priority\":\"124325\",\"quantity\":999,\"security_code\":\"code123\",\"security_isin\":\"isin123\",\"security_name\":\"name123\"},\"collateral_Buyer\":{\"code\":\"11\",\"short_name\":\"name11\"},\"collateral_Seller\":{\"code\":\"11\",\"short_name\":\"name11\"},\"commitmentID1\":\"com1v3\",\"commitmentID2\":\"com2v3\",\"master_agreement\":{\"code\":\"code123\",\"date\":1560000190},\"suo\":{\"auto_margin\":\"Y\",\"return_var\":\"return_var\",\"reuse\":\"Y\",\"shift_term_date\":\"shift_term_date\"},\"whoMadeChanges\":\"admin123\", \"deal_num\":\"num1241\", \"deal_date\":1560000190, \"leg1_date\":1560000190, \"leg2_date\":1560000190, \"amount\":2142, \"currency\":\"BTC\", \"leg1_deal_type\":\"DVP1\", \"threshold1\":2.0, \"threshold2\":999.0, \"repo_rate\":3252, \"int_meth\":\"365/366\"}"
    async addTrade(ctx, addTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _addTradeRequest = new addTradeRequest_1.AddTradeRequest();
            try {
                _addTradeRequest = JSON.parse(addTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.addTradeObjectIsValid(_addTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _addTradeRequest.id);
            if (exists) {
                throw new Error(`The trade ${_addTradeRequest.id} already exists`);
            }
            //////проверяем есть ли такие айди обязательств
            const collectionObligation = (new obligationModel_1.Obligation).constructor.name;
            const existscommitmentID1 = await this.isExists(ctx, collectionObligation + _addTradeRequest.commitmentID1);
            if (existscommitmentID1) {
                throw new Error(`The obligation ${_addTradeRequest.commitmentID1} already exists`);
            }
            const existscommitmentID2 = await this.isExists(ctx, collection + _addTradeRequest.commitmentID2);
            if (existscommitmentID2) {
                throw new Error(`The obligation ${_addTradeRequest.commitmentID2} already exists`);
            }
            //////
            var _newtrade = new tradeModel_1.Trade();
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
            var _newsuo = new tradeModel_1.SUO();
            _newsuo.auto_margin = _addTradeRequest.suo.auto_margin;
            _newsuo.return_var = _addTradeRequest.suo.return_var;
            _newsuo.reuse = _addTradeRequest.suo.reuse;
            _newsuo.shift_term_date = _addTradeRequest.suo.shift_term_date;
            _newtrade.suo = _newsuo;
            _newtrade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_CONTRACT;
            const buffer = Buffer.from(JSON.stringify(_newtrade));
            await ctx.stub.putState(collection + _newtrade.id, buffer);
            const historyContract = new historyController_1.HistoryContract();
            const obligationContract = new obligationController_1.ObligationContract();
            //кредитор
            var _buyerObligation = new obligationModel_1.Obligation();
            _buyerObligation.id = _addTradeRequest.commitmentID1;
            _buyerObligation.idTrade = _addTradeRequest.id;
            _buyerObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _buyerObligation.initiator = _addTradeRequest.whoMadeChanges;
            _buyerObligation.amount = _addTradeRequest.amount;
            _buyerObligation.quantitySecurities = 0;
            _buyerObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
            _buyerObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.FIRST;
            const _descriptionbuyerObligation = JSON.stringify(_buyerObligation);
            var createBuyerObligResponse = await obligationContract.createObligation(ctx, _descriptionbuyerObligation, "buyer");
            if (!createBuyerObligResponse.isSuccess && createBuyerObligResponse.data !== "SUCCESS") {
                throw new Error("Create Buyer Obligation: " + createBuyerObligResponse);
            }
            //заемщик
            var _sellerObligation = new obligationModel_1.Obligation();
            _sellerObligation.id = _addTradeRequest.commitmentID2;
            _sellerObligation.idTrade = _addTradeRequest.id;
            _sellerObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _sellerObligation.initiator = _addTradeRequest.whoMadeChanges;
            _sellerObligation.amount = 0;
            _sellerObligation.quantitySecurities = -_addTradeRequest.collateral.quantity;
            _sellerObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
            _sellerObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.FIRST;
            const _descriptionsellerObligation = JSON.stringify(_sellerObligation);
            var createSellerObligResponse = await obligationContract.createObligation(ctx, _descriptionsellerObligation, "seller");
            if (!createSellerObligResponse.isSuccess || createSellerObligResponse.data !== "SUCCESS") {
                throw new Error("Create Seller Obligation: " + createSellerObligResponse);
            }
            var _addTradeLog = new addTradeLog_1.AddTradeLog();
            _addTradeLog.nameMethos = "addTrade";
            _addTradeLog.commitmentID1 = _addTradeRequest.commitmentID1;
            _addTradeLog.commitmentID2 = _addTradeRequest.commitmentID2;
            _addTradeLog.newTrade = _newtrade;
            const _descriptionInfo = JSON.stringify(_addTradeLog);
            var _history = new historyModel_1.History();
            _history.whatHasChanged = _descriptionInfo;
            _history.initiator = _addTradeRequest.whoMadeChanges;
            _history.description = descriptionForHistory_1.DescriptionForHistory.ADD_TRADE;
            _history.idTrade = _addTradeRequest.id;
            const collectionHistory = (new historyModel_1.History).constructor.name;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo, "true");
            result.withData("SUCCESS");
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async viewTrade(ctx, tradeId) {
        var result = new dataResult_1.DataResult();
        try {
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + tradeId);
            if (!exists) {
                throw new Error(`The trade ${tradeId} does not exist`);
            }
            const buffer = await ctx.stub.getState(collection + tradeId);
            const trade = JSON.parse(buffer.toString());
            result.withData(trade);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async viewListTrade(ctx) {
        var result = new dataResult_1.DataResult();
        try {
            const collection = (new tradeModel_1.Trade).constructor.name;
            const buffer = await ctx.stub.getQueryResult(`{"selector":{"typeObject":"${collection}"}}`);
            const trade = (await this.parseStateQueryIterator(buffer));
            result.withData(trade);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async addPriceToTrade(ctx, addPriceToTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _addPriceToTradeResponse = new addPriceToTradeResponse_1.AddPriceToTradeResponse();
            var _addPriceToTradeRequest = new addPriceToTradeRequest_1.AddPriceToTradeRequest();
            try {
                _addPriceToTradeRequest = JSON.parse(addPriceToTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json to History");
            }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _addPriceToTradeRequest.tradeId);
            if (!exists) {
                throw new Error(`The trade ${_addPriceToTradeRequest.tradeId} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collection + _addPriceToTradeRequest.tradeId);
            const trade = JSON.parse(bufferRead.toString());
            if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_OBLIGATION_STATUS && trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }
            if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT;
                const buffer = Buffer.from(JSON.stringify(trade));
                await ctx.stub.putState(collection + _addPriceToTradeRequest.tradeId, buffer);
            }
            var nowInTimeSt = new Date();
            var nowDate = new Date(nowInTimeSt.getFullYear(), nowInTimeSt.getMonth(), nowInTimeSt.getDate());
            var nowInTimestamp = Math.round((+nowDate) / 1000);
            var countday = Math.ceil((nowInTimestamp - trade.dateAcceptInProcessing) / 86400);
            _addPriceToTradeResponse.necesSUM = 0;
            _addPriceToTradeResponse.rePurchasePriceCur = trade.amount;
            _addPriceToTradeResponse.allSumCollateral = countday * trade.amount * trade.repo_rate / (365 * 100);
            result.withData(_addPriceToTradeResponse);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    //"{ \"tradeId\":\"117\", \"dateTime\":12435111, \"typeOrg\":\"buyer\", \"whoMadeChanges\":\"admin123\" }"
    //"{ \"tradeId\":\"117\", \"dateTime\":12435111, \"typeOrg\":\"seller\", \"whoMadeChanges\":\"admin123\" }"
    async acceptTrade(ctx, acceptTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _acceptTradeRequest = new acceptTradeRequest_1.AcceptTradeRequest();
            try {
                _acceptTradeRequest = JSON.parse(acceptTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.acceptTradeObjectIsValid(_acceptTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _acceptTradeRequest.tradeId);
            if (!exists) {
                throw new Error(`The trade ${_acceptTradeRequest.tradeId} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collection + _acceptTradeRequest.tradeId);
            const trade = JSON.parse(bufferRead.toString());
            if (trade.suo == null) {
                throw new Error(`The suo for trade ${_acceptTradeRequest.tradeId} does not exist`);
            }
            switch (_acceptTradeRequest.typeOrg) {
                case "buyer": {
                    if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_SIGN_TO_CONTRACT_BUYER) {
                        throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo.collateral_buyer_accept = 1;
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ACCEPT_CONTRACT_BUYER;
                    break;
                }
                case "seller": {
                    if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ACCEPT_CONTRACT_BUYER) {
                        throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo.collateral_seller_accept = 1;
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ACCEPT_CONTRACT_SELLER;
                    break;
                }
                default: {
                    throw new Error(`The typeOrg ${_acceptTradeRequest.typeOrg} does not exist`);
                    break;
                }
            }
            if (trade.suo.collateral_buyer_accept && trade.suo.collateral_seller_accept) {
                trade.status = tradeState_1.TradeState.ACCEPT_INPROCESSING;
                var nowInTimeSt = new Date();
                var nowDate = new Date(nowInTimeSt.getFullYear(), nowInTimeSt.getMonth(), nowInTimeSt.getDate());
                trade.dateAcceptInProcessing = Math.round((+nowDate) / 1000);
            }
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collection + _acceptTradeRequest.tradeId, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _acceptTradeLog = new acceptTradeLog_1.AcceptTradeLog();
            _acceptTradeLog.nameMethos = "acceptContract";
            _acceptTradeLog.typeOrg = _acceptTradeRequest.typeOrg;
            _acceptTradeLog.dateTime = _acceptTradeRequest.dateTime;
            const _descriptionInfo = JSON.stringify(_acceptTradeLog);
            var _history = new historyModel_1.History();
            _history.initiator = _acceptTradeRequest.whoMadeChanges;
            if (trade.suo.collateral_buyer_accept && trade.suo.collateral_seller_accept) {
                _history.description = descriptionForHistory_1.DescriptionForHistory.ACCEPT_TRADE_AND_IS_ACTIVE.replace("contrName", _acceptTradeRequest.whoMadeChanges);
            }
            else {
                _history.description = descriptionForHistory_1.DescriptionForHistory.ACCEPT_TRADE.replace("contrName", _acceptTradeRequest.whoMadeChanges);
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
    async addSignToTrade(ctx, addSignToTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _addSignToTradeRequest = new addSignToTradeRequest_1.AddSignToTradeRequest();
            try {
                _addSignToTradeRequest = JSON.parse(addSignToTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.addSingToTradeObjectIsValid(_addSignToTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collection = (new tradeModel_1.Trade).constructor.name;
            const exists = await this.isExists(ctx, collection + _addSignToTradeRequest.tradeId);
            if (!exists) {
                throw new Error(`The trade ${_addSignToTradeRequest.tradeId} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collection + _addSignToTradeRequest.tradeId);
            const trade = JSON.parse(bufferRead.toString());
            var newContrSigned = new tradeModel_1.ContrSigned();
            newContrSigned.Confirmation = 0;
            newContrSigned.dateTime = _addSignToTradeRequest.dateTime;
            newContrSigned.publicKey = _addSignToTradeRequest.publicKey;
            newContrSigned.signatureAlgorithm = _addSignToTradeRequest.signatureAlgorithm;
            newContrSigned.text = _addSignToTradeRequest.text;
            newContrSigned.textSigned = _addSignToTradeRequest.textSigned;
            newContrSigned.whoSigned = _addSignToTradeRequest.whoAccepted;
            switch (_addSignToTradeRequest.typeOrg) {
                case "buyer": {
                    if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_SIGN_TO_CONTRACT_SELLER) {
                        throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo.buyerContrSigned = newContrSigned;
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_SIGN_TO_CONTRACT_BUYER;
                    break;
                }
                case "seller": {
                    if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_CONTRACT) {
                        throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
                    }
                    trade.suo.sellerContrSigned = newContrSigned;
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_SIGN_TO_CONTRACT_SELLER;
                    break;
                }
                default: {
                    throw new Error(`The typeOrg ${_addSignToTradeRequest.typeOrg} does not exist`);
                    break;
                }
            }
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collection + _addSignToTradeRequest.tradeId, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            var historyContract = new historyController_1.HistoryContract();
            const _acceptTradeLog = new addSignToTradeLog_1.AddSignToTradeLog();
            _acceptTradeLog.nameMethos = "addSignToTrade";
            _acceptTradeLog.typeOrg = _addSignToTradeRequest.typeOrg;
            _acceptTradeLog.dateTime = _addSignToTradeRequest.dateTime;
            _acceptTradeLog.publicKey = _addSignToTradeRequest.publicKey;
            _acceptTradeLog.text = _addSignToTradeRequest.text;
            _acceptTradeLog.textSigned = _addSignToTradeRequest.textSigned;
            const _descriptionInfo = JSON.stringify(_acceptTradeLog);
            const _history = new historyModel_1.History();
            _history.initiator = _addSignToTradeRequest.whoAccepted;
            _history.whatHasChanged = _descriptionInfo;
            _history.description = descriptionForHistory_1.DescriptionForHistory.ADD_SIGN_TO_CONTRACT.replace("contrName", _addSignToTradeRequest.whoAccepted);
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
    async updTrade(ctx, _updTradeRequestStr) {
        var _updTradeRequest = new updTradeRequest_1.UpdTradeRequest();
        var result = new dataResult_1.DataResult();
        try {
            try {
                var _updTradeRequest = JSON.parse(_updTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.updTradeObjectIsValid(_updTradeRequest);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + _updTradeRequest.tradeId);
            if (!isExistTrade) {
                throw new Error(`The trade ${_updTradeRequest.tradeId} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + _updTradeRequest.tradeId);
            var trade = JSON.parse(bufferRead.toString());
            trade.amount += _updTradeRequest.amount;
            trade.collateral.quantity += _updTradeRequest.quantitySecurities;
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + _updTradeRequest.tradeId, buffer);
            const collectionObligation = (new obligationModel_1.Obligation).constructor.name;
            let obligationContract = new obligationController_1.ObligationContract();
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
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _updTradeLog = new updTradeLog_1.UpdTradeLog();
            _updTradeLog.nameMethos = "updTrade";
            _updTradeLog.dateTimeChange = _updTradeRequest.dateTimeChange;
            _updTradeLog.amount = _updTradeRequest.amount;
            _updTradeLog.quantitySecurities = _updTradeRequest.quantitySecurities;
            const _descriptionInfo = JSON.stringify(_updTradeLog);
            var _history = new historyModel_1.History();
            _history.whatHasChanged = _descriptionInfo;
            _history.initiator = _updTradeRequest.whoMadeChanges;
            _history.description = descriptionForHistory_1.DescriptionForHistory.UPD_TRADE;
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
    async closeTrade(ctx, closeTradeRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _closeInfo = new closeTradeRequest_1.CloseTradeRequest();
            try {
                var _closeInfo = JSON.parse(closeTradeRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const validResult = validationTrade_1.ValidationTrade.closeTradeObjectIsValid(_closeInfo);
            if (!validResult.isSuccess) {
                throw new Error(validResult.error);
            }
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + _closeInfo.tradeId);
            if (!isExistTrade) {
                throw new Error(`The trade ${_closeInfo.tradeId} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + _closeInfo.tradeId);
            var trade = JSON.parse(bufferRead.toString());
            if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_OBLIGATION_STATUS && trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ADD_PRICE_TO_CONTRACT) {
                throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }
            trade.lifeStage = tradeLifeStage_1.TradeLifeStage.CLOSE_CONTRACT;
            trade.status = tradeState_1.TradeState.СOMPLETED_CLOSED; // 2 -закрыт
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + _closeInfo.tradeId, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _closeTradeLog = new closeTradeLog_1.CloseTradeLog();
            _closeTradeLog.nameMethos = "closeTrade";
            _closeTradeLog.commitmentID1 = _closeInfo.commitmentID1;
            _closeTradeLog.commitmentID2 = _closeInfo.commitmentID2;
            _closeTradeLog.dateTime = _closeInfo.dateTime;
            const _descriptionInfo = JSON.stringify(_closeTradeLog);
            var _history = new historyModel_1.History();
            _history.initiator = _closeInfo.whoMadeChanges;
            _history.whatHasChanged = _descriptionInfo;
            _history.description = descriptionForHistory_1.DescriptionForHistory.CLOSE_CONTRACT;
            _history.idTrade = _closeInfo.tradeId;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds().toString();
            const _logInfo = JSON.stringify(_history);
            await historyContract.addHistoryToTrade(ctx, _logInfo);
            let obligationContract = new obligationController_1.ObligationContract();
            var _addPriceToTradeRequest = new addPriceToTradeRequest_1.AddPriceToTradeRequest();
            _addPriceToTradeRequest.tradeId = _closeInfo.tradeId;
            const _addPriceToTradeRequestStr = JSON.stringify(_addPriceToTradeRequest);
            var resultAmount = await this.addPriceToTrade(ctx, _addPriceToTradeRequestStr);
            if (!resultAmount.isSuccess) {
                throw new Error(resultAmount.error);
            }
            //кредитор
            var _buyerObligation = new obligationModel_1.Obligation();
            _buyerObligation.id = _closeInfo.commitmentID1;
            _buyerObligation.idTrade = _closeInfo.tradeId;
            _buyerObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _buyerObligation.initiator = _closeInfo.whoMadeChanges;
            _buyerObligation.amount = 0;
            _buyerObligation.quantitySecurities = trade.collateral.quantity;
            _buyerObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
            _buyerObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.SECOND;
            const _descriptionbuyerObligation = JSON.stringify(_buyerObligation);
            var createBuyerObligResponse = await obligationContract.createObligation(ctx, _descriptionbuyerObligation, "buyer");
            if (!createBuyerObligResponse.isSuccess || createBuyerObligResponse.data !== "SUCCESS") {
                throw new Error("Create Buyer Obligation: " + createBuyerObligResponse);
            }
            //заемщик
            var _sellerObligation = new obligationModel_1.Obligation();
            _sellerObligation.id = _closeInfo.commitmentID2;
            _sellerObligation.idTrade = _closeInfo.tradeId;
            _sellerObligation.dateAdded = +(ctx.stub.getTxTimestamp().getSeconds().toString());
            _sellerObligation.initiator = _closeInfo.whoMadeChanges;
            _sellerObligation.amount = -resultAmount.data;
            _sellerObligation.quantitySecurities = 0;
            _sellerObligation.performanceStatus = performanceStatus_1.PerformanceStatus.DEFAULT;
            _sellerObligation.obligationPartRepo = obligationPartRepo_1.ObligationPartRepo.SECOND;
            const _descriptionsellerObligation = JSON.stringify(_sellerObligation);
            var createSellerObligResponse = await obligationContract.createObligation(ctx, _descriptionsellerObligation, "seller");
            if (!createSellerObligResponse.isSuccess || createSellerObligResponse.data !== "SUCCESS") {
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
    async setTradeIsEarly(ctx, idTrade, isEarly, whoMadeChanges) {
        var result = new dataResult_1.DataResult();
        try {
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + idTrade);
            if (!isExistTrade) {
                throw new Error(`The trade ${idTrade} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + idTrade);
            var trade = JSON.parse(bufferRead.toString());
            trade.isEarly = isEarly;
            const buffer = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + idTrade, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _history = new historyModel_1.History();
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
    async getTradeIsEarly(ctx, idTrade) {
        var result = new dataResult_1.DataResult();
        try {
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + idTrade);
            if (!isExistTrade) {
                throw new Error(`The trade ${idTrade} doesn't exists`);
            }
            const bufferRead = await ctx.stub.getState(collectionTrade + idTrade);
            var trade = JSON.parse(bufferRead.toString());
            result.withData(`early is ${trade.isEarly}`);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
};
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "isExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "addTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Trade'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "viewTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('DataResult<Trade[]>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "viewListTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('DataResult<AddPriceToTradeResponse>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "addPriceToTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "acceptTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "addSignToTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "updTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "closeTrade", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, Boolean, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "setTradeIsEarly", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], TradeContract.prototype, "getTradeIsEarly", null);
TradeContract = __decorate([
    fabric_contract_api_1.Info({ title: 'TradeContract', description: 'My Smart Contract' })
], TradeContract);
exports.TradeContract = TradeContract;
//# sourceMappingURL=tradeController.js.map