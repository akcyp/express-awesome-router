import { RouterOptions, IRouterHandler, IRouterMatcher, Router } from 'express';
export interface XRouter extends Router {
  (options?: RouterOptions): XRouter;
  before: IRouterHandler<this> & IRouterMatcher<this>;
}
var XRouterFn: XRouter;
export default XRouterFn;
