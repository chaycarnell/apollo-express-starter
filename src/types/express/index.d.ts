// Make file a module and avoid TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      logTraceId: string;
    }
  }
}
