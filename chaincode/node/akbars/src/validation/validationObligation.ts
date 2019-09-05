import { ValidationFunc } from '../validation/validationfunc';

import { DataResult } from '../models/dataResult'

///Requests
import { AddObligationStatusRequest } from '../requests/obligation/addObligationStatusRequest';
import { CreateObligationRequest } from '../requests/obligation/createObligationRequest';
///Requests

export class ValidationObligation {

    public static addObligationStatusObjectIsValid(data: AddObligationStatusRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.tradeId || !ValidationFunc.stringIsValid(data.tradeId, 16)) {
            result.withError("id trade is not valid,max length 16");
            return result;
        }
        if (!data.commitmentID){
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
        if (!ValidationFunc.numberIsValid(data.performanceStatus, 1)) {
            result.withError("performanceStatus is not valid,maxLenToComma 1");
            return result;
        }

        result.withData(true);
        return result;
    }


    public static createObligationObjectIsValid(data: CreateObligationRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.tradeId || !ValidationFunc.stringIsValid(data.tradeId, 16)) {
            result.withError("id trade is not valid,max length 16");
            return result;
        }
        if (!data.whoMadeChanges){
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
        if (!ValidationFunc.numberIsValid(data.performanceStatus, 1)) {
            result.withError("performanceStatus is not valid,maxLenToComma 1");
            return result;
        }
        result.withData(true);
        return result;
    }


}
