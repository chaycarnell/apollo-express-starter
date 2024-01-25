import { BaseContext } from '@apollo/server';

export interface CustomContext extends BaseContext {
  logTraceId: string;
  user?: {
    id: string;
  };
}

export interface ErrorObject {
  status: number;
  message: string;
}
