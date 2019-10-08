export declare enum TradeLifeStage {
    DELETED = -10,
    ADD_CONTRACT = 10,
    ADD_SIGN_TO_CONTRACT_CREDITOR = 20,
    ADD_SIGN_TO_CONTRACT_DEBITOR = 30,
    ACCEPT_CONTRACT_DEBITOR = 40,
    ACCEPT_CONTRACT_CREDITOR = 50,
    ADD_OBLIGATION_STATUS = 60,
    ADD_PRICE_TO_CONTRACT = 61,
    CLOSE_CONTRACT = 70,
    ADD_OBLIGATION_STATUS_CLOSE = 80
}
export declare class TradeLifeStageInfo {
    static getTradeLifeStageInfo(stage: TradeLifeStage): string;
}
