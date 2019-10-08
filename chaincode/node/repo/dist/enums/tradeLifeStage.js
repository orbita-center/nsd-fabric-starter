"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TradeLifeStage;
(function (TradeLifeStage) {
    TradeLifeStage[TradeLifeStage["DELETED"] = -10] = "DELETED";
    TradeLifeStage[TradeLifeStage["ADD_CONTRACT"] = 10] = "ADD_CONTRACT";
    TradeLifeStage[TradeLifeStage["ADD_SIGN_TO_CONTRACT_CREDITOR"] = 20] = "ADD_SIGN_TO_CONTRACT_CREDITOR";
    TradeLifeStage[TradeLifeStage["ADD_SIGN_TO_CONTRACT_DEBITOR"] = 30] = "ADD_SIGN_TO_CONTRACT_DEBITOR";
    TradeLifeStage[TradeLifeStage["ACCEPT_CONTRACT_DEBITOR"] = 40] = "ACCEPT_CONTRACT_DEBITOR";
    TradeLifeStage[TradeLifeStage["ACCEPT_CONTRACT_CREDITOR"] = 50] = "ACCEPT_CONTRACT_CREDITOR";
    TradeLifeStage[TradeLifeStage["ADD_OBLIGATION_STATUS"] = 60] = "ADD_OBLIGATION_STATUS";
    TradeLifeStage[TradeLifeStage["ADD_PRICE_TO_CONTRACT"] = 61] = "ADD_PRICE_TO_CONTRACT";
    // ADD_OBLIGATION_STATUS_AFTER_REASSESSMENT=62,
    TradeLifeStage[TradeLifeStage["CLOSE_CONTRACT"] = 70] = "CLOSE_CONTRACT";
    TradeLifeStage[TradeLifeStage["ADD_OBLIGATION_STATUS_CLOSE"] = 80] = "ADD_OBLIGATION_STATUS_CLOSE";
})(TradeLifeStage = exports.TradeLifeStage || (exports.TradeLifeStage = {}));
class TradeLifeStageInfo {
    static getTradeLifeStageInfo(stage) {
        switch (stage) {
            case TradeLifeStage.DELETED: {
                return "State:сontract removed";
                break;
            }
            case TradeLifeStage.ADD_CONTRACT: {
                return "State:contract was created";
                break;
            }
            case TradeLifeStage.ADD_SIGN_TO_CONTRACT_DEBITOR: {
                return "State:added signature from debitor";
                break;
            }
            case TradeLifeStage.ADD_SIGN_TO_CONTRACT_CREDITOR: {
                return "State:added signature from creditor";
                break;
            }
            case TradeLifeStage.ACCEPT_CONTRACT_CREDITOR: {
                return "State:added confirmation sign from the creditor";
                break;
            }
            case TradeLifeStage.ACCEPT_CONTRACT_DEBITOR: {
                return "State:added confirmation sign from the debitor";
                break;
            }
            case TradeLifeStage.ADD_OBLIGATION_STATUS: {
                return "State:updated obligation status";
                break;
            }
            case TradeLifeStage.ADD_PRICE_TO_CONTRACT: {
                return "State:reassessment of liabilities and accrual of interest was performed";
                break;
            }
            case TradeLifeStage.CLOSE_CONTRACT: {
                return "State:contract is closed";
                break;
            }
            case TradeLifeStage.ADD_OBLIGATION_STATUS_CLOSE: {
                return "State:updated obligation status after close contract";
                break;
            }
            default: {
                return `State:unknow, now ${stage}`;
                break;
            }
        }
    }
}
exports.TradeLifeStageInfo = TradeLifeStageInfo;
//# sourceMappingURL=tradeLifeStage.js.map