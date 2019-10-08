/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { TradeState } from '../enums/tradeState';
import { TradeLifeStage } from '../enums/tradeLifeStage';

import { SUOBase,Master_AgreementBase,CollateralBase,Collateral_UserBase,SignBase,TradeBase } from '../base_blocks/tradeBaseBlocks';



@Object()
export class Sign extends SignBase  {
   
}


@Object()
export class DealSigned {
     //Блок атрибутов ЭЦП Кредитора
     @Property()
     public creditorSign: Sign;
     //Блок атрибутов ЭЦП Заемщика
     @Property()
     public debitorSign: Sign;
}
   

@Object()
export class SUO extends SUOBase  {

    @Property()
    public collateral_creditor_accept: number;
    @Property()
    public collateral_debitor_accept: number;

   

}

@Object()
export class Master_Agreement extends Master_AgreementBase {
   
}


@Object()
export class Deal_collateral extends CollateralBase {
   
}

@Object()
export class Collateral_User extends Collateral_UserBase {
  
}



@Object()
export class Trade extends TradeBase {

    //Debitor заемщик
    //Creditor Кредитор
    @Property()
    public typeObject: string;
    @Property()
    public status: TradeState;
    @Property()
    public dateAcceptInProcessing: number;
    //Блок описания обеспечения
    @Property()
    public deal_collateral: Deal_collateral;
      
    
    //Блок описания Заемщика по сделке 
    @Property()
    public debitor: Collateral_User;
    //Блок описания Кредитора по сделке 
    @Property()
    public creditor: Collateral_User;
   

    //Блок описания Генерального соглашения 
    @Property()
    public master_agreement: Master_Agreement;


    //Блок описания дополнительных параметров СУО НРД
    @Property()
    public suo_params: SUO;
    @Property()
    public DealSigned: DealSigned;
    @Property()
    public lifeStage: TradeLifeStage;
    @Property()
    public isEarly: boolean;

}