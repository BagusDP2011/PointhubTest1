const isObject = (value) => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return true;
  }
  return false;
};

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = "") {
    if (Array.isArray(message)) {
      message = message.join(". ");
    } else if (isObject(message)) {
      message = JSON.stringify(message);
    }

    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError;
