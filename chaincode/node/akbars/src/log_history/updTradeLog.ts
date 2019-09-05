/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class UpdTradeLog {
    @Property()
    public nameMethos: string;
    @Property()
    public dateTimeChange: number;
    @Property()
    public amount: number;
    @Property()
    public quantitySecurities: number;

}


