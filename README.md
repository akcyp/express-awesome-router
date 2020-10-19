# express-awesome-router

Express router with extended functionality

## Instalation

```bash
npm i akcyp/express-awesome-router
```

## Usage

```js
// ES6 modules with Babel or TypeScript
import Router from 'express-awesome-router';

// CommonJS modules
const Router = require('express-awesome-router');

// Init
const router = Router();
router.before('/', (req, res, next) => {
  // Attach middleware to existing only routes
  res.status(418);
  next();
});
router.get('/', (req, res) => res.send('Hello world'));

// Attach to express app
import express from 'express';
const app = express();
app.use(router);
app.listen(80);
```

## Methods

- `.before` - attach middleware only to routes in this router (not to whole app, like `.use` method)

... all default express router methods
