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
const client_1 = require("@akryum/vue-cli-plugin-ssr/client");
const main_1 = require("./main");
main_1.createApp({
    before({ router }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.loadAsyncComponents({ router });
        });
    },
    after({ app, router, store }) {
        return __awaiter(this, void 0, void 0, function* () {
            store.replaceState(window.__INITIAL_STATE__);
            router.onReady(() => {
                app.$mount('#app');
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2hhbmRsZXJzL3dlYi1oYW5kbGVyL2VudHJ5LWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhEQUF3RTtBQUV4RSxpQ0FBbUM7QUFFbkMsZ0JBQVMsQ0FBQztJQUNGLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRTs7WUFDckIsTUFBTSw0QkFBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRUssS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O1lBQ2hDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7Q0FDRixDQUFDLENBQUMifQ==