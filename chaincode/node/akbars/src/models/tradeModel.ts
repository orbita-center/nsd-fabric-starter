/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { TradeState } from '../enums/tradeState';
import { TradeLifeStage } from '../enums/tradeLifeStage';

import { SUOBase,Master_AgreementBase,CollateralBase,Collateral_UserBase,ContrSignedBase,TradeBase } from '../base_blocks/tradeBaseBlocks';



@Object()
export class ContrSigned extends ContrSignedBase  {
   
}

@Object()
export class SUO extends SUOBase  {

    @Property()
    public collateral_buyer_accept: number;
    @Property()
    public collateral_seller_accept: number;

    //Блок атрибутов ЭЦП Кредитора
    @Property()
    public buyerContrSigned: ContrSigned;
    //Блок атрибутов ЭЦП Заемщика
    @Property()
    public sellerContrSigned: ContrSigned;

}

@Object()
export class Master_Agreement extends Master_AgreementBase {
   
}


@Object()
export class Collateral extends CollateralBase {
   
}

@Object()
export class Collateral_User extends Collateral_UserBase {
  
}



@Object()
export class Trade extends TradeBase {

    //Seller заемщик
    //Buyer Кредитор
    @Property()
    public typeObject: string;
    @Property()
    public status: TradeState;
    @Property()
    public dateAcceptInProcessing: number;
    //Блок описания обеспечения
    @Property()
    public collateral: Collateral;
      
    
    //Блок описания Заемщика по сделке 
    @Property()
    public collateral_Seller: Collateral_User;
    //Блок описания Кредитора по сделке 
    @Property()
    public collateral_Buyer: Collateral_User;
   

    //Блок описания Генерального соглашения 
    @Property()
    public master_agreement: Master_Agreement;


    //Блок описания дополнительных параметров СУО НРД
    @Property()
    public suo: SUO;
    @Property()
    public lifeStage: TradeLifeStage;
    @Property()
    public isEarly: boolean;

}