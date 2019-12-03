"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlResponse_1 = require("../responses/HtmlResponse");
const StackFrame_1 = require("./StackFrame");
const fs_1 = require("fs");
class WebHandler {
    handle(error) {
        return new Promise((resolve) => {
            const script = fs_1.readFileSync('../web-handler/dist/web.js');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9XZWJIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNERBQXlEO0FBQ3pELDZDQUFzQztBQUN0QywyQkFBa0M7QUFFbEMsTUFBYSxVQUFVO0lBQ2QsTUFBTSxDQUFDLEtBQVk7UUFDeEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLE1BQU0sTUFBTSxHQUFHLGlCQUFZLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUUxRCxtQkFBTSxDQUFDLEtBQUssQ0FBQztpQkFDVixJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDZCxNQUFNLElBQUksR0FBRzs7Ozs7Ozs7Ozs7OztpQ0FhVSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzs7OztvQkFJbEMsTUFBTTs7OztXQUlmLENBQUM7Z0JBRUYsT0FBTyxDQUFDLElBQUksMkJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsQ0QsZ0NBa0NDIn0=