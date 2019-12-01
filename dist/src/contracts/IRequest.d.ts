export interface RequestJson {
    /**
     * The method which this request is for the reason why this is a string is to avoid conflicts with the framework. This may change to RequestMethod.
     */
    method: string;
    /**
     * The URL this request was made to.
     */
    url: string;
    /**
     * The headers which were send with this request.
     */
    headers: Record<string, string | undefined>;
    /**
     * The body content of this request.
     */
    body?: object | string;
}
export interface IRequest {
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
    get<T>(key: string, defaultValue: T): T | null;
    /**
     * Get a value from the route.
     * @param key The routes key, e.g. /posts/:id would be 'id'.
     * @param defaultValue The default value if this is not found.
     */
    route(key: string, defaultValue: string | null): string | null;
    /**
     * Convert this request to JSON.
     */
    toJson(): RequestJson;
}
