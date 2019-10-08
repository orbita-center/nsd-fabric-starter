/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class UpdTradeLog {
    @Property()
    public nameMethos: string;
    @Property()
    public DateChange: number;
    @Property()
    public deal_amount: number;
    @Property()
    public quantitySecurities: number;

}


