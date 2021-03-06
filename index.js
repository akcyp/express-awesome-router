const express = require('express');

function modify (router, method, beforeFn) {
  const old = router[method];
  router[method] = (path, ...handlers) => {
    return old.apply(router, [path, (req, res, next) => beforeFn(req, res, next), ...handlers]);
  };
}

module.exports = function AwesomeRouter (options) {
  const router = express.Router(options);
  const strictMiddlewares = [(_, __, next) => next()];
  const before = (req, res, next) => {
    return express.Router().use(strictMiddlewares)(req, res, next);
  };
  router.before = (path, ...beforeFn) => {
    strictMiddlewares.push(express.Router().use(path, ...beforeFn));
  };
  ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head'].forEach(method => {
    modify(router, method, before);
  });
  return router;
}
