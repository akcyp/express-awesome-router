import { Router, IRouterHandler, IRouterMatcher } from 'express-serve-static-core';
declare module 'express-awesome-router' {
  interface XRouter extends Router {
    before: IRouterHandler<Router> & IRouterMatcher<Router>;
  }
  export interface XRouter {}
}
