"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlResponse_1 = require("../responses/HtmlResponse");
const StackFrame_1 = require("./StackFrame");
const fs_1 = require("fs");
const path_1 = require("path");
class WebHandler {
    handle(error) {
        return new Promise((resolve) => {
            const script = fs_1.readFileSync(path_1.resolve(__dirname, '../../../web-handler/dist/web.js'));
            StackFrame_1.toJson(error)
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
                resolve(new HtmlResponse_1.HtmlResponse(html));
            });
        });
    }
}
exports.WebHandler = WebHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9XZWJIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNERBQXlEO0FBQ3pELDZDQUFzQztBQUN0QywyQkFBa0M7QUFDbEMsK0JBQThDO0FBRTlDLE1BQWEsVUFBVTtJQUNkLE1BQU0sQ0FBQyxLQUFZO1FBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUM3QixNQUFNLE1BQU0sR0FBRyxpQkFBWSxDQUFDLGNBQVcsQ0FBQyxTQUFTLEVBQUUsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO1lBRXhGLG1CQUFNLENBQUMsS0FBSyxDQUFDO2lCQUNWLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNkLE1BQU0sSUFBSSxHQUFHOzs7Ozs7Ozs7Ozs7O2lDQWFVLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDOzs7O29CQUlsQyxNQUFNOzs7O1dBSWYsQ0FBQztnQkFFRixPQUFPLENBQUMsSUFBSSwyQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWxDRCxnQ0FrQ0MifQ==