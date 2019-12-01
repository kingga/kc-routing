"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressRequest {
    /**
     * Create the request using the express request.
     * @param request The express request.
     */
    constructor(request) {
        this.request = request;
    }
    /**
     * Check if the given key exists on the requests body.
     * @param key The key in the requests body.
     */
    has(key) {
        return typeof this.request.body[key] !== 'undefined';
    }
    /**
     * Get a value from the requests body.
     * @param key The key in the requests body.
     * @param defaultValue The default value if the key isn't found.
     */
    get(key, defaultValue = null) {
        return this.request.body[key] || defaultValue;
    }
    /**
     * Get a value from the route.
     * @param key The routes key, e.g. /posts/:id would be 'id'.
     * @param defaultValue The default value if this is not found.
     */
    route(key, defaultValue = null) {
        return this.request.params[key] || defaultValue;
    }
    /**
     * Convert this request to JSON.
     */
    toJson() {
        const headers = {};
        for (let [k, v] of Object.entries(this.request.headers)) {
            if (typeof v === 'object') {
                v = v.join(', ');
            }
            headers[k] = v;
        }
        return {
            method: this.request.method,
            url: this.request.url,
            headers,
            body: this.request.body,
        };
    }
}
exports.ExpressRequest = ExpressRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhwcmVzc1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVxdWVzdHMvRXhwcmVzc1JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFhLGNBQWM7SUFNekI7OztPQUdHO0lBQ0gsWUFBbUIsT0FBZ0I7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEdBQUcsQ0FBQyxHQUFXO1FBQ3BCLE9BQU8sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxHQUFHLENBQUksR0FBVyxFQUFFLGVBQXlCLElBQUk7UUFDdEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsR0FBVyxFQUFFLGVBQThCLElBQUk7UUFDMUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxZQUFZLENBQUM7SUFDbEQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUNYLE1BQU0sT0FBTyxHQUF1QyxFQUFFLENBQUM7UUFFdkQsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2RCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDekIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEI7WUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO1FBRUQsT0FBTztZQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDM0IsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztZQUNyQixPQUFPO1lBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtTQUN4QixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBN0RELHdDQTZEQyJ9