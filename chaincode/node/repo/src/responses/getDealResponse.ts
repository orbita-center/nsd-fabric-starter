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
export class Master_Agreement extends Master_AgreementBase {
   
}


@Object()
export class Deal_collateral extends CollateralBase {
   
}

@Object()
export class Collateral_User extends Collateral_UserBase {
  
}



@Object()
export class GetDealResponse  {


    @Property()
    public number: string;
    //Дата заключения сделки
    @Property()
    public trade_date: number;
    //Дата расчетов первой части РЕПО
    @Property()
    public first_part_date: number;
    //Дата расчетов второй части РЕПО
    @Property()
    public second_part_date: number;
    //Сумма сделки в валюте сделки
    @Property()
    public deal_amount: number;
    //Валюта сделки
    @Property()
    public deal_cur: string;
    //Способ расчета по первой части РЕПО: DVP1; DVP3
    @Property()
    public first_part_type: string;
    //Нижний порог переоценки
    @Property()
    public Threshold_low: number;
    //Верхний порог переоценки
    @Property()
    public Threshold_high: number;
    //Фиксированная ставка (% годовых)
    @Property()
    public rate: number;
    //Код метод расчета процентов. Например: 365/366
    @Property()
    public int_meth_type: string;

    //Блок описания Кредитора по сделке 
    @Property()
    public creditor: Collateral_User;

    //Блок описания Заемщика по сделке 
    @Property()
    public debitor: Collateral_User;
        
    //Блок описания Генерального соглашения 
    @Property()
    public master_agreement: Master_Agreement;

    //Блок описания обеспечения
    @Property()
    public deal_collateral: Deal_collateral;

    //Блок описания дополнительных параметров СУО НРД
    @Property()
    public suo_params: SUOBase;

       
    @Property()
    public DealSigned: DealSigned;
}