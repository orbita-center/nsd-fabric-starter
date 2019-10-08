/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { SUOBase,Master_AgreementBase,CollateralBase,Collateral_UserBase,TradeBase } from '../../base_blocks/tradeBaseBlocks';



@Object()
export class Collateral_User extends Collateral_UserBase  {
    
}


@Object()
export class Deal_collateral extends CollateralBase  {
    
}

@Object()
export class Master_Agreement extends Master_AgreementBase {
   
}

@Object()
export class SUO extends SUOBase  {

}

@Object()
export class AddTradeRequest extends TradeBase {
    //Debitor заемщик
    //Creditor Кредитор

    //Блок описания Заемщика по сделке 
    @Property()
    public debitor: Collateral_User;
    //Блок описания Кредитора по сделке 
    @Property()
    public creditor: Collateral_User;


    //Блок описания Генерального соглашения 
    @Property()
    public master_agreement: Master_Agreement;

    //Блок описания обеспечения
    @Property()
    public deal_collateral: Deal_collateral;
  
    //Блок описания дополнительных параметров СУО НРД
    @Property()
    public suo_params: SUO;

   

    @Property()
    public ObligNum1: string;
    @Property()
    public ObligNum2: string;
    @Property()
    public user: string;
}
