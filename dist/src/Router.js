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
     * @return {IRoute[]} The list of routes.
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
     * @return {IRoute | null} The route if it exists.
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
            if (r.name === route.name) {
                throw new Error(`There is already a route with the name ${route.name}.`);
            }
        });
        // Add the new route to the array and put it back into the map.
        const routes = this.routes.get(method) || [];
        routes.push(route);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDhEQUEyRDtBQUUzRCx3REFBcUQ7QUFFckQsc0RBQW1EO0FBK0RuRCxNQUFhLE1BQU07SUFnQmpCOzs7O09BSUc7SUFDSCxZQUFtQixHQUFpQixFQUFFLFFBQXdCO1FBQzVELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBeUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsTUFBb0I7UUFDbkMsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QztRQUVELElBQUksU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzdCLFNBQVMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxlQUFlLENBQUMsSUFBWTtRQUNqQyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksR0FBRyxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENB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