/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { TradeState } from '../enums/tradeState';

@Object()
export class TradeBase{

    @Property()
    public id: string;
    //Дата заключения сделки
    @Property()
    public deal_date: number;
    //Дата расчетов первой части РЕПО
    @Property()
    public leg1_date: number;
    //Дата расчетов второй части РЕПО
    @Property()
    public leg2_date: number;
    //Сумма сделки в валюте сделки
    @Property()
    public amount: number;
    //Валюта сделки
    @Property()
    public currency: string;
    //Способ расчета по первой части РЕПО: DVP1; DVP3
    @Property()
    public leg1_deal_type: string;
    //Нижний порог переоценки
    @Property()
    public threshold1: number;
    //Верхний порог переоценки
    @Property()
    public threshold2: number;
    //Фиксированная ставка (% годовых)
    @Property()
    public repo_rate: number;
    //Код метод расчета процентов. Например: 365/366
    @Property()
    public int_meth: string;
  
}





@Object()
export class SUOBase {
    @Property()
    public reuse: string;
    @Property()
    public return_var: string;
    @Property()
    public shift_term_date: string;
    @Property()
    public auto_margin: string;
}


@Object()
export class Master_AgreementBase {
    @Property()
    public code: string;
    @Property()
    public date: number;
}


@Object()
export class CollateralBase {
    @Property()
    public security_code: string;
    @Property()
    public security_isin: string;
    @Property()
    public security_name: string;
    @Property()
    public quantity: number;
    @Property()
    public discount: number;
    @Property()
    public price_types_priority: string;
    
}


@Object()
export class Collateral_UserBase {
    @Property()
    public code: string;
    @Property()
    public short_name: string;
    
}

   
@Object()
export class ContrSignedBase {
    //Дата и время подписания
    @Property()
    public dateTime: number;
    //Реквизиты владельца сертификата
    @Property()
    public whoSigned: string;
    //Оригинал документа
    @Property()
    public text: string;
    //Подпись
    @Property()
    public textSigned: string;
    //Алгоритм подписи издателя сертификата
    @Property()
    public signatureAlgorithm: string;
    //Открытый ключ в формате base64
    @Property()
    public publicKey: string;
    //Подтверждение сделки 1 – подтверждена
    @Property()
    public Confirmation: number;
}




// //Блок описания дополнительных параметров СУО НРД

// @Property()
// public returnVar: string;
// @Property()
// public shiftTermDate: string;
// @Property()
// public autoMargin: string;


