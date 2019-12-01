"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
const router_1 = require("./router");
const store_1 = require("./store");
const HighlightJsPlugin_1 = require("./plugins/HighlightJsPlugin");
vue_1.default.config.productionTip = false;
vue_1.default.use(HighlightJsPlugin_1.default);
function createApp({ before = () => Promise.resolve(), after = () => Promise.resolve() }) {
    return __awaiter(this, void 0, void 0, function* () {
        const store = store_1.createStore();
        const router = router_1.createRouter();
        yield before({ store, router });
        const app = new vue_1.default({
            router,
            store,
            render: (h) => h(App_vue_1.default),
        });
        const result = { app, router, store };
        yield after(result);
        return result;
    });
}
exports.createApp = createApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9oYW5kbGVycy93ZWItaGFuZGxlci9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkJBQXNCO0FBQ3RCLHVDQUE0QjtBQUM1QixxQ0FBd0M7QUFDeEMsbUNBQXNDO0FBQ3RDLG1FQUE0RDtBQUs1RCxhQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFFakMsYUFBRyxDQUFDLEdBQUcsQ0FBQywyQkFBaUIsQ0FBQyxDQUFDO0FBYTNCLFNBQXNCLFNBQVMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBa0I7O1FBQ25ILE1BQU0sS0FBSyxHQUFHLG1CQUFXLEVBQUUsQ0FBQztRQUM1QixNQUFNLE1BQU0sR0FBRyxxQkFBWSxFQUFFLENBQUM7UUFFOUIsTUFBTSxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUVoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQztZQUNsQixNQUFNO1lBQ04sS0FBSztZQUNMLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFHLENBQUM7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBRXRDLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FBQTtBQWpCRCw4QkFpQkMifQ==