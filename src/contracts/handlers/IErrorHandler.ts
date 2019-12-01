import { IRequest } from '../IRequest';
import { IResponse } from '../IResponse';

export interface IErrorHandler {
  handle(error: Error, request: IRequest): Promise<IResponse>;
}
