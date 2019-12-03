"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Requests / responses.
const ExpressRequest_1 = require("./src/requests/ExpressRequest");
exports.ExpressRequest = ExpressRequest_1.ExpressRequest;
const HtmlResponse_1 = require("./src/responses/HtmlResponse");
exports.HtmlResponse = HtmlResponse_1.HtmlResponse;
const JsonResponse_1 = require("./src/responses/JsonResponse");
exports.JsonResponse = JsonResponse_1.JsonResponse;
const StackFrame_1 = require("./src/handlers/StackFrame");
exports.toJson = StackFrame_1.toJson;
const JsonHandler_1 = require("./src/handlers/JsonHandler");
exports.JsonHandler = JsonHandler_1.JsonHandler;
const WebHandler_1 = require("./src/handlers/WebHandler");
exports.WebHandler = WebHandler_1.WebHandler;
// Router.
const Router_1 = require("./src/Router");
exports.Router = Router_1.Router;
const express = require("express");
const app = express();
exports.app = app;
const router = new Router_1.Router(app);
exports.router = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLHdCQUF3QjtBQUN4QixrRUFBK0Q7QUE0QjdELHlCQTVCTywrQkFBYyxDQTRCUDtBQTNCaEIsK0RBQTREO0FBNEIxRCx1QkE1Qk8sMkJBQVksQ0E0QlA7QUEzQmQsK0RBQTREO0FBNEIxRCx1QkE1Qk8sMkJBQVksQ0E0QlA7QUF4QmQsMERBQW1FO0FBMkJqRSxpQkEzQnVCLG1CQUFNLENBMkJ2QjtBQTFCUiw0REFBeUQ7QUEyQnZELHNCQTNCTyx5QkFBVyxDQTJCUDtBQTFCYiwwREFBdUQ7QUEyQnJELHFCQTNCTyx1QkFBVSxDQTJCUDtBQXpCWixVQUFVO0FBQ1YseUNBQXNDO0FBeUJwQyxpQkF6Qk8sZUFBTSxDQXlCUDtBQXZCUixtQ0FBbUM7QUFFbkMsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7QUFJcEIsa0JBQUc7QUFITCxNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUk3Qix3QkFBTSJ9