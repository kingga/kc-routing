"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_router_1 = require("vue-router");
const Home_vue_1 = require("../views/Home.vue");
vue_1.default.use(vue_router_1.default);
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home_vue_1.default,
    },
];
function createRouter() {
    return new vue_router_1.default({
        base: process.env.BASE_URL,
        routes,
    });
}
exports.createRouter = createRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaGFuZGxlcnMvd2ViLWhhbmRsZXIvcm91dGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQXNCO0FBQ3RCLDJDQUFtQztBQUNuQyxnREFBcUM7QUFFckMsYUFBRyxDQUFDLEdBQUcsQ0FBQyxvQkFBUyxDQUFDLENBQUM7QUFFbkIsTUFBTSxNQUFNLEdBQUc7SUFDYjtRQUNFLElBQUksRUFBRSxHQUFHO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsa0JBQUk7S0FDaEI7Q0FDRixDQUFDO0FBRUYsU0FBZ0IsWUFBWTtJQUMxQixPQUFPLElBQUksb0JBQVMsQ0FBQztRQUNuQixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRO1FBQzFCLE1BQU07S0FDUCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBTEQsb0NBS0MifQ==