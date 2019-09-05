import { SUOBase, Master_AgreementBase, CollateralBase, Collateral_UserBase, TradeBase } from '../../base_blocks/tradeBaseBlocks';
export declare class Collateral_User extends Collateral_UserBase {
}
export declare class Collateral extends CollateralBase {
}
export declare class Master_Agreement extends Master_AgreementBase {
}
export declare class SUO extends SUOBase {
}
export declare class AddTradeRequest extends TradeBase {
    collateral_Seller: Collateral_User;
    collateral_Buyer: Collateral_User;
    master_agreement: Master_Agreement;
    collateral: Collateral;
    suo: SUO;
    commitmentID1: string;
    commitmentID2: string;
    whoMadeChanges: string;
}
