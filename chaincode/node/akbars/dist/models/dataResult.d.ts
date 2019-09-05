export declare class DataResult<T> {
    data: T;
    error: string;
    isSuccess: boolean;
    withError(er: string): void;
    withData(res: T): void;
}
