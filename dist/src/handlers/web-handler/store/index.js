"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vuex_1 = require("vuex");
vue_1.default.use(vuex_1.default);
function createStore() {
    return new vuex_1.default.Store({
        state() {
            return {
                error: undefined,
                current: undefined,
            };
        },
        mutations: {
            setError(state, error) {
                state.error = error;
            },
        },
        actions: {},
        modules: {},
    });
}
exports.createStore = createStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaGFuZGxlcnMvd2ViLWhhbmRsZXIvc3RvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBc0I7QUFDdEIsK0JBQW1DO0FBU25DLGFBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxDQUFDLENBQUM7QUFFZCxTQUFnQixXQUFXO0lBQ3pCLE9BQU8sSUFBSSxjQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLEtBQUs7WUFDSCxPQUFPO2dCQUNMLEtBQUssRUFBRSxTQUFTO2dCQUNoQixPQUFPLEVBQUUsU0FBUzthQUNuQixDQUFDO1FBQ0osQ0FBQztRQUVELFNBQVMsRUFBRTtZQUNULFFBQVEsQ0FBQyxLQUFVLEVBQUUsS0FBZ0I7Z0JBQ25DLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLENBQUM7U0FDRjtRQUVELE9BQU8sRUFBRSxFQUFFO1FBRVgsT0FBTyxFQUFFLEVBQUU7S0FDWixDQUFDLENBQUM7QUFDTCxDQUFDO0FBbkJELGtDQW1CQyJ9