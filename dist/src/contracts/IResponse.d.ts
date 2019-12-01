export interface IResponse {
    /**
     * Get the status code for this response.
     */
    getCode(): number;
    /**
     * Get the body of this response.
     */
    getBody(): string;
    /**
     * Get the headers for this response.
     */
    getHeaders(): Record<string, string>;
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
