/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { TradeState } from '../enums/tradeState';

@Object()
export class TradeBase{

    @Property()
    public dealNum: string;
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
  
}





@Object()
export class SUOBase {
    @Property()
    public Deal_reuse: string;
    @Property()
    public Deal_return_var: string;
    @Property()
    public Deal_shift_term_date: string;
    @Property()
    public Deal_auto_margin: string;
}


@Object()
export class Master_AgreementBase {
    @Property()
    public repcode: string;
    @Property()
    public date: number;
}


@Object()
export class CollateralBase {
    @Property()
    public sec_code: string;
    @Property()
    public sec_isin: string;
    @Property()
    public sec_name: string;
    @Property()
    public Sec_quantity: number;
    @Property()
    public Sec_discount: number;
    @Property()
    public Sec_price_types_priority: string;
    
}


@Object()
export class Collateral_UserBase {
    @Property()
    public depcode: string;
    @Property()
    public short_name: string;
    
}


@Object()
export class SignBase {
    //Дата и время подписания
    @Property()
    public Date: number;
    //Реквизиты владельца сертификата
    @Property()
    public signer: string;
    //Оригинал документа
    @Property()
    public payload: string;
    //Подпись
    @Property()
    public signPayload: string;
    //Алгоритм подписи издателя сертификата
    @Property()
    public cryptoType: string;
    //Открытый ключ в формате base64
    @Property()
    public cryptoKey: string;
    //Подтверждение сделки 1 – подтверждена
    @Property()
    public deal_conf: number;
}




// //Блок описания дополнительных параметров СУО НРД

// @Property()
// public returnVar: string;
// @Property()
// public shiftTermDate: string;
// @Property()
// public autoMargin: string;


