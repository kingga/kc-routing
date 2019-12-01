"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonResponse {
    /**
     * Create the JSON request with some JSON data.
     * @param body The JSON data, either before or after JSON.stringify().
     */
    constructor(body) {
        this.body = body;
        this.code = 200;
        this.headerList = {};
    }
    /**
     * Get the status code for this response.
     */
    getCode() {
        return 200;
    }
    /**
     * Get the body of this response.
     */
    getHeaders() {
        return Object.assign(this.headerList, {
            'Content-Type': 'application/json',
        });
    }
    /**
     * Get the headers for this response.
     */
    getBody() {
        return typeof this.body === 'string' ? this.body : JSON.stringify(this.body);
    }
    /**
     * Set the HTTP status code for this response.
     * @param code The HTTP status code.
     */
    status(code) {
        this.code = code;
        return this;
    }
    /**
     * Set a single header in the response.
     * @param key The key of the header, e.g. Content-Type.
     * @param value The value of the header, e.g. application/json.
     */
    header(key, value) {
        this.headerList[key] = value;
        return this;
    }
    /**
     * Replace all current headers with this list.
     * @param headers The headers for this response.
     */
    headers(headers) {
        this.headerList = headers;
        return this;
    }
}
exports.JsonResponse = JsonResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnNvblJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Jlc3BvbnNlcy9Kc29uUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFhLFlBQVk7SUFnQnZCOzs7T0FHRztJQUNILFlBQW1CLElBQXFCO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQyxjQUFjLEVBQUUsa0JBQWtCO1NBQ25DLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLE9BQU87UUFDWixPQUFPLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLEdBQVcsRUFBRSxLQUFhO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRTdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE9BQU8sQ0FBQyxPQUErQjtRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUUxQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQS9FRCxvQ0ErRUMifQ==