import { IRouter, RouteMethod, IRoute, ICompiledRoute } from '@/contracts/IRouter';
import { Request, Response } from 'express-serve-static-core';
import { IRequest } from '@/contracts/IRequest';
import { IErrorHandler } from '@/contracts/handlers/IErrorHandler';
declare type RouteCallback = (request: Request, response: Response) => void;
/**
 * This interface is only for express so that's why this is not abstracted into its own file.
 */
interface IBasicRouter {
    /**
     * Create a GET route.
     * @param {string} path The URL path.
     * @param {RouteCallback} handler The routes handler.
     */
    get(path: string, handler: RouteCallback): void;
    /**
     * Create a POST route.
     * @param {string} path The URL path.
     * @param {RouteCallback} handler The routes handler.
     */
    post(path: string, handler: RouteCallback): void;
    /**
     * Create a PUT route.
     * @param {string} path The URL path.
     * @param {RouteCallback} handler The routes handler.
     */
    put(path: string, handler: RouteCallback): void;
    /**
     * Create a PATCH route.
     * @param {string} path The URL path.
     * @param {RouteCallback} handler The routes handler.
     */
    patch(path: string, handler: RouteCallback): void;
    /**
     * Create a DELETE route.
     * @param {string} path The URL path.
     * @param {RouteCallback} handler The routes handler.
     */
    delete(path: string, handler: RouteCallback): void;
    /**
     * Create a OPTIONS route.
     * @param {string} path The URL path.
     * @param {RouteCallback} handler The routes handler.
     */
    options(path: string, handler: RouteCallback): void;
}
interface ErrorHandlers {
    /**
     * The error handler which will be used on GET requests. This is most likely going to be some visually pleasing UI.
     */
    web?: IErrorHandler;
    /**
     * The error handler used when sending a request which is not GET. This is probably some text based handler like the JsonHandler.
     */
    api?: IErrorHandler;
}
export declare class Router implements IRouter {
    /**
     * The express router.
     */
    protected app: IBasicRouter;
    /**
     * The list of created routes.
     */
    protected routes: Map<RouteMethod, ICompiledRoute[]>;
    /**
     * The handlers which are used when an error is caught.
     */
    protected handlers: ErrorHandlers;
    /**
     * Create the router and give it the express router.
     * @param {IBasicRouter} app The express rotuer.
     * @param {ErrorHandlers | undefined} handlers The error handlers for the web and api.
     */
    constructor(app: IBasicRouter, handlers?: ErrorHandlers);
    /**
     * Get all of the registered routes or all of the routes for a given method.
     * @param {RouteMethod | undefined} method The request method if you want to filter it out.
     * @return The list of routes.
     */
    getRoutes(method?: RouteMethod): ICompiledRoute[];
    /**
     * Find a route by it's assigned name.
     * @param {string} name The name of the route.
     * @return The route if it exists.
     */
    findRouteByName(name: string): ICompiledRoute | null;
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
    /**
     * Return a function which handlers the route.
     * @param {IRoute} route The route which was called.
     * @return {RouteCallback} The created route handler.
     */
    protected getRouteCallback(route: IRoute): RouteCallback;
    /**
     * Adds a route with the given method.
     * @param {RouteMethod} method The method, e.g. GET, POST, ...
     * @param {IRoute} route The route to create.
     */
    protected addRoute(method: RouteMethod, route: IRoute): void;
    /**
     * Handle errors which were recieved after the router has been created an return the appropiate response to the browser.
     * @param {Error} error The error which was caught.
     * @param {Response} response The express response object.
     * @param {IRequest} request The converted request interface.
     */
    protected handleError(error: Error, response: Response, request: IRequest): void;
}
export {};
