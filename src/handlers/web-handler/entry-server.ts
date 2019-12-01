import { createApp } from './main';
import Vue from 'vue';

const prepareUrlForRouting = (url: string): string => {
  const { BASE_URL } = process.env;

  if (!BASE_URL) {
    return url;
  }

  return url.startsWith(BASE_URL.replace(/\/$/, ''))
    ? url.substr(BASE_URL.length)
    : url;
};

interface Context {
  url: string;
  state: unknown;
  rendered?: () => void;
}

export default (context: Context): Promise<Vue> => {
  return new Promise(async (resolve, reject) => {
    const { app, router, store } = await createApp({
      before: () => Promise.resolve(),
      after: () => Promise.resolve(),
    });

    router.push(prepareUrlForRouting(context.url));

    router.onReady(() => {
      context.rendered = () => {
        context.state = store.state;
      };

      resolve(app);
    }, reject);
  });
};
