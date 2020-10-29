const express = require('express');

const Router = require('../index');
const router = Router();

router.before('/', (req, res, next) => {
  // Attach middleware to existing only routes
  res.status(418);
  next();
});
router.get('/', (req, res) => res.send('Hello world'));

const app = express();

app.use(router);
app.get('*', (req, res, next) => {
  res.send('404');
});

app.listen(80);
module.exports = app;
