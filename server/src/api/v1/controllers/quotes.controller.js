const httpStatus = require('http-status').default;
const db = require('../../../db/models');
const ApiError = require('../../../utils/ApiError');
const catchAsync = require('../../../utils/catchAsync');

const getQuotes = catchAsync(async (req, res) => {
  const {
    limit = 5,
    offset = 0,
  } = req.query;

  const quotes = await db.Quote.findAll({
    attributes: ['id', 'text', 'author'],
    limit,
    offset,
    order: [['id', 'ASC']],
  });

  if (!quotes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quotes not found');
  }

  return res.json(quotes);
});

const getQuoteById = catchAsync(async (req, res) => {
  const quoteId = req.params.id;

  const quote = await db.Quote.findByPk(quoteId, {
    attributes: ['id', 'text', 'author'],
    include: {
      model: db.Category,
      attributes: ['name'],
    },
  });

  if (!quote) {
    throw new ApiError(httpStatus.NOT_FOUND, `Quote with ID ${quoteId} not found`);
  }

  quote.dataValues.categories = quote.dataValues.Categories.map((cat) => cat.name);
  delete quote.dataValues.Categories;

  return res.json(quote);
});

module.exports = {
  getQuotes,
  getQuoteById,
};
