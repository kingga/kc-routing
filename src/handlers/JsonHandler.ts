import { IErrorHandler } from '../contracts/handlers/IErrorHandler';
import { IRequest } from '../contracts/IRequest';
import { IResponse } from '../contracts/IResponse';
import { JsonResponse } from '../responses/JsonResponse';
import { toJson } from './StackFrame';

export class JsonHandler implements IErrorHandler {
  public handle(error: Error, request: IRequest): Promise<IResponse> {
    return new Promise((resolve) => {
      toJson(error).then((error) => {
        resolve(new JsonResponse({
          error,
          request: request.toJson(),
        }));
      });
    });
  }
}
