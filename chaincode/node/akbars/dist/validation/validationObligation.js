"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationfunc_1 = require("../validation/validationfunc");
const dataResult_1 = require("../models/dataResult");
///Requests
class ValidationObligation {
    static addObligationStatusObjectIsValid(data) {
        var result = new dataResult_1.DataResult();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.tradeId || !validationfunc_1.ValidationFunc.stringIsValid(data.tradeId, 16)) {
            result.withError("id trade is not valid,max length 16");
            return result;
        }
        if (!data.commitmentID) {
            result.withError("commitmentID is null");
            return result;
        }
        if (!data.date) {
            result.withError("date is null");
            return result;
        }
        if (!data.whoMadeChanges) {
            result.withError("whoMadeChanges is null");
            return result;
        }
        if (!data.textDescription) {
            result.withError("request is null");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.performanceStatus, 1)) {
            result.withError("performanceStatus is not valid,maxLenToComma 1");
            return result;
        }
        result.withData(true);
        return result;
    }
    static createObligationObjectIsValid(data) {
        var result = new dataResult_1.DataResult();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.tradeId || !validationfunc_1.ValidationFunc.stringIsValid(data.tradeId, 16)) {
            result.withError("id trade is not valid,max length 16");
            return result;
        }
        if (!data.whoMadeChanges) {
            result.withError("whoMadeChanges is null");
            return result;
        }
        if (!data.baseDescription) {
            result.withError("baseDescription is null");
            return result;
        }
        if (data.amount != null) {
            result.withError("amount is null");
            return result;
        }
        if (data.quantitySecurities != null) {
            result.withError("quantitySecurities is null");
            return result;
        }
        if (!data.dateExecution) {
            result.withError("dateExecution is null");
            return result;
        }
        if (!data.textDescription) {
            result.withError("textDescription is null");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.performanceStatus, 1)) {
            result.withError("performanceStatus is not valid,maxLenToComma 1");
            return result;
        }
        result.withData(true);
        return result;
    }
}
exports.ValidationObligation = ValidationObligation;
//# sourceMappingURL=validationObligation.js.map