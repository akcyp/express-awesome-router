import { RouterOptions } from 'express';
export default function Router(options?: RouterOptions): import("express-serve-static-core").Router;
declare module 'express-serve-static-core' {
    interface Router {
        before: IRouterHandler<Router> & IRouterMatcher<Router>;
    }
}
