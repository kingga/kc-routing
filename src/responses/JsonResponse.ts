import { IResponse } from '../contracts/IResponse';

export class JsonResponse implements IResponse {
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
  public constructor(body: object | string) {
    this.body = body;
    this.code = 200;
    this.headerList = {};
  }

  /**
   * Get the status code for this response.
   */
  public getCode(): number {
    return 200;
  }

  /**
   * Get the body of this response.
   */
  public getHeaders(): Record<string, string> {
    return Object.assign(this.headerList, {
      'Content-Type': 'application/json',
    });
  }

  /**
   * Get the headers for this response.
   */
  public getBody(): string {
    return typeof this.body === 'string' ? this.body : JSON.stringify(this.body);
  }

  /**
   * Set the HTTP status code for this response.
   * @param code The HTTP status code.
   */
  public status(code: number): IResponse {
    this.code = code;

    return this;
  }

  /**
   * Set a single header in the response.
   * @param key The key of the header, e.g. Content-Type.
   * @param value The value of the header, e.g. application/json.
   */
  public header(key: string, value: string): IResponse {
    this.headerList[key] = value;

    return this;
  }

  /**
   * Replace all current headers with this list.
   * @param headers The headers for this response.
   */
  public headers(headers: Record<string, string>): IResponse {
    this.headerList = headers;

    return this;
  }
}
