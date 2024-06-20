const CustomAPIError = require("../classerror/error_class");

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statuscode).json({ msg: err.message });
  }
  res.status(500).json({ msg: "Something went wrong, Please try again" });
};

module.exports = errorHandlerMiddleware;
