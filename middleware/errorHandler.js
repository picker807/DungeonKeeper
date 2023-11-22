const createHttpError = require("http-errors");

const errorHandler = (error, req, res, next) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  let statusCode = 500;
  if (error instanceof createHttpError.HttpError) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: error.message });
};

module.exports = errorHandler;
