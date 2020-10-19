import express from 'express';

function modify (router, method, beforeFn) {
  const old = router[method];
  router[method] = (path, ...handlers) => {
    return old.apply(router, [path, (req, res, next) => beforeFn(req, res, next), ...handlers]);
  };
}

module.exports = function XRouter (options) {
  const router = express.Router(options);
  const strictMiddlewares = [(_, __, next) => next()];
  const before = (req, res, next) => {
    return express.Router().use(strictMiddlewares)(req, res, next);
  };
  router.before = (...beforeFn) => {
    strictMiddlewares.push(...beforeFn);
  };
  ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head'].forEach(method => {
    modify(router, method, before);
  });
  return router;
}
