const { StatusCodes } = require('http-status-codes');
const { fetchCategories } = require('../../services');

// Getting all quotes
const getCategories = async (req, res) => {
  const {
    limit,
    offset,
    name,
  } = req.query;

  const { data, meta } = await fetchCategories({
    limit,
    offset,
    name,
  });

  const response = {};
  if (data) response.data = data;
  if (meta) response.meta = meta;

  res.status(StatusCodes.OK).json(response);
};

module.exports = getCategories;
