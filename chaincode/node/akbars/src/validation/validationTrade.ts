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
        if (!data.id || !ValidationFunc.stringIsValid(data.id, 16)) {
            result.withError("id trade is not valid,max length 16");
            return result;
        }
        if (!data.deal_date) {
            result.withError("deal_date is null");
            return result;
        }
        if (!data.leg1_date) {
            result.withError("leg1_date is null");
            return result;
        }
        if (!data.leg2_date) {
            result.withError("leg2_date is null");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.amount, 15, 2)) {
            result.withError("amount is not valid,maxLenToComma 15,maxLenAfterComma 2");
            return result;
        }
        if (!data.currency || !ValidationFunc.stringIsValid(data.currency, 3)) {
            result.withError("currency is not valid,max length 3");
            return result;
        }
        if (!data.leg1_deal_type || !ValidationFunc.stringIsValid(data.leg1_deal_type, 4)) {
            result.withError("leg1_deal_type is not valid,max length 4");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.threshold1, 5, 2)) {
            result.withError("threshold1 is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.threshold2, 5, 2)) {
            result.withError("threshold2 is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.repo_rate, 10, 5)) {
            result.withError("repo_rate is not valid,maxLenToComma 10,maxLenAfterComma 5");
            return result;
        }
        if (!data.int_meth || !ValidationFunc.stringIsValid(data.int_meth, 8)) {
            result.withError("int_meth is not valid,max length 8");
            return result;
        }
        if (!data.collateral_Buyer) {
            result.withError("collateral_Buyer is null");
            return result;
        }
        if (!data.collateral_Buyer.code || !ValidationFunc.stringIsValid(data.collateral_Buyer.code, 12)) {
            result.withError("collateral_Buyer.code is not valid,max length 12");
            return result;
        }
        if (!data.collateral_Buyer.short_name || !ValidationFunc.stringIsValid(data.collateral_Buyer.short_name, 120)) {
            result.withError("collateral_Buyer.short_name is not valid,max length 120");
            return result;
        }
        if (!data.collateral_Seller) {
            result.withError("collateral_Seller is null");
            return result;
        }
        if (!data.collateral_Seller.code || !ValidationFunc.stringIsValid(data.collateral_Seller.code, 12)) {
            result.withError("collateral_Seller.code is not valid,max length 12");
            return result;
        }
        if (!data.collateral_Seller.short_name || !ValidationFunc.stringIsValid(data.collateral_Seller.short_name, 120)) {
            result.withError("collateral_Seller.short_name is not valid,max length 120");
            return result;
        }
        if (!data.master_agreement) {
            result.withError("master_agreement is null");
            return result;
        }
        if (!data.master_agreement.code || !ValidationFunc.stringIsValid(data.master_agreement.code, 12)) {
            result.withError("master_agreement.code is not valid,max length 12");
            return result;
        }
        if (!data.master_agreement.date) {
            result.withError("master_agreement.date is null");
            return result;
        }
        if (!data.collateral) {
            result.withError("collateral is null");
            return result;
        }
        if (!data.collateral.security_code || !ValidationFunc.stringIsValid(data.collateral.security_code, 12)) {
            result.withError("collateral.security_code is not valid,max length 12");
            return result;
        }
        if (!data.collateral.security_isin || !ValidationFunc.stringIsValid(data.collateral.security_isin, 12)) {
            result.withError("collateral.security_isin is not valid,max length 12");
            return result;
        }
        if (!data.collateral.security_name || !ValidationFunc.stringIsValid(data.collateral.security_name, 30)) {
            result.withError("collateral.security_name is not valid,max length 30");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.collateral.quantity, 18)) {
            result.withError("collateral.quantity is not valid,maxLenToComma 18");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.collateral.discount, 5, 2)) {
            result.withError("collateral.discount is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!data.collateral.price_types_priority || !ValidationFunc.stringIsValid(data.collateral.price_types_priority, 62)) {
            result.withError("collateral.price_types_priority is not valid,max length 62");
            return result;
        }
        if (!data.suo) {
            result.withError("suo is null");
            return result;
        }
        if (!data.suo.auto_margin || !ValidationFunc.stringIsValid(data.suo.auto_margin, 1) && "YN".indexOf(data.suo.auto_margin)!=-1) {
            result.withError("suo.auto_margin is not valid,max length 1");
            return result;
        }
        if (!data.suo.return_var || !ValidationFunc.stringIsValid(data.suo.return_var, 512)) {
            result.withError("suo.return_var is not valid,max length 512");
            return result;
        }
        if (!data.suo.reuse || !ValidationFunc.stringIsValid(data.suo.reuse, 1) && "YN".indexOf(data.suo.reuse)!=-1) {
            result.withError("suo.reuse is not valid,max length 1");
            return result;
        }
        if (!data.suo.shift_term_date || !ValidationFunc.stringIsValid(data.suo.shift_term_date, 50)) {
            result.withError("suo.shift_term_date is not valid,max length 50");
            return result;
        }
        if (!data.whoMadeChanges) {
            result.withError("whoMadeChanges is null");
            return result;
        }
        if (!data.commitmentID1) {
            result.withError("commitmentID1 is null");
            return result;
        }
        if (!data.commitmentID2) {
            result.withError("commitmentID2 is null");
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
        if (!data.tradeId || !ValidationFunc.stringIsValid(data.tradeId, 16))
        {
            result.withError("id trade is null");
            return result;
        }
        if (!data.dateTime) {
            result.withError("collateral is null");
            return result;
        }
        if (!data.whoAccepted) {
            result.withError("whoAccepted is null");
            return result;
        }
        if (!data.typeOrg) {
            result.withError("typeOrg is null");
            return result;
        }
        if (!data.text) {
            result.withError("text is null");
            return result;
        }
        if (!data.textSigned) {
            result.withError("textSigned is null");
            return result;
        }
        if (!data.signatureAlgorithm) {
            result.withError("signatureAlgorithm is null");
            return result;
        }
        if (!data.signatureAlgorithm) {
            result.withError("publicKey is null");
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
        if (!data.tradeId || !ValidationFunc.stringIsValid(data.tradeId, 16))
        {
            result.withError("id trade is null");
            return result;
        }
        if (!data.dateTime) {
            result.withError("dateTime is null");
            return result;
        } 
        if (!data.typeOrg) {
            result.withError("typeOrg is null");
            return result;
        } 
        if (!data.whoMadeChanges) {
            result.withError("whoMadeChanges is null");
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
        if (!data.tradeId || !ValidationFunc.stringIsValid(data.tradeId, 16))
        {
            result.withError("id trade is null");
            return result;
        }
        if (!data.dateTime) {
            result.withError("dateTime is null");
            return result;
        }
        if (!data.commitmentID1) {
            result.withError("commitmentID1 is null");
            return result;
        } 
        if (!data.commitmentID2) {
            result.withError("commitmentID2 is null");
            return result;
        } 
        if (!data.whoMadeChanges) {
            result.withError("whoMadeChanges is null");
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
        if (!data.tradeId || !ValidationFunc.stringIsValid(data.tradeId, 16))
        {
            result.withError("id trade is null");
            return result;
        }
        if (!ValidationFunc.numberIsValid(data.amount, 15, 2)) {
            result.withError("amount is not valid, it should be number(15, 2)");
            return result;
        } 
        if (!ValidationFunc.numberIsValid(data.quantitySecurities, 18, 0)) {
            result.withError("quantitySecurities is not valid, it should be number(18, 0)");
            return result;
        } 
        if (!data.dateTimeChange) {
            result.withError("dateTimeChange is null");
            return result;
        } 
        if (!data.whoMadeChanges) {
            result.withError("whoMadeChanges is null");
            return result;
        }
        
        result.withData(true);
        return result;
    }

}
