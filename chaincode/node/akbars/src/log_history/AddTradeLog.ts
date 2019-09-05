/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { Trade } from '../models/tradeModel';

@Object()
export class AddTradeLog {
    @Property()
    public nameMethos: string;
    @Property()
    public commitmentID2: string;
    @Property()
    public commitmentID1: string;
    @Property()
    public newTrade: Trade;
}
