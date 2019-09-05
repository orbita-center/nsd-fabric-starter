import { TradeState } from '../enums/tradeState';
import { TradeLifeStage } from '../enums/tradeLifeStage';
import { SUOBase, Master_AgreementBase, CollateralBase, Collateral_UserBase, ContrSignedBase, TradeBase } from '../base_blocks/tradeBaseBlocks';
export declare class ContrSigned extends ContrSignedBase {
}
export declare class SUO extends SUOBase {
    collateral_buyer_accept: number;
    collateral_seller_accept: number;
    buyerContrSigned: ContrSigned;
    sellerContrSigned: ContrSigned;
}
export declare class Master_Agreement extends Master_AgreementBase {
}
export declare class Collateral extends CollateralBase {
}
export declare class Collateral_User extends Collateral_UserBase {
}
export declare class Trade extends TradeBase {
    typeObject: string;
    status: TradeState;
    dateAcceptInProcessing: number;
    collateral: Collateral;
    collateral_Seller: Collateral_User;
    collateral_Buyer: Collateral_User;
    master_agreement: Master_Agreement;
    suo: SUO;
    lifeStage: TradeLifeStage;
    isEarly: boolean;
}
