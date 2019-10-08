import { Object, Property } from 'fabric-contract-api';
import { PerformanceStatus } from '../enums/performanceStatus';
import { ObligationPartRepo } from '../enums/obligationPartRepo';


@Object()
export class Obligation {

    @Property()
    public typeObject: string;
    @Property()
    public id: string;
    @Property()
    public idTrade: string;
    @Property()
    public dateAdded: number;
    @Property()
    public initiator: string;
    @Property()
    public baseDescription: string;
    // Сумма обязательства со знаком, где
    // положительное значение означает движение актива (денег) в сторону Кредитора;
    // отрицательное – в сторону Заемщика
    @Property()
    public deal_amount: number;

    //Сумма обязательства со знаком, где
    //положительное значение означает движение актива (бумаг) в сторону Кредитора;
    //отрицательное – в сторону Заемщика
    @Property()
    public quantitySecurities: number;
    @Property()
    public dateExecution: number;
    //Причина отказа в исполнении
    @Property()
    public textDescription: string;
    //Статус исполнения, где
    //0 - исполнено, 1- не исполнено, 2- отменено
    @Property()
    public performanceStatus: PerformanceStatus;

    @Property()
    public obligationPartRepo: ObligationPartRepo;

    @Property()
    public is_revaluation:boolean;
    

}


