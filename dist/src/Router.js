"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpressRequest_1 = require("./requests/ExpressRequest");
const JsonHandler_1 = require("./handlers/JsonHandler");
const WebHandler_1 = require("./handlers/WebHandler");
class Router {
    /**
     * Create the router and give it the express router.
     * @param {IBasicRouter} app The express rotuer.
     * @param {ErrorHandlers | undefined} handlers The error handlers for the web and api.
     */
    constructor(app, handlers) {
        this.app = app;
        this.routes = new Map();
        this.handlers = handlers || {};
    }
    /**
     * Get all of the registered routes or all of the routes for a given method.
     * @param {RouteMethod | undefined} method The request method if you want to filter it out.
     * @return The list of routes.
     */
    getRoutes(method) {
        if (method) {
            return this.routes.get(method) || [];
        }
        let allRoutes = [];
        this.routes.forEach((routes) => {
            allRoutes = allRoutes.concat(routes);
        });
        return allRoutes;
    }
    /**
     * Find a route by it's assigned name.
     * @param {string} name The name of the route.
     * @return The route if it exists.
     */
    findRouteByName(name) {
        return this.getRoutes().find((route) => route.name === name) || null;
    }
    /**
     * Create a GET route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    get(route) {
        this.addRoute('GET', route);
        return this;
    }
    /**
     * Create a POST route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    post(route) {
        this.addRoute('POST', route);
        return this;
    }
    /**
     * Create a PUT route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    put(route) {
        this.addRoute('PUT', route);
        return this;
    }
    /**
     * Create a PATCH route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    patch(route) {
        this.addRoute('PATCH', route);
        return this;
    }
    /**
     * Create a DELETE route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    delete(route) {
        this.addRoute('DELETE', route);
        return this;
    }
    /**
     * Create a OPTIONS route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    options(route) {
        this.addRoute('OPTIONS', route);
        return this;
    }
    /**
     * Build the routes which have been created.
     */
    build() {
        this.getRoutes('GET').forEach((r) => this.app.get(r.path, this.getRouteCallback(r)));
        this.getRoutes('POST').forEach((r) => this.app.post(r.path, this.getRouteCallback(r)));
        this.getRoutes('PUT').forEach((r) => this.app.put(r.path, this.getRouteCallback(r)));
        this.getRoutes('PATCH').forEach((r) => this.app.patch(r.path, this.getRouteCallback(r)));
        this.getRoutes('DELETE').forEach((r) => this.app.delete(r.path, this.getRouteCallback(r)));
        this.getRoutes('OPTIONS').forEach((r) => this.app.options(r.path, this.getRouteCallback(r)));
    }
    /**
     * Return a function which handlers the route.
     * @param {IRoute} route The route which was called.
     * @return {RouteCallback} The created route handler.
     */
    getRouteCallback(route) {
        return (request, response) => {
            const convertedRequest = new ExpressRequest_1.ExpressRequest(request);
            try {
                const result = route.controller(convertedRequest);
                if (result) {
                    result
                        .then((res) => {
                        response
                            .set(res.getHeaders())
                            .status(res.getCode())
                            .send(res.getBody());
                    })
                        .catch((error) => {
                        this.handleError(error, response, convertedRequest);
                    });
                }
                else {
                    response.send();
                }
            }
            catch (error) {
                this.handleError(error, response, convertedRequest);
            }
        };
    }
    /**
     * Adds a route with the given method.
     * @param {RouteMethod} method The method, e.g. GET, POST, ...
     * @param {IRoute} route The route to create.
     */
    addRoute(method, route) {
        // Check if this routes name or path is duplicated.
        this.getRoutes(method).forEach((r) => {
            if (r.path === route.path) {
                throw new Error(`The route ${route.path} already exists.`);
            }
            if (route.name && r.name === route.name) {
                throw new Error(`There is already a route with the name ${route.name}.`);
            }
        });
        const compiledRoute = Object.assign(Object.assign({}, route), { method });
        // Add the new route to the array and put it back into the map.
        const routes = this.routes.get(method) || [];
        routes.push(compiledRoute);
        this.routes.set(method, routes);
    }
    /**
     * Handle errors which were recieved after the router has been created an return the appropiate response to the browser.
     * @param {Error} error The error which was caught.
     * @param {Response} response The express response object.
     * @param {IRequest} request The converted request interface.
     */
    handleError(error, response, request) {
        const handler = request.toJson().method === 'GET'
            ? this.handlers.web || new WebHandler_1.WebHandler()
            : this.handlers.api || new JsonHandler_1.JsonHandler();
        handler.handle(error, request).then((res) => {
            response
                .set(res.getHeaders())
                .status(500)
                .send(res.getBody());
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDhEQUEyRDtBQUUzRCx3REFBcUQ7QUFFckQsc0RBQW1EO0FBK0RuRCxNQUFhLE1BQU07SUFnQmpCOzs7O09BSUc7SUFDSCxZQUFtQixHQUFpQixFQUFFLFFBQXdCO1FBQzVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBaUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsTUFBb0I7UUFDbkMsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QztRQUVELElBQUksU0FBUyxHQUFxQixFQUFFLENBQUM7UUFFckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM3QixTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZUFBZSxDQUFDLElBQVk7UUFDakMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEdBQUcsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxD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