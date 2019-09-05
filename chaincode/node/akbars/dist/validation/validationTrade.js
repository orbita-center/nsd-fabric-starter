"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationfunc_1 = require("../validation/validationfunc");
const dataResult_1 = require("../models/dataResult");
///Requests
class ValidationTrade {
    static addTradeObjectIsValid(data) {
        var result = new dataResult_1.DataResult();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.id || !validationfunc_1.ValidationFunc.stringIsValid(data.id, 16)) {
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
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.amount, 15, 2)) {
            result.withError("amount is not valid,maxLenToComma 15,maxLenAfterComma 2");
            return result;
        }
        if (!data.currency || !validationfunc_1.ValidationFunc.stringIsValid(data.currency, 3)) {
            result.withError("currency is not valid,max length 3");
            return result;
        }
        if (!data.leg1_deal_type || !validationfunc_1.ValidationFunc.stringIsValid(data.leg1_deal_type, 4)) {
            result.withError("leg1_deal_type is not valid,max length 4");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.threshold1, 5, 2)) {
            result.withError("threshold1 is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.threshold2, 5, 2)) {
            result.withError("threshold2 is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.repo_rate, 10, 5)) {
            result.withError("repo_rate is not valid,maxLenToComma 10,maxLenAfterComma 5");
            return result;
        }
        if (!data.int_meth || !validationfunc_1.ValidationFunc.stringIsValid(data.int_meth, 8)) {
            result.withError("int_meth is not valid,max length 8");
            return result;
        }
        if (!data.collateral_Buyer) {
            result.withError("collateral_Buyer is null");
            return result;
        }
        if (!data.collateral_Buyer.code || !validationfunc_1.ValidationFunc.stringIsValid(data.collateral_Buyer.code, 12)) {
            result.withError("collateral_Buyer.code is not valid,max length 12");
            return result;
        }
        if (!data.collateral_Buyer.short_name || !validationfunc_1.ValidationFunc.stringIsValid(data.collateral_Buyer.short_name, 120)) {
            result.withError("collateral_Buyer.short_name is not valid,max length 120");
            return result;
        }
        if (!data.collateral_Seller) {
            result.withError("collateral_Seller is null");
            return result;
        }
        if (!data.collateral_Seller.code || !validationfunc_1.ValidationFunc.stringIsValid(data.collateral_Seller.code, 12)) {
            result.withError("collateral_Seller.code is not valid,max length 12");
            return result;
        }
        if (!data.collateral_Seller.short_name || !validationfunc_1.ValidationFunc.stringIsValid(data.collateral_Seller.short_name, 120)) {
            result.withError("collateral_Seller.short_name is not valid,max length 120");
            return result;
        }
        if (!data.master_agreement) {
            result.withError("master_agreement is null");
            return result;
        }
        if (!data.master_agreement.code || !validationfunc_1.ValidationFunc.stringIsValid(data.master_agreement.code, 12)) {
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
        if (!data.collateral.security_code || !validationfunc_1.ValidationFunc.stringIsValid(data.collateral.security_code, 12)) {
            result.withError("collateral.security_code is not valid,max length 12");
            return result;
        }
        if (!data.collateral.security_isin || !validationfunc_1.ValidationFunc.stringIsValid(data.collateral.security_isin, 12)) {
            result.withError("collateral.security_isin is not valid,max length 12");
            return result;
        }
        if (!data.collateral.security_name || !validationfunc_1.ValidationFunc.stringIsValid(data.collateral.security_name, 30)) {
            result.withError("collateral.security_name is not valid,max length 30");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.collateral.quantity, 18)) {
            result.withError("collateral.quantity is not valid,maxLenToComma 18");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.collateral.discount, 5, 2)) {
            result.withError("collateral.discount is not valid,maxLenToComma 5,maxLenAfterComma 2");
            return result;
        }
        if (!data.collateral.price_types_priority || !validationfunc_1.ValidationFunc.stringIsValid(data.collateral.price_types_priority, 62)) {
            result.withError("collateral.price_types_priority is not valid,max length 62");
            return result;
        }
        if (!data.suo) {
            result.withError("suo is null");
            return result;
        }
        if (!data.suo.auto_margin || !validationfunc_1.ValidationFunc.stringIsValid(data.suo.auto_margin, 1) && "YN".indexOf(data.suo.auto_margin) != -1) {
            result.withError("suo.auto_margin is not valid,max length 1");
            return result;
        }
        if (!data.suo.return_var || !validationfunc_1.ValidationFunc.stringIsValid(data.suo.return_var, 512)) {
            result.withError("suo.return_var is not valid,max length 512");
            return result;
        }
        if (!data.suo.reuse || !validationfunc_1.ValidationFunc.stringIsValid(data.suo.reuse, 1) && "YN".indexOf(data.suo.reuse) != -1) {
            result.withError("suo.reuse is not valid,max length 1");
            return result;
        }
        if (!data.suo.shift_term_date || !validationfunc_1.ValidationFunc.stringIsValid(data.suo.shift_term_date, 50)) {
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
    static addSingToTradeObjectIsValid(data) {
        var result = new dataResult_1.DataResult();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.tradeId || !validationfunc_1.ValidationFunc.stringIsValid(data.tradeId, 16)) {
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
    static acceptTradeObjectIsValid(data) {
        var result = new dataResult_1.DataResult();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.tradeId || !validationfunc_1.ValidationFunc.stringIsValid(data.tradeId, 16)) {
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
    static closeTradeObjectIsValid(data) {
        var result = new dataResult_1.DataResult();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.tradeId || !validationfunc_1.ValidationFunc.stringIsValid(data.tradeId, 16)) {
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
    static updTradeObjectIsValid(data) {
        var result = new dataResult_1.DataResult();
        if (!data) {
            result.withError("request is null");
            return result;
        }
        if (!data.tradeId || !validationfunc_1.ValidationFunc.stringIsValid(data.tradeId, 16)) {
            result.withError("id trade is null");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.amount, 15, 2)) {
            result.withError("amount is not valid, it should be number(15, 2)");
            return result;
        }
        if (!validationfunc_1.ValidationFunc.numberIsValid(data.quantitySecurities, 18, 0)) {
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
exports.ValidationTrade = ValidationTrade;
//# sourceMappingURL=validationTrade.js.map