import { IErrorHandler } from '../contracts/handlers/IErrorHandler';
import { IRequest } from '../contracts/IRequest';
import { IResponse } from '../contracts/IResponse';
export declare class WebHandler implements IErrorHandler {
    handle(error: Error, request: IRequest): Promise<IResponse>;
}
