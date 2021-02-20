# express-awesome-router

Express router with extended functionality

## Instalation

```bash
npm i express-awesome-router
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

## Use case

Express Router by default attaches "middlewares" to main app router. There is no way to attach middleware only to routes that belongs to parent router. There are three options to achieve the goal:

- Add middlere to specific path

```js
const app = express();
const authRouter = express.Router();

authRouter.use((req, res, next) => {
  if (req.isAuthorized()) return next();
  else return res.status(401).send('Unauthorized');
});
authRouter.get('/profile', (req, res) => res.render('profile'));
authRouter.get('/settings', (req, res) => res.render('settings'));

app.use('/auth', authRouter); // <----
/*
  /auth/profile is uglier than /profile huh?
*/
```

- Add guards to every route

```js
const app = express();
const authRouter = express.Router();

const authGuard = (req, res, next) => {
  if (req.isAuthorized()) return next();
  else return res.status(401).send('Unauthorized');
};
// -----------------------------↴
authRouter.get('/profile', authGuard, (req, res) => res.render('profile'));
// -----------------------------↴
authRouter.get('/settings', authGuard, (req, res) => res.render('settings'));
/*
  Too hard to keep the project structure
*/

app.use(router);
```

- Use `express-awesome-router` 😍

```js
const express = require('express');
const Router = requrie('express-awesome-router');
const app = express();


const authRouter = Router();
authRouter.get('/profile', (req, res) => res.render('profile'));
authRouter.get('/settings', (req, res) => res.render('settings'));
// Attach "middleware" only to routes belonging to `router`
authRouter.before((req, res, next) => {
  if (req.isAuthorized()) return next();
  else return res.status(401).send('Unauthorized');
});

app.get('/', (req, res) => res.render('mainPage'));
app.get('*', (req, res) => res.status(404).send('Not found'));
// No conflicts!

app.use(authRouter).listen(80);

/*
  Awesome! ❤️
*/
```
