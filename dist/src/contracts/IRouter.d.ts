import { IRequest } from './IRequest';
import { IResponse } from './IResponse';
export declare type RouteMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
export interface IRoute {
    /**
     * The URL that this route is for, e.g. / = Home, /about, /posts/:id, ...
     */
    path: string;
    /**
     * The friend name for this route, easier to use if you want to
     * change the URLs around.
     */
    name?: string;
    /**
     * The controllers static method which this route will trigger.
     */
    controller: (request: IRequest) => Promise<IResponse> | void;
}
/**
 * This is just the normal route but with the method attached to it.
 */
export interface ICompiledRoute extends IRoute {
    /**
     * The routes method, e.g. GET, POST, ...
     */
    method: RouteMethod;
}
export interface IRouter {
    /**
     * Get all of the registered routes or all of the routes for a given method.
     * @param method The request method if you want to filter it out.
     * @return The list of routes.
     */
    getRoutes(method?: RouteMethod): ICompiledRoute[];
    /**
     * Find a route by it's assigned name.
     * @param {string} name The name of the route.
     * @return {IRoute | null} The route if it exists.
     */
    findRouteByName(name: string): IRoute | null;
    /**
     * Create a GET route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    get(route: IRoute): IRouter;
    /**
     * Create a POST route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    post(route: IRoute): IRouter;
    /**
     * Create a PUT route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    put(route: IRoute): IRouter;
    /**
     * Create a PATCH route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    patch(route: IRoute): IRouter;
    /**
     * Create a DELETE route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    delete(route: IRoute): IRouter;
    /**
     * Create a OPTIONS route.
     * @param {IRoute} route The routes details.
     * @return {IRouter} Return itself for a fluent API.
     */
    options(route: IRoute): IRouter;
    /**
     * Build the routes which have been created.
     */
    build(): void;
}
