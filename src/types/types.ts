import { ErrorCodes } from './enums';
import { ErrorObject } from './interfaces';

export type ErrorMap = Record<ErrorCode, ErrorObject>;

export type ErrorCode = `${ErrorCodes}`;
