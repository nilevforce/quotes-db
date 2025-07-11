const { StatusCodes } = require('http-status-codes');
const { fetchQuotes } = require('../../services');

// Getting all quotes
const getQuotes = async (req, res) => {
  const {
    limit,
    offset,
    author,
    text,
    category,
  } = req.query;

  const { data, meta } = await fetchQuotes({
    limit,
    offset,
    author,
    category,
    text,
  });

  const response = {};
  if (data) response.data = data;
  if (meta) response.meta = meta;

  res.status(StatusCodes.OK).json(response);
};

module.exports = getQuotes;
