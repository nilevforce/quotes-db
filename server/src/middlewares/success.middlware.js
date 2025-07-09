/* eslint-disable no-shadow */
const { ApiSuccess } = require('../utils');

const successResponse = (req, res, next) => {
  res.success = ({ statusCode = 200, data, meta = {} }) => {
    const response = new ApiSuccess({ statusCode, data, meta });
    return res.status(response.statusCode).json(response.toJSON());
  };

  next();
};

module.exports = successResponse;
