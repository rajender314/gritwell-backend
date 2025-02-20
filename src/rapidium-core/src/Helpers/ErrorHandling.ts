/**
 * @param {err} err
 */
function logError(err) {
  console.error(err);
}
/**
  * @param {err} err
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}
/**
  * @param {err} err
  * @param {req} req
  * @param {res} res
  * @param {next} next
  */
function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).send(err.message);
}
/**
 * @param {error} error
 * @return {Boolean}
 */
function isOperationalError(error) {
  /* if (error instanceof BaseError) {
    return error.isOperational
    }*/
  return false;
}

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
