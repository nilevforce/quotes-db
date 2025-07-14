const { StatusCodes } = require('http-status-codes');
const {
  createQuote: createQuoteService,
} = require('../../services');

const createQuote = async (req, res) => {
  const {
    text,
    author,
    categories,
  } = req.body;

  const { data, meta } = await createQuoteService({
    text,
    author,
    categories,
  });

  const response = {};
  if (data) response.data = data;
  if (meta) response.meta = meta;

  res.status(StatusCodes.OK).json(response);
};

module.exports = createQuote;
