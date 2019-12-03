import { IErrorHandler } from '../contracts/handlers/IErrorHandler';
import { IResponse } from '../contracts/IResponse';
import { HtmlResponse } from '../responses/HtmlResponse';
import { toJson } from './StackFrame';
import { readFileSync } from 'fs';

export class WebHandler implements IErrorHandler {
  public handle(error: Error): Promise<IResponse> {
    return new Promise((resolve) => {
      const script = readFileSync('../web-handler/dist/web.js');

      toJson(error)
        .then((error) => {
          const html = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>KC Error Handler</title>
          </head>
          <body>
              <div id="app"></div>

              <script>
                window.error = ${JSON.stringify(error)};
              </script>

              <script>
                  ${script}
              </script>
          </body>
          </html>
          `;

          resolve(new HtmlResponse(html));
        });
    });
  }
}
