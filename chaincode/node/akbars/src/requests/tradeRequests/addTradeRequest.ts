/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { SUOBase,Master_AgreementBase,CollateralBase,Collateral_UserBase,TradeBase } from '../../base_blocks/tradeBaseBlocks';



@Object()
export class Collateral_User extends Collateral_UserBase  {
    
}


@Object()
export class Collateral extends CollateralBase  {
    
}

@Object()
export class Master_Agreement extends Master_AgreementBase {
   
}

@Object()
export class SUO extends SUOBase  {

}

@Object()
export class AddTradeRequest extends TradeBase {
    //Seller заемщик
    //Buyer Кредитор

    //Блок описания Заемщика по сделке 
    @Property()
    public collateral_Seller: Collateral_User;
    //Блок описания Кредитора по сделке 
    @Property()
    public collateral_Buyer: Collateral_User;


    //Блок описания Генерального соглашения 
    @Property()
    public master_agreement: Master_Agreement;

    //Блок описания обеспечения
    @Property()
    public collateral: Collateral;
  
    //Блок описания дополнительных параметров СУО НРД
    @Property()
    public suo: SUO;

   

    @Property()
    public commitmentID1: string;
    @Property()
    public commitmentID2: string;
    @Property()
    public whoMadeChanges: string;
}
