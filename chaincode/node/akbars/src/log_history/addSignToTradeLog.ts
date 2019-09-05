/*
* SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';
  
@Object()
export class AddSignToTradeLog {
    @Property()
    public nameMethos: string;
    //Дата и время подписания
    @Property()
    public dateTime: number;
    //Реквизиты владельца сертификата
    @Property()
    public typeOrg: string;
    //Оригинал документа
    @Property()
    public text: string;
    //Подпись
    @Property()
    public textSigned: string;
    //Алгоритм подписи издателя сертификата
    @Property()
    public signatureAlgorithm: string;
    //Открытый ключ в формате base64
    @Property()
    public publicKey: string;
}