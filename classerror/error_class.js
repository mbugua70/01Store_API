class CustomAPIError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
  }
}

const customError = (msg, statuscode) => {
  return new CustomAPIError(msg, statuscode);
};

module.exports = {
  customError,
  CustomAPIError,
};
