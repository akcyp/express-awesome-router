import { RouterOptions, IRouterHandler, IRouterMatcher, Router } from 'express';
export interface AwesomeRouter extends Router {
  (options?: RouterOptions): AwesomeRouter;
  before: IRouterHandler<this> & IRouterMatcher<this>;
}
var AwesomeRouterFn: AwesomeRouter;
export default AwesomeRouterFn;
