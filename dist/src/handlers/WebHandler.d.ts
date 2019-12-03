import { IErrorHandler } from '../contracts/handlers/IErrorHandler';
import { IResponse } from '../contracts/IResponse';
export declare class WebHandler implements IErrorHandler {
    handle(error: Error): Promise<IResponse>;
}
