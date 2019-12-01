"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entry_server_1 = require("./web-handler/entry-server");
const vue_server_renderer_1 = require("vue-server-renderer");
const HtmlResponse_1 = require("../responses/HtmlResponse");
class WebHandler {
    handle(error, request) {
        return new Promise((resolve) => {
            // Load the Vue template.
            entry_server_1.default({ url: '/', state: {} })
                .then((app) => {
                const renderer = vue_server_renderer_1.createRenderer();
                renderer.renderToString(app, (err, html) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    resolve(new HtmlResponse_1.HtmlResponse(html));
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
exports.WebHandler = WebHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9XZWJIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsNkRBQW1EO0FBQ25ELDZEQUFxRDtBQUNyRCw0REFBeUQ7QUFFekQsTUFBYSxVQUFVO0lBQ2QsTUFBTSxDQUFDLEtBQVksRUFBRSxPQUFpQjtRQUMzQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0IseUJBQXlCO1lBQ3pCLHNCQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztpQkFDL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1osTUFBTSxRQUFRLEdBQUcsb0NBQWMsRUFBRSxDQUFDO2dCQUNsQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQWlCLEVBQUUsSUFBWSxFQUFRLEVBQUU7b0JBQ3JFLElBQUksR0FBRyxFQUFFO3dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ25CLE9BQU87cUJBQ1I7b0JBRUQsT0FBTyxDQUFDLElBQUksMkJBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztZQUNMLHVEQUF1RDtZQUV2RCxrREFBa0Q7WUFFbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBSWxELGtDQUFrQztZQUNsQywrQkFBK0I7WUFDL0IsYUFBYTtZQUNiLGlDQUFpQztZQUNqQyxTQUFTO1lBQ1QsTUFBTTtRQUNSLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkNELGdDQW1DQyJ9