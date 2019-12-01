"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonResponse_1 = require("../responses/JsonResponse");
const StackFrame_1 = require("./StackFrame");
class JsonHandler {
    handle(error, request) {
        return new Promise((resolve) => {
            StackFrame_1.toJson(error).then((error) => {
                resolve(new JsonResponse_1.JsonResponse({
                    error,
                    request: request.toJson(),
                }));
            });
        });
    }
}
exports.JsonHandler = JsonHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnNvbkhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaGFuZGxlcnMvSnNvbkhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw0REFBeUQ7QUFDekQsNkNBQXNDO0FBRXRDLE1BQWEsV0FBVztJQUNmLE1BQU0sQ0FBQyxLQUFZLEVBQUUsT0FBaUI7UUFDM0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLG1CQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzNCLE9BQU8sQ0FBQyxJQUFJLDJCQUFZLENBQUM7b0JBQ3ZCLEtBQUs7b0JBQ0wsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUU7aUJBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQVhELGtDQVdDIn0=