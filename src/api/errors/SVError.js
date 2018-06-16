/**
 * SVError
 * This is best way to create extensible Errors with babel
 * Extend the SVError class if you want to be able to instance check your errors
 * @param msg
 * @param payload
 * @constructor
 */
function SVError(msg, payload) {
  this.message = msg;
  this.name = this.constructor.name;
  this.payload = payload;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (Error()).stack;
  }
}

SVError.prototype = Object.create(Error.prototype);
SVError.prototype.constructor = SVError;

export default SVError;
