const { StatusCodes } = require('http-status-codes');
const { fetchQuoteById } = require('../../services');

const getQuoteById = async (req, res) => {
  const { id } = req.params;

  const { data, meta } = await fetchQuoteById(id);

  const response = {};
  if (data) response.data = data;
  if (meta) response.meta = meta;

  return res.status(StatusCodes.OK).json(response);
};

module.exports = getQuoteById;
