import { BaseContext } from '@apollo/server';

export interface CustomRequestContext extends BaseContext {
  logTraceId: string;
  authenticated: boolean;
  user?: {
    id: string;
  };
}

export interface ErrorObject {
  status: number;
  message: string;
}
