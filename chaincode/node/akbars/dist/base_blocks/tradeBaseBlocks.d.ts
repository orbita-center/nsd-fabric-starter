export declare class TradeBase {
    id: string;
    deal_date: number;
    leg1_date: number;
    leg2_date: number;
    amount: number;
    currency: string;
    leg1_deal_type: string;
    threshold1: number;
    threshold2: number;
    repo_rate: number;
    int_meth: string;
}
export declare class SUOBase {
    reuse: string;
    return_var: string;
    shift_term_date: string;
    auto_margin: string;
}
export declare class Master_AgreementBase {
    code: string;
    date: number;
}
export declare class CollateralBase {
    security_code: string;
    security_isin: string;
    security_name: string;
    quantity: number;
    discount: number;
    price_types_priority: string;
}
export declare class Collateral_UserBase {
    code: string;
    short_name: string;
}
export declare class ContrSignedBase {
    dateTime: number;
    whoSigned: string;
    text: string;
    textSigned: string;
    signatureAlgorithm: string;
    publicKey: string;
    Confirmation: number;
}
