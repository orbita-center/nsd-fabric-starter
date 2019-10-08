import { TradeState } from '../enums/tradeState';
import { TradeLifeStage } from '../enums/tradeLifeStage';
import { SUOBase, Master_AgreementBase, CollateralBase, Collateral_UserBase, SignBase, TradeBase } from '../base_blocks/tradeBaseBlocks';
export declare class Sign extends SignBase {
}
export declare class DealSigned {
    creditorSign: Sign;
    debitorSign: Sign;
}
export declare class SUO extends SUOBase {
    collateral_creditor_accept: number;
    collateral_debitor_accept: number;
}
export declare class Master_Agreement extends Master_AgreementBase {
}
export declare class Deal_collateral extends CollateralBase {
}
export declare class Collateral_User extends Collateral_UserBase {
}
export declare class Trade extends TradeBase {
    typeObject: string;
    status: TradeState;
    dateAcceptInProcessing: number;
    deal_collateral: Deal_collateral;
    debitor: Collateral_User;
    creditor: Collateral_User;
    master_agreement: Master_Agreement;
    suo_params: SUO;
    DealSigned: DealSigned;
    lifeStage: TradeLifeStage;
    isEarly: boolean;
}
