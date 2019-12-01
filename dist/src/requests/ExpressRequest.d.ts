import { IRequest, RequestJson } from '../contracts/IRequest';
import { Request } from 'express-serve-static-core';
export declare class ExpressRequest implements IRequest {
    /**
     * The express request.
     */
    protected request: Request;
    /**
     * Create the request using the express request.
     * @param request The express request.
     */
    constructor(request: Request);
    /**
     * Check if the given key exists on the requests body.
     * @param key The key in the requests body.
     */
    has(key: string): boolean;
    /**
     * Get a value from the requests body.
     * @param key The key in the requests body.
     * @param defaultValue The default value if the key isn't found.
     */
    get<T>(key: string, defaultValue?: T | null): T | null;
    /**
     * Get a value from the route.
     * @param key The routes key, e.g. /posts/:id would be 'id'.
     * @param defaultValue The default value if this is not found.
     */
    route(key: string, defaultValue?: string | null): string | null;
    /**
     * Convert this request to JSON.
     */
    toJson(): RequestJson;
}
