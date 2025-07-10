const validateRequest = (schema, location = 'body') => (req, res, next) => {
  if (!schema) return next();

  const options = {
    abortEarly: false,
    stripUnknown: true,
    errors: {
      wrap: {
        label: false,
      },
    },
  };

  const { value, error } = schema.validate(req[location], options);

  if (error) {
    return next(error);
  }

  req[location] = value;
  return next();
};

module.exports = validateRequest;
