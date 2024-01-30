import { CustomRequestContext } from '../interfaces';

// Export to create a module and avoid TS error
export {};

declare global {
  namespace Express {
    export interface Request extends Express.Request, CustomRequestContext {}
  }
}
