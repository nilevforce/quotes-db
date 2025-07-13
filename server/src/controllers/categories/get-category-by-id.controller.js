const { StatusCodes } = require('http-status-codes');
const { fetchCategoryById } = require('../../services');

const getCategoryById = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  const { data, meta } = await fetchCategoryById(id);

  const response = {};
  if (data) response.data = data;
  if (meta) response.meta = meta;

  res.status(StatusCodes.OK).json(response);
};

module.exports = getCategoryById;
