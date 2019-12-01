import { IRouter, RouteMethod, IRoute } from '../contracts/http/IRouter';
import { Request, Response } from 'express-serve-static-core';
import { ExpressRequest } from './requests/ExpressRequest';
import { IRequest } from '../contracts/http/IRequest';
import { JsonHandler } from './handlers/JsonHandler';
import { IErrorHandler } from '../contracts/http/handlers/IErrorHandler';
import { WebHandler } from './handlers/WebHandler';

type RouteCallback = (request: Request, response: Response) => void;

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

export class Router implements IRouter {
  /**
   * The express router.
   */
  protected app: IBasicRouter;

  /**
   * The list of created routes.
   */
  protected routes: Map<RouteMethod, IRoute[]>;

  /**
   * The handlers which are used when an error is caught.
   */
  protected handlers: ErrorHandlers;

  /**
   * Create the router and give it the express router.
   * @param {IBasicRouter} app The express rotuer.
   * @param {ErrorHandlers | undefined} handlers The error handlers for the web and api.
   */
  public constructor(app: IBasicRouter, handlers?: ErrorHandlers) {
    this.app = app;
    this.routes = new Map<RouteMethod, IRoute[]>();

    if (!handlers) {
      handlers = {};
    }

    if (!handlers.web) {
      handlers.web = new WebHandler();
    }

    if (!handlers.api) {
      handlers.api = new JsonHandler();
    }

    this.handlers = handlers;
  }

  /**
   * Get all of the registered routes or all of the routes for a given method.
   * @param {RouteMethod | undefined} method The request method if you want to filter it out.
   * @return {IRoute[]} The list of routes.
   */
  public getRoutes(method?: RouteMethod): IRoute[] {
    if (method) {
      return this.routes.get(method) || [];
    }

    let allRoutes: IRoute[] = [];

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
  public findRouteByName(name: string): IRoute | null {
    return this.getRoutes().find((route) => route.name === name) || null;
  }

  /**
   * Create a GET route.
   * @param {IRoute} route The routes details.
   * @return {IRouter} Return itself for a fluent API.
   */
  public get(route: IRoute): IRouter {
    this.addRoute('GET', route);

    return this;
  }

  /**
   * Create a POST route.
   * @param {IRoute} route The routes details.
   * @return {IRouter} Return itself for a fluent API.
   */
  public post(route: IRoute): IRouter {
    this.addRoute('POST', route);

    return this;
  }

  /**
   * Create a PUT route.
   * @param {IRoute} route The routes details.
   * @return {IRouter} Return itself for a fluent API.
   */
  public put(route: IRoute): IRouter {
    this.addRoute('PUT', route);

    return this;
  }

  /**
   * Create a PATCH route.
   * @param {IRoute} route The routes details.
   * @return {IRouter} Return itself for a fluent API.
   */
  public patch(route: IRoute): IRouter {
    this.addRoute('PATCH', route);

    return this;
  }

  /**
   * Create a DELETE route.
   * @param {IRoute} route The routes details.
   * @return {IRouter} Return itself for a fluent API.
   */
  public delete(route: IRoute): IRouter {
    this.addRoute('DELETE', route);

    return this;
  }

  /**
   * Create a OPTIONS route.
   * @param {IRoute} route The routes details.
   * @return {IRouter} Return itself for a fluent API.
   */
  public options(route: IRoute): IRouter {
    this.addRoute('OPTIONS', route);

    return this;
  }

  /**
   * Build the routes which have been created.
   */
  public build(): void {
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
  protected getRouteCallback(route: IRoute): RouteCallback {
    return (request, response): void => {
      const convertedRequest = new ExpressRequest(request);

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
            .catch((error: Error) => {
              this.handleError(error, response, convertedRequest);
            });
        } else {
          response.send();
        }
      } catch (error) {
        this.handleError(error, response, convertedRequest);
      }
    };
  }

  /**
   * Adds a route with the given method.
   * @param {RouteMethod} method The method, e.g. GET, POST, ...
   * @param {IRoute} route The route to create.
   */
  protected addRoute(method: RouteMethod, route: IRoute): void {
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
  protected handleError(error: Error, response: Response, request: IRequest): void {
    const handler: IErrorHandler = request.toJson().method === 'GET'
      ? this.handlers.web
      : this.handlers.api;

    handler.handle(error, request).then((res) => {
      response
          .set(res.getHeaders())
          .status(500)
          .send(res.getBody())
    });
  }
}
