/*
* SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';
import { Obligation } from '../models/obligationModel';

@Object()
export class CreateObligationLog {
    @Property()
    public nameMethod: string;
    @Property()
    public obligationId: string;
    @Property()
    public amount: number;
    @Property()
    public quantitySecurities: number;
    @Property()
    public status: number;
    @Property()
    public performanceStatus: number;
}