/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';


@Object()
export class AddObligationStatusRequest {
    @Property()
    public tradeId: string;
    @Property()
    public commitmentID: string;
    @Property()
    public date: number;
    @Property()
    public whoMadeChanges: string;
    @Property()
    public textDescription: string;
    @Property()
    public performanceStatus: number;
}


