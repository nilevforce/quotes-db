class ApiError extends Error {
  constructor({ statusCode, message }) {
    super(message);
    this.statusCode = statusCode;
    this.description = message;
  }

  toJSON() {
    return {
      ok: false,
      errorCode: this.statusCode,
      description: this.description,
    };
  }
}

module.exports = ApiError;
