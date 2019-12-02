import axios from 'axios';
import * as express from 'express';
import { Router } from '../src/Router';
import { IRouter, RouteMethod } from '../src/contracts/IRouter';
import { HtmlResponse } from '../src/responses/HtmlResponse';
import { expect } from 'chai';
import { Server } from 'http';

const port = 13337;
const url = `http://localhost:${port}`;
const app = express();

const createRoutes = (routes: (router: IRouter) => void): Promise<Server> => {
  return new Promise((resolve) => {
    const router = new Router(app);

    routes(router);

    router.build();
    const server = app.listen(port, () => resolve(server));
  });
};

const closeServer = (server: Server): Promise<void> => {
  return new Promise((resolve) => {
      server.close(() => resolve());
  });
};

describe('Router', () => {
  const methods: RouteMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

  for (const method of methods) {
    it(`can create a ${method} route`, async () => {
      const lowerMethod = method.toLowerCase();

      const server = await createRoutes((router) => {
        (router as any)[lowerMethod]({
          path: '/',
          controller: () => Promise.resolve(new HtmlResponse(method)),
        });
      });

      const response = await (axios as any)[lowerMethod](`${url}/`);
      await closeServer(server);

      expect(response.data).to.equal(method);
    }).timeout(10000);
  }

  it('can retrieve all of the routes', async () => {
    const router = new Router(express());
    router.get({ path: '/', controller: () => Promise.resolve(new HtmlResponse('GET')) });
    router.post({ path: '/', controller: () => Promise.resolve(new HtmlResponse('POST')) });
    router.delete({ path: '/posts/:id', controller: () => Promise.resolve(new HtmlResponse('DELETE')) });

    const routes = router.getRoutes();

    expect(routes).lengthOf(3);

    if (routes.length === 3) {
      expect(routes[0].path).to.equal('/');
      expect(routes[0].method).to.equal('GET');
      expect(routes[1].path).to.equal('/');
      expect(routes[1].method).to.equal('POST');
      expect(routes[2].path).to.equal('/posts/:id');
      expect(routes[2].method).to.equal('DELETE');
    }
  });

  it('can filter out certain routes from the route list', () => {
    const router = new Router(express());
    router.get({ path: '/', controller: () => Promise.resolve(new HtmlResponse('GET')) });
    router.get({ path: '/posts', controller: () => Promise.resolve(new HtmlResponse('GET')) });
    router.post({ path: '/', controller: () => Promise.resolve(new HtmlResponse('POST')) });

    const routes = router.getRoutes('GET');

    expect(routes).lengthOf(2);

    if (routes.length === 2) {
      expect(routes[0].path).to.equal('/');
      expect(routes[0].method).to.equal('GET');
      expect(routes[1].path).to.equal('/posts');
      expect(routes[1].method).to.equal('GET');
    }
  });

  it('can find a route by name', () => {
    const router = new Router(express());
    router.get({ path: '/', name: 'home', controller: () => Promise.resolve(new HtmlResponse('')) });
    router.get({ path: '/about', name: 'about', controller: () => Promise.resolve(new HtmlResponse('')) });

    const home = router.findRouteByName('home');
    const about = router.findRouteByName('about');

    expect(home).to.not.be.null;
    expect(about).to.not.be.null;

    if (home && about) {
      expect(home.path).to.equal('/');
      expect(about.path).to.equal('/about');
    }
  });

  it('can handle errors from the controller', async () => {
    const server = await createRoutes((router) => {
      router.post({
        path: '/reject',
        controller: () => new Promise((_resolve, reject) => reject(new Error('Exception'))),
      });

      router.post({
        path: '/error',
        controller: () => new Promise(() => {
          throw new Error('Exception');
        }),
      });

      router.post({
        path: '/string',
        controller: () => new Promise((_resolve, reject) => reject('Exception')),
      });
    });

    for (const path of ['reject', 'error', 'string']) {
      let caught = false;

      try {
        await axios.post(`${url}/${path}`);
      } catch (error) {
        caught = true;
        expect(error.status).to.not.be.ok;
        expect(error.response.data.error.message).to.equal('Exception');
        expect(error.response.data.error.stack).to.be.a('array');
      }

      expect(caught).to.be.true;
    }

    await closeServer(server);
  }).timeout(10000);
});
