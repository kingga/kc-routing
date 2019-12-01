import { IResponse } from '../contracts/IResponse';
export declare class JsonResponse implements IResponse {
    /**
     * The bodies content.
     */
    protected body: object | string;
    /**
     * The HTTP status code for this response.
     */
    protected code: number;
    /**
     * The list of headers to attach to this response.
     */
    protected headerList: Record<string, string>;
    /**
     * Create the JSON request with some JSON data.
     * @param body The JSON data, either before or after JSON.stringify().
     */
    constructor(body: object | string);
    /**
     * Get the status code for this response.
     */
    getCode(): number;
    /**
     * Get the body of this response.
     */
    getHeaders(): Record<string, string>;
    /**
     * Get the headers for this response.
     */
    getBody(): string;
    /**
     * Set the HTTP status code for this response.
     * @param code The HTTP status code.
     */
    status(code: number): IResponse;
    /**
     * Set a single header in the response.
     * @param key The key of the header, e.g. Content-Type.
     * @param value The value of the header, e.g. application/json.
     */
    header(key: string, value: string): IResponse;
    /**
     * Replace all current headers with this list.
     * @param headers The headers for this response.
     */
    headers(headers: Record<string, string>): IResponse;
}
