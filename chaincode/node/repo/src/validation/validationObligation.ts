import { ValidationFunc } from '../validation/validationfunc';

import { DataResult } from '../models/dataResult'

///Requests
import { AddObligationStatusRequest } from '../requests/obligation/addObligationStatusRequest';
import { CreateObligationRequest } from '../requests/obligation/createObligationRequest';
///Requests

export class ValidationObligation {

    public static 
    addObligationStatusObjectIsValid(data: AddObligationStatusRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.contrID || !ValidationFunc.stringIsValid(data.contrID, 16)) {
            result.withError("contrID is not valid,max length 16");
            return result;
        }
        if (!data.CommitmentID){
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
        if (!ValidationFunc.numberIsValid(data.PerformanceStatus, 1)) {
            result.withError("PerformanceStatus is not valid,maxLenToComma 1");
            return result;
        }

        result.withData(true);
        return result;
    }


    // public static createObligationObjectIsValid(data: CreateObligationRequest): DataResult<boolean> {
    //     var result = new DataResult<boolean>();
    //     if (!data) {
    //         result.withError("request is null");
    //         return result;
    //     }
    //     if (!data.dealNum || !ValidationFunc.stringIsValid(data.dealNum, 16)) {
    //         result.withError("dealNum is not valid,max length 16");
    //         return result;
    //     }
    //     if (!data.User){
    //         result.withError("User is null");
    //         return result;
    //     }
    //     if (!data.baseDescription) {
    //         result.withError("baseDescription is null");
    //         return result;
    //     }
    //     if (data.deal_amount != null) {
    //         result.withError("deal_amount is null");
    //         return result;
    //     }
    //     if (data.quantitySecurities != null) {
    //         result.withError("quantitySecurities is null");
    //         return result;
    //     }
    //     if (!data.dateExecution) {
    //         result.withError("dateExecution is null");
    //         return result;
    //     }
    //     if (!data.textDescription) {
    //         result.withError("textDescription is null");
    //         return result;
    //     }
    //     if (!ValidationFunc.numberIsValid(data.performanceStatus, 1)) {
    //         result.withError("performanceStatus is not valid,maxLenToComma 1");
    //         return result;
    //     }
    //     result.withData(true);
    //     return result;
    // }


}
