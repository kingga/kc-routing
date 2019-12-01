"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const prepareUrlForRouting = (url) => {
    const { BASE_URL } = process.env;
    if (!BASE_URL) {
        return url;
    }
    return url.startsWith(BASE_URL.replace(/\/$/, ''))
        ? url.substr(BASE_URL.length)
        : url;
};
exports.default = (context) => {
    return new Promise((resolve, reject) => {
        const args = {
            before: () => Promise.resolve(),
            after: () => Promise.resolve(),
        };
        main_1.createApp(args).then(({ app, router, store }) => {
            router.push(prepareUrlForRouting(context.url));
            router.onReady(() => {
                context.rendered = () => {
                    context.state = store.state;
                };
                resolve(app);
            }, reject);
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktc2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2hhbmRsZXJzL3dlYi1oYW5kbGVyL2VudHJ5LXNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFtQztBQUduQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDbkQsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7SUFFakMsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFFRCxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUM3QixDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ1YsQ0FBQyxDQUFDO0FBUUYsa0JBQWUsQ0FBQyxPQUFnQixFQUFnQixFQUFFO0lBQ2hELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsTUFBTSxJQUFJLEdBQUc7WUFDWCxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUMvQixLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtTQUMvQixDQUFDO1FBRUYsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRS9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO2dCQUNsQixPQUFPLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtvQkFDdEIsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUM5QixDQUFDLENBQUM7Z0JBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9