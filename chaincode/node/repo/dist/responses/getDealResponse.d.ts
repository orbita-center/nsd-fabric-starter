import { SUOBase, Master_AgreementBase, CollateralBase, Collateral_UserBase, SignBase } from '../base_blocks/tradeBaseBlocks';
export declare class Sign extends SignBase {
}
export declare class DealSigned {
    creditorSign: Sign;
    debitorSign: Sign;
}
export declare class Master_Agreement extends Master_AgreementBase {
}
export declare class Deal_collateral extends CollateralBase {
}
export declare class Collateral_User extends Collateral_UserBase {
}
export declare class GetDealResponse {
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
    creditor: Collateral_User;
    debitor: Collateral_User;
    master_agreement: Master_Agreement;
    deal_collateral: Deal_collateral;
    suo_params: SUOBase;
    DealSigned: DealSigned;
}
