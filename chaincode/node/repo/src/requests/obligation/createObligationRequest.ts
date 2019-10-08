/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';


@Object()
export class CreateObligationRequest {
    
    @Property()
    public id: string;
    @Property()
    public dealNum: string;
    @Property()
    public User: string;
    @Property()
    public baseDescription: string;
    @Property()
    public deal_amount: number;
    @Property()
    public quantitySecurities: number;
    @Property()
    public dateExecution: number;
    @Property()
    public textDescription: string;
    @Property()
    public performanceStatus: number;
}