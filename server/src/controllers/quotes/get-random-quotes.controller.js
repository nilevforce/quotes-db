const { StatusCodes } = require('http-status-codes');
const { fetchRandomQuotes } = require('../../services');

const getRandomQuotes = async (req, res) => {
  const { limit } = req.query;

  const { data, meta } = await fetchRandomQuotes({ limit });

  const response = {};
  if (data) response.data = data;
  if (meta) response.meta = meta;

  res.status(StatusCodes.OK).json(response);
};

module.exports = getRandomQuotes;
