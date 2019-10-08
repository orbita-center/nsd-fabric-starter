import { SUOBase, Master_AgreementBase, CollateralBase, Collateral_UserBase, TradeBase } from '../../base_blocks/tradeBaseBlocks';
export declare class Collateral_User extends Collateral_UserBase {
}
export declare class Deal_collateral extends CollateralBase {
}
export declare class Master_Agreement extends Master_AgreementBase {
}
export declare class SUO extends SUOBase {
}
export declare class AddTradeRequest extends TradeBase {
    debitor: Collateral_User;
    creditor: Collateral_User;
    master_agreement: Master_Agreement;
    deal_collateral: Deal_collateral;
    suo_params: SUO;
    ObligNum1: string;
    ObligNum2: string;
    user: string;
}
