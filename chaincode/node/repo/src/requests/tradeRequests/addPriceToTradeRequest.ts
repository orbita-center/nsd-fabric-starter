/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class AddPriceToTradeRequest  {
    @Property()
    public contrID: string;
    @Property()
    public date: number;
    @Property()
    public WhoMadeChanges: string;
    @Property()
    public security_code: string;
    @Property()
    public security_isin: string;
    @Property()
    public security_name: string;
    @Property()
    public market_price: number;
    @Property()
    public market_price_type: string;
    @Property()
    public market_price_cur: string;
    @Property()
    public price_date: number;
    @Property()
    public coupon_income: number;
    @Property()
    public income_cur: string;
    @Property()
    public price: number;
    @Property()
    public price_cur: string;
    @Property()
    public oblID: string;
}
