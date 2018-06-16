import SVError from './SVError';

export class FetchError extends SVError {}
export class ServerError extends SVError {}
export class ClientError extends SVError {}
export class ServerValidationError extends ServerError {}
