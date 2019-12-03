"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const App_vue_1 = require("./App.vue");
const HighlightJsPlugin_1 = require("./plugins/HighlightJsPlugin");
vue_1.default.config.productionTip = false;
vue_1.default.use(HighlightJsPlugin_1.default);
new vue_1.default({
    render: (h) => h(App_vue_1.default),
}).$mount('#app');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9oYW5kbGVycy93ZWItaGFuZGxlci9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQXNCO0FBQ3RCLHVDQUE0QjtBQUM1QixtRUFBNEQ7QUFFNUQsYUFBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBRWpDLGFBQUcsQ0FBQyxHQUFHLENBQUMsMkJBQWlCLENBQUMsQ0FBQztBQUUzQixJQUFJLGFBQUcsQ0FBQztJQUNKLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFHLENBQUM7Q0FDeEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyJ9