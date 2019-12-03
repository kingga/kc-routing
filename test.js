const router = require('./dist/index').router;
const app = require('./dist/index').app;

router.get({
  path: '/',
  controller: () => new Promise(() => {
    throw new Error('test');
  }),
});

router.build();

app.listen(13337);
