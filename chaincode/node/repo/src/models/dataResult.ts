

export class DataResult<T> {
    public data: T;
    public error: string;
    public isSuccess: boolean;


    public withError(er:string){
        this.error=er;
        this.isSuccess=false;
    }

    public withData(res:T){
        this.isSuccess=true;
        this.data=res;
    }
}
