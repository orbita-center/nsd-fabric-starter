export declare enum TradeLifeStage {
    DELETED = -10,
    ADD_CONTRACT = 10,
    ADD_SIGN_TO_CONTRACT_SELLER = 20,
    ADD_SIGN_TO_CONTRACT_BUYER = 30,
    ACCEPT_CONTRACT_BUYER = 40,
    ACCEPT_CONTRACT_SELLER = 50,
    ADD_OBLIGATION_STATUS = 60,
    ADD_PRICE_TO_CONTRACT = 61,
    CLOSE_CONTRACT = 70,
    ADD_OBLIGATION_STATUS_CLOSE = 80
}
export declare class TradeLifeStageInfo {
    static getTradeLifeStageInfo(stage: TradeLifeStage): string;
}
