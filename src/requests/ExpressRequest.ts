import { IRequest, RequestJson } from '../contracts/IRequest';
import { Request } from 'express-serve-static-core';

export class ExpressRequest implements IRequest {
  /**
   * The express request.
   */
  protected request: Request;

  /**
   * Create the request using the express request.
   * @param request The express request.
   */
  public constructor(request: Request) {
    this.request = request;
  }

  /**
   * Check if the given key exists on the requests body.
   * @param key The key in the requests body.
   */
  public has(key: string): boolean {
    return typeof this.request.body[key] !== 'undefined';
  }

  /**
   * Get a value from the requests body.
   * @param key The key in the requests body.
   * @param defaultValue The default value if the key isn't found.
   */
  public get<T>(key: string, defaultValue: T | null = null): T | null {
    return this.request.body[key] || defaultValue;
  }

  /**
   * Get a value from the route.
   * @param key The routes key, e.g. /posts/:id would be 'id'.
   * @param defaultValue The default value if this is not found.
   */
  public route(key: string, defaultValue: string | null = null): string | null {
    return this.request.params[key] || defaultValue;
  }

  /**
   * Convert this request to JSON.
   */
  public toJson(): RequestJson {
    const headers: Record<string, string | undefined> = {};

    for (let [k, v] of Object.entries(this.request.headers)) {
      if (typeof v === 'object') {
        v = v.join(', ');
      }

      headers[k] = v;
    }

    return {
      method: this.request.method,
      url: this.request.url,
      headers,
      body: this.request.body,
    };
  }
}
