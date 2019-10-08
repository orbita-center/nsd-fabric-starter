/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class CloseTradeLog {
    @Property()
    public nameMethos: string;
    @Property()
    public ObligNum2: string;
    @Property()
    public ObligNum1: string;
    @Property()
    public Date: number;

}
