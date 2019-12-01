"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HtmlResponse {
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
    getBody() {
        return this.body;
    }
    /**
    * Get the headers for this response.
    */
    getHeaders() {
        return Object.assign(this.headerList, {
            'Content-Type': 'text/html',
        });
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
exports.HtmlResponse = HtmlResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHRtbFJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Jlc3BvbnNlcy9IdG1sUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFhLFlBQVk7SUFnQnRCLFlBQW1CLElBQVk7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztNQUVFO0lBQ0ssT0FBTztRQUNaLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztNQUVFO0lBQ0ssT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRUQ7O01BRUU7SUFDSyxVQUFVO1FBQ2YsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEMsY0FBYyxFQUFFLFdBQVc7U0FDNUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7TUFHRTtJQUNLLE1BQU0sQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O01BSUU7SUFDSyxNQUFNLENBQUMsR0FBVyxFQUFFLEtBQWE7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFN0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztNQUdFO0lBQ0ssT0FBTyxDQUFDLE9BQStCO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1FBRTFCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNIO0FBM0VELG9DQTJFQyJ9