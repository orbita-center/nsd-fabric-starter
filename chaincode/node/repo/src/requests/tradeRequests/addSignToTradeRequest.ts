/*
* SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';
  
@Object()
export class AddSignToTradeRequest {
    //
    @Property()
    public dealNum: string;
    //Дата и время подписания
    @Property()
    public Date: number;
    //Реквизиты владельца сертификата
    @Property()
    public signer: string;
    //Реквизиты владельца сертификата
    @Property()
    public partyRole: string;
    //Оригинал документа
    @Property()
    public payload: string;
    //Подпись
    @Property()
    public signPayload: string;
    //Алгоритм подписи издателя сертификата
    @Property()
    public cryptoType: string;
    //Открытый ключ в формате base64
    @Property()
    public cryptoKey: string;
}