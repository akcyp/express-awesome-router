declare module 'express-serve-static-core' {
  interface Router {
    before: IRouterHandler<this> & IRouterMatcher<this>
  }
}

import { IRouter, RouterOptions } from 'express';

declare function Router (options?: RouterOptions): IRouter;
export = Router;
