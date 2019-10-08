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
        if (!data.contrID || !validationfunc_1.ValidationFunc.stringIsValid(data.contrID, 16)) {
            result.withError("contrID is not valid,max length 16");
            return result;
        }
        if (!data.CommitmentID) {
            result.withError("commitmentID is null");
            return result;
        }
        if (!data.DateTime) {
            result.withError("DateTime is null");
            return result;
        }
        if (!data.WhoMadeChanges) {
            result.withError("WhoMadeChanges is null");
            return result;
        }
        if (!data.TextDescription) {
            result.withError("TextDescription is null");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.PerformanceStatus, 1)) {
            result.withError("PerformanceStatus is not valid,maxLenToComma 1");
            return result;
        }
        result.withData(true);
        return result;
    }
}
exports.ValidationObligation = ValidationObligation;
//# sourceMappingURL=validationObligation.js.map