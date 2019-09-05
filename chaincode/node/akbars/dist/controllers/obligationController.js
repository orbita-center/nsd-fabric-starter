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
//модели
const obligationModel_1 = require("../models/obligationModel");
const tradeModel_1 = require("../models/tradeModel");
const historyModel_1 = require("../models/historyModel");
const dataResult_1 = require("../models/dataResult");
//модели
//requests
const addObligationStatusRequest_1 = require("../requests/obligation/addObligationStatusRequest");
//requests
///logs
const addObligationStatusLog_1 = require("../log_history/addObligationStatusLog");
const createObligationLog_1 = require("../log_history/createObligationLog");
///logs
const historyController_1 = require("./historyController");
const validationObligation_1 = require("../validation/validationObligation");
///enums
const descriptionForHistory_1 = require("../enums/descriptionForHistory");
const tradeLifeStage_1 = require("../enums/tradeLifeStage");
const performanceStatus_1 = require("../enums/performanceStatus");
///enums
let ObligationContract = class ObligationContract extends fabric_contract_api_1.Contract {
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
    async isExists(ctx, objId) {
        const buffer = await ctx.stub.getState(objId);
        return (!!buffer && buffer.length > 0);
    }
    async createObligation(ctx, _obligationStr, type) {
        var result = new dataResult_1.DataResult();
        try {
            var _obligation = new obligationModel_1.Obligation();
            try {
                _obligation = JSON.parse(_obligationStr);
            }
            catch (e) {
                throw new Error("Error parse json to Obligation");
            }
            const collection = (new obligationModel_1.Obligation).constructor.name;
            const exists = await this.isExists(ctx, collection + _obligation.id);
            if (exists) {
                throw new Error(`The obligation ${_obligation.id} already exists`);
            }
            _obligation.typeObject = collection;
            const buffer = Buffer.from(JSON.stringify(_obligation));
            await ctx.stub.putState(collection + _obligation.id, buffer);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _addCreateObligationLog = new createObligationLog_1.CreateObligationLog();
            _addCreateObligationLog.nameMethod = "createObligationForNewTrade";
            _addCreateObligationLog.obligationId = _obligation.id;
            _addCreateObligationLog.amount = _obligation.amount;
            _addCreateObligationLog.quantitySecurities = _obligation.quantitySecurities;
            _addCreateObligationLog.performanceStatus = _obligation.performanceStatus;
            const _descriptionInfo = JSON.stringify(_addCreateObligationLog);
            var _history = new historyModel_1.History();
            _history.initiator = _obligation.initiator;
            _history.idTrade = _obligation.idTrade;
            _history.id = collectionHistory + ctx.stub.getTxTimestamp().getSeconds() + _obligation.id;
            _history.description = descriptionForHistory_1.DescriptionForHistory.CREATE_OBLIGATION.replace("sellerOrBuyer", type == "buyer" ? "кредитора" : "заемщика");
            _history.whatHasChanged = _descriptionInfo;
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
    async viewObligation(ctx, obligationId) {
        var result = new dataResult_1.DataResult();
        try {
            const collection = (new obligationModel_1.Obligation).constructor.name;
            const exists = await this.isExists(ctx, collection + obligationId);
            if (!exists) {
                throw new Error(`The obligation ${obligationId} does not exist`);
            }
            const buffer = await ctx.stub.getState(collection + obligationId);
            const obligation = JSON.parse(buffer.toString());
            result.withData(obligation);
            return result;
        }
        catch (e) {
            result.withError(`${e}`);
            return result;
        }
    }
    async addObligationStatus(ctx, _addObligationStatusRequestStr) {
        var result = new dataResult_1.DataResult();
        try {
            var _addObligationStatusRequest = new addObligationStatusRequest_1.AddObligationStatusRequest();
            try {
                _addObligationStatusRequest = JSON.parse(_addObligationStatusRequestStr);
            }
            catch (e) {
                throw new Error("Error parse json from request");
            }
            const resultValidation = validationObligation_1.ValidationObligation.addObligationStatusObjectIsValid(_addObligationStatusRequest);
            if (!resultValidation.isSuccess) {
                throw new Error("Validation error:" + resultValidation.error);
            }
            const collectionTrade = (new tradeModel_1.Trade).constructor.name;
            const isExistTrade = await this.isExists(ctx, collectionTrade + _addObligationStatusRequest.tradeId);
            if (!isExistTrade) {
                throw new Error(`The trade ${_addObligationStatusRequest.tradeId} doesn't exists`);
            }
            const bufferReadTrade = await ctx.stub.getState(collectionTrade + _addObligationStatusRequest.tradeId);
            const trade = JSON.parse(bufferReadTrade.toString());
            if (trade.lifeStage != tradeLifeStage_1.TradeLifeStage.ACCEPT_CONTRACT_SELLER
                && trade.lifeStage != tradeLifeStage_1.TradeLifeStage.CLOSE_CONTRACT) {
                throw new Error(tradeLifeStage_1.TradeLifeStageInfo.getTradeLifeStageInfo(trade.lifeStage));
            }
            const collectionObligation = (new obligationModel_1.Obligation).constructor.name;
            const exists = await this.isExists(ctx, collectionObligation + _addObligationStatusRequest.commitmentID);
            if (!exists) {
                throw new Error(`The obligation ${_addObligationStatusRequest.commitmentID} does not exist`);
            }
            const bufferRead = await ctx.stub.getState(collectionObligation + _addObligationStatusRequest.commitmentID);
            var obligation = JSON.parse(bufferRead.toString());
            if (obligation.performanceStatus == performanceStatus_1.PerformanceStatus.EXECUTED) {
                throw new Error(`The obligation is already in status executed`);
            }
            //obligation.initiator = _addObligationStatusRequest.whoMadeChanges;
            obligation.performanceStatus = _addObligationStatusRequest.performanceStatus;
            if (_addObligationStatusRequest.performanceStatus > 0) {
                obligation.textDescription = _addObligationStatusRequest.textDescription;
            }
            else if (_addObligationStatusRequest.performanceStatus == 0) {
                obligation.textDescription = null;
                obligation.dateExecution = _addObligationStatusRequest.date;
            }
            const buffer = Buffer.from(JSON.stringify(obligation));
            await ctx.stub.putState(collectionObligation + _addObligationStatusRequest.commitmentID, buffer);
            const bufferForChangeState = await ctx.stub.getQueryResult(`{"selector":{"idTrade":"${_addObligationStatusRequest.tradeId}","typeObject":"${collectionObligation}","obligationPartRepo":${obligation.obligationPartRepo}}}`);
            const obligationrForChangeState = (await this.parseStateQueryIterator(bufferForChangeState));
            var isNeedChangeLifeStage = true;
            for (var i = 0; i < obligationrForChangeState.length; i++) {
                if (obligationrForChangeState[i].id != _addObligationStatusRequest.commitmentID)
                    isNeedChangeLifeStage = isNeedChangeLifeStage && (obligationrForChangeState[i].performanceStatus == performanceStatus_1.PerformanceStatus.EXECUTED);
            }
            isNeedChangeLifeStage = isNeedChangeLifeStage && (obligation.performanceStatus == performanceStatus_1.PerformanceStatus.EXECUTED);
            if (isNeedChangeLifeStage) {
                if (trade.lifeStage == tradeLifeStage_1.TradeLifeStage.ACCEPT_CONTRACT_SELLER) {
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_OBLIGATION_STATUS;
                }
                if (trade.lifeStage == tradeLifeStage_1.TradeLifeStage.CLOSE_CONTRACT) {
                    trade.lifeStage = tradeLifeStage_1.TradeLifeStage.ADD_OBLIGATION_STATUS_CLOSE;
                }
            }
            const bufferTrade = Buffer.from(JSON.stringify(trade));
            await ctx.stub.putState(collectionTrade + trade.id, bufferTrade);
            const collectionHistory = (new historyModel_1.History).constructor.name;
            const historyContract = new historyController_1.HistoryContract();
            var _addObligationStatusLog = new addObligationStatusLog_1.AddObligationStatusLog();
            _addObligationStatusLog.nameMethos = "acceptContract";
            _addObligationStatusLog.commitmentID = _addObligationStatusRequest.commitmentID;
            _addObligationStatusLog.date = _addObligationStatusRequest.date;
            _addObligationStatusLog.textDescription = _addObligationStatusRequest.textDescription;
            _addObligationStatusLog.performanceStatus = _addObligationStatusRequest.performanceStatus;
            const _descriptionInfo = JSON.stringify(_addObligationStatusLog);
            var _history = new historyModel_1.History();
            _history.description = descriptionForHistory_1.DescriptionForHistory.ADD_OBLIGATION_STATUS;
            _history.initiator = _addObligationStatusRequest.whoMadeChanges;
            _history.whatHasChanged = _descriptionInfo;
            _history.idTrade = _addObligationStatusRequest.tradeId;
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
    async getObligationList(ctx, tradeId) {
        var result = new dataResult_1.DataResult();
        try {
            const collection = (new obligationModel_1.Obligation).constructor.name;
            const buffer = await ctx.stub.getQueryResult(`{"selector":{"idTrade":"${tradeId}","typeObject":"${collection}"}}`);
            const obligation = (await this.parseStateQueryIterator(buffer));
            result.withData(obligation);
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
], ObligationContract.prototype, "isExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], ObligationContract.prototype, "createObligation", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('DataResult<Obligation>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ObligationContract.prototype, "viewObligation", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    fabric_contract_api_1.Returns('DataResult<string>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ObligationContract.prototype, "addObligationStatus", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('DataResult<Obligation[]>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], ObligationContract.prototype, "getObligationList", null);
ObligationContract = __decorate([
    fabric_contract_api_1.Info({ title: 'ObligationContract', description: 'My Smart Contract' })
], ObligationContract);
exports.ObligationContract = ObligationContract;
//# sourceMappingURL=obligationController.js.map