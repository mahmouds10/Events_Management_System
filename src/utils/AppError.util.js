class AppError extends Error {
    constructor(message, statusCode = 500, details = null) {
      super(message);
      this.statusCode = statusCode;
      this.details = details;  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;