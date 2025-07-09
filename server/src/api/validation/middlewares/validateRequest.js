const httpStatus = require('http-status').default;
const { ApiError } = require('../../../utils');

const validate = (schema, location = 'body') => (req, res, next) => {
  if (!schema) return next();

  const options = {
    abortEarly: true,
    stripUnknown: true,
    errors: {
      wrap: {
        label: false,
      },
    },
  };

  const { error, value } = schema.validate(req[location], options);

  if (error) {
    const formattedErrorList = error.details.map(
      ({ path, message }) => ({
        field: path.join('.'),
        message,
      }),
    );

    next(
      new ApiError({
        statusCode: httpStatus.BAD_REQUEST,
        message: formattedErrorList[0].message || 'Validation error',
      }),
    );
  }

  req[location] = value;

  return next();
};

module.exports = {
  validate,
};
