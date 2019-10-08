import { ValidationFunc } from '../validation/validationfunc';

import { DataResult } from '../models/dataResult'

///Requests
import { CloseTradeRequest } from '../requests/tradeRequests/closeTradeRequest';
import { AcceptTradeRequest } from '../requests/tradeRequests/acceptTradeRequest';
import { AddTradeRequest } from '../requests/tradeRequests/addTradeRequest';
import { AddSignToTradeRequest } from '../requests/tradeRequests/addSignToTradeRequest';
import { UpdTradeRequest } from '../requests/tradeRequests/updTradeRequest';
import { AddPriceToTradeRequest } from '../requests/tradeRequests/addPriceToTradeRequest';
///Requests

export class ValidationTrade {
   
    public static addTradeObjectIsValid(data: AddTradeRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.number || !ValidationFunc.stringIsValid(data.number, 16)) {
            result.withError("number is not valid,max length 16");
            return result;
        }
        if (!data.trade_date) {
            result.withError("trade_date is null");
            return result;
        }
        if (!data.first_part_date) {
            result.withError("first_part_date is null");
            return result;
        }
        if (!data.second_part_date) {
            result.withError("second_part_date is null");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.deal_amount, 15, 2)) {
            result.withError("deal_amount is not valid,maxLenToComma 15,maxLenAfterComma 2");
            return result;
        }
        if (!data.deal_cur || !ValidationFunc.stringIsValid(data.deal_cur, 3)) {
            result.withError("deal_cur is not valid,max length 3");
            return result;
        }
        if (!data.first_part_type || !ValidationFunc.stringIsValid(data.first_part_type, 4)) {
            result.withError("first_part_type is not valid,max length 4");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.Threshold_low, 5, 2)) {
            result.withError("Threshold_low is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.Threshold_high, 5, 2)) {
            result.withError("Threshold_high is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.rate, 10, 5)) {
            result.withError("rate is not valid,maxLenToComma 10,maxLenAfterComma 5");
            return result;
        }
        if (!data.int_meth_type || !ValidationFunc.stringIsValid(data.int_meth_type, 8)) {
            result.withError("int_meth_type is not valid,max length 8");
            return result;
        }
        if (!data.creditor) {
            result.withError("creditor is null");
            return result;
        }
        if (!data.creditor.depcode || !ValidationFunc.stringIsValid(data.creditor.depcode, 12)) {
            result.withError("creditor.depcode is not valid,max length 12");
            return result;
        }
        if (!data.creditor.short_name || !ValidationFunc.stringIsValid(data.creditor.short_name, 120)) {
            result.withError("creditor.short_name is not valid,max length 120");
            return result;
        }
        if (!data.debitor) {
            result.withError("debitor is null");
            return result;
        }
        if (!data.debitor.depcode || !ValidationFunc.stringIsValid(data.debitor.depcode, 12)) {
            result.withError("debitor.depcode is not valid,max length 12");
            return result;
        }
        if (!data.debitor.short_name || !ValidationFunc.stringIsValid(data.debitor.short_name, 120)) {
            result.withError("debitor.short_name is not valid,max length 120");
            return result;
        }
        if (!data.master_agreement) {
            result.withError("master_agreement is null");
            return result;
        }
        if (!data.master_agreement.repcode || !ValidationFunc.stringIsValid(data.master_agreement.repcode, 12)) {
            result.withError("master_agreement.repcode is not valid,max length 12");
            return result;
        }
        if (!data.master_agreement.date) {
            result.withError("master_agreement.date is null");
            return result;
        }
        if (!data.deal_collateral) {
            result.withError("deal_collateral is null");
            return result;
        }
        if (!data.deal_collateral.sec_code || !ValidationFunc.stringIsValid(data.deal_collateral.sec_code, 12)) {
            result.withError("deal_collateral.sec_code is not valid,max length 12");
            return result;
        }
        if (!data.deal_collateral.sec_isin || !ValidationFunc.stringIsValid(data.deal_collateral.sec_isin, 12)) {
            result.withError("deal_collateral.sec_isin is not valid,max length 12");
            return result;
        }
        if (!data.deal_collateral.sec_name || !ValidationFunc.stringIsValid(data.deal_collateral.sec_name, 30)) {
            result.withError("deal_collateral.sec_name is not valid,max length 30");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.deal_collateral.Sec_quantity, 18)) {
            result.withError("deal_collateral.Sec_quantity is not valid,maxLenToComma 18");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.deal_collateral.Sec_discount, 5, 2)) {
            result.withError("deal_collateral.Sec_discount is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!data.deal_collateral.Sec_price_types_priority || !ValidationFunc.stringIsValid(data.deal_collateral.Sec_price_types_priority, 62)) {
            result.withError("deal_collateral.Sec_price_types_priority is not valid,max length 62");
            return result;
        }
        if (!data.suo_params) {
            result.withError("suo_params is null");
            return result;
        }
        if (!data.suo_params.Deal_auto_margin || !ValidationFunc.stringIsValid(data.suo_params.Deal_auto_margin, 1) && "YN".indexOf(data.suo_params.Deal_auto_margin)!=-1) {
            result.withError("suo_params.Deal_auto_margin is not valid,max length 1");
            return result;
        }
        if (!data.suo_params.Deal_return_var || !ValidationFunc.stringIsValid(data.suo_params.Deal_return_var, 512)) {
            result.withError("suo_params.Deal_return_var is not valid,max length 512");
            return result;
        }
        if (!data.suo_params.Deal_reuse || !ValidationFunc.stringIsValid(data.suo_params.Deal_reuse, 1) && "YN".indexOf(data.suo_params.Deal_reuse)!=-1) {
            result.withError("suo_params.Deal_reuse is not valid,max length 1");
            return result;
        }
        if (!data.suo_params.Deal_shift_term_date || !ValidationFunc.stringIsValid(data.suo_params.Deal_shift_term_date, 50)) {
            result.withError("suo_params.Deal_shift_term_date is not valid,max length 50");
            return result;
        }
        if (!data.user) {
            result.withError("user is null");
            return result;
        }
        if (!data.ObligNum1) {
            result.withError("ObligNum1 is null");
            return result;
        }
        if (!data.ObligNum2) {
            result.withError("ObligNum2 is null");
            return result;
        }
        result.withData(true);
        return result;
    }


    public static addSingToTradeObjectIsValid(data: AddSignToTradeRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }    
        if (!data.dealNum || !ValidationFunc.stringIsValid(data.dealNum, 16))
        {
            result.withError("dealNum is null");
            return result;
        }
        if (!data.Date) {
            result.withError("Date is null");
            return result;
        }
        if (!data.signer) {
            result.withError("signer is null");
            return result;
        }
        if (!data.partyRole) {
            result.withError("partyRole is null");
            return result;
        }
        if (!data.payload) {
            result.withError("payload is null");
            return result;
        }
        if (!data.signPayload) {
            result.withError("signPayload is null");
            return result;
        }
        if (!data.cryptoType) {
            result.withError("cryptoType is null");
            return result;
        }
        if (!data.cryptoKey) {
            result.withError("cryptoKey is null");
            return result;
        }
        
        result.withData(true);
        return result;
    }


    public static acceptTradeObjectIsValid(data: AcceptTradeRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }    
        if (!data.dealNum || !ValidationFunc.stringIsValid(data.dealNum, 16))
        {
            result.withError("dealNum is null");
            return result;
        }
        if (!data.Date) {
            result.withError("Date is null");
            return result;
        } 
        if (!data.partyRole) {
            result.withError("partyRole is null");
            return result;
        } 
        if (!data.User) {
            result.withError("User is null");
            return result;
        } 

        result.withData(true);
        return result;
    }


    public static closeTradeObjectIsValid(data: CloseTradeRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }    
        if (!data.contrID || !ValidationFunc.stringIsValid(data.contrID, 16))
        {
            result.withError("contrID is null");
            return result;
        }
        if (!data.date) {
            result.withError("date is null");
            return result;
        }
        if (!data.CommitmentID1) {
            result.withError("CommitmentID1 is null");
            return result;
        } 
        if (!data.CommitmentID2) {
            result.withError("CommitmentID2 is null");
            return result;
        } 
        if (!data.WhoMadeChanges) {
            result.withError("WhoMadeChanges is null");
            return result;
        } 
        
        result.withData(true);
        return result;
    }

    public static updTradeObjectIsValid(data: UpdTradeRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }    
        if (!data.contrID || !ValidationFunc.stringIsValid(data.contrID, 16))
        {
            result.withError("contrID is null");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.Amount, 15, 2)) {
            result.withError("Amount is not valid, it should be number(15, 2)");
            return result;
        } 
        if (!ValidationFunc.numberIsValid(data.QuantitySecurities, 18, 0)) {
            result.withError("QuantitySecurities is not valid, it should be number(18, 0)");
            return result;
        } 
        if (!data.DateTimeChange) {
            result.withError("DateTimeChange is null");
            return result;
        } 
        if (!data.WhoMadeChanges) {
            result.withError("WhoMadeChanges is null");
            return result;
        }
        
        result.withData(true);
        return result;
    }

    
    public static AddPriceToTradeRequestIsValid(data: AddPriceToTradeRequest): DataResult<boolean> {
        var result = new DataResult<boolean>();
        if (!data) {
            result.withError("request is null");
            return result;
        }    
        if (!data.contrID || !ValidationFunc.stringIsValid(data.contrID, 16))
        {
            result.withError("contrID is null");
            return result;
        }
        if (!data.date) {
            result.withError("date is null");
            return result;
        }
        if (!data.WhoMadeChanges) {
            result.withError("WhoMadeChanges is null");
            return result;
        }
        if (!data.security_code) {
            result.withError("security_code is null");
            return result;
        }
        if (!data.security_isin) {
            result.withError("security_isin is null");
            return result;
        }
        if (!data.security_name) {
            result.withError("security_name is null");
            return result;
        }
        if (!data.market_price || !ValidationFunc.numberIsValid(data.market_price,32, 16))
        {
            result.withError("market_price is null");
            return result;
        }
        if (!data.market_price_type) {
            result.withError("market_price_type is null");
            return result;
        }
        if (!data.market_price_cur) {
            result.withError("market_price_cur is null");
            return result;
        }
        if (!data.price_date)
        {
            result.withError("price_date is null");
            return result;
        }
        if (!data.coupon_income && data.coupon_income!=0 || !ValidationFunc.numberIsValid(data.coupon_income, 32, 16))
        {
            result.withError("coupon_income is null");
            return result;
        }
        if (!data.income_cur) {
            result.withError("income_cur is null");
            return result;
        }
        if (!data.price || !ValidationFunc.numberIsValid(data.price, 32, 16))
        {
            result.withError("price is null");
            return result;
        }
        if (!data.price_cur) {
            result.withError("price_cur is null");
            return result;
        }
        if (!data.oblID) {
            result.withError("oblID is null");
            return result;
        }
        
        result.withData(true);
        return result;
    }



}
