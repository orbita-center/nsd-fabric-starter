/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class CloseTradeLog {
    @Property()
    public nameMethos: string;
    @Property()
    public commitmentID2: string;
    @Property()
    public commitmentID1: string;
    @Property()
    public dateTime: number;

}
