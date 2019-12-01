import { IErrorHandler } from '../contracts/handlers/IErrorHandler';
import { IRequest } from '../contracts/IRequest';
import { IResponse } from '../contracts/IResponse';
import createApp from './web-handler/entry-server';
import { createRenderer } from 'vue-server-renderer';
import { HtmlResponse } from '../responses/HtmlResponse';

export class WebHandler implements IErrorHandler {
  public handle(error: Error, request: IRequest): Promise<IResponse> {
    return new Promise((resolve) => {
      // Load the Vue template.
      createApp({ url: '/', state: {} })
        .then((app) => {
          const renderer = createRenderer();
          renderer.renderToString(app, (err: Error | null, html: string): void => {
            if (err) {
              console.error(err);
              return;
            }

            resolve(new HtmlResponse(html));
          });
        })
        .catch(() => {
          console.log({ error, request });
        });
      // resolve(new HtmlResponse('<h1>Hello, world!</h1>'));

      // const app = createApp({ url: '/', state: {} });

      console.log({ error: !error, request: !request });



      // toJson(error).then((error) => {
      //   resolve(new JsonResponse({
      //     error,
      //     request: request.toJson(),
      //   }));
      // });
    });
  }
}
