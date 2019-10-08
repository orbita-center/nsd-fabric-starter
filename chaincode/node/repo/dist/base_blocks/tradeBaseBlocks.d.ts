export declare class TradeBase {
    dealNum: string;
    number: string;
    trade_date: number;
    first_part_date: number;
    second_part_date: number;
    deal_amount: number;
    deal_cur: string;
    first_part_type: string;
    Threshold_low: number;
    Threshold_high: number;
    rate: number;
    int_meth_type: string;
}
export declare class SUOBase {
    Deal_reuse: string;
    Deal_return_var: string;
    Deal_shift_term_date: string;
    Deal_auto_margin: string;
}
export declare class Master_AgreementBase {
    repcode: string;
    date: number;
}
export declare class CollateralBase {
    sec_code: string;
    sec_isin: string;
    sec_name: string;
    Sec_quantity: number;
    Sec_discount: number;
    Sec_price_types_priority: string;
}
export declare class Collateral_UserBase {
    depcode: string;
    short_name: string;
}
export declare class SignBase {
    Date: number;
    signer: string;
    payload: string;
    signPayload: string;
    cryptoType: string;
    cryptoKey: string;
    deal_conf: number;
}
