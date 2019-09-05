/*
* SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';
  
@Object()
export class AddPriceToTradeLog {
    @Property()
    public date: number;
    @Property()
    public security_code: string;
    @Property()
    public security_isin: string;
    @Property()
    public security_name: string;
    @Property()
    public market_price: string;
    @Property()
    public market_price_type: string;
    @Property()
    public market_price_cur: string;
    @Property()
    public price_date: string;
    @Property()
    public coupon_income: string;
    @Property()
    public income_cur: string;
    @Property()
    public price: string;
    @Property()
    public price_cur: string;
}

