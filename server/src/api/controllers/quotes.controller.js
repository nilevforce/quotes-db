const httpStatus = require('http-status').default;
const { Op } = require('sequelize');
const db = require('../../db/models');
const {
  ApiError,
  catchAsync,
} = require('../../utils');

// Getting all quotes
const getQuotes = catchAsync(async (req, res) => {
  console.log(req.query);
  const {
    limit = 5,
    offset = 0,
    author,
    text,
    category,
  } = req.query;

  const whereClause = {};
  if (author) whereClause.author = { [Op.iLike]: `%${author}%` };
  if (text) whereClause.text = { [Op.iLike]: `%${text}%` };

  const quotes = await db.Quote.findAll({
    attributes: ['id', 'text', 'author'],
    limit,
    offset,
    order: [['id', 'ASC']],
    where: whereClause,
    include: [
      {
        model: db.Category,
        attributes: ['name'],
        as: 'allCategories',
        through: { attributes: [] },
      },
      {
        model: db.Category,
        attributes: ['name'],
        as: 'matchedCategories',
        through: { attributes: [] },
        where: category ? { name: category } : undefined,
      },
    ],
  });

  if (quotes.length === 0) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: 'Quotes not found',
    });
  }

  res.success({
    statusCode: httpStatus.OK,
    data: quotes,
    meta: {
      limit,
      offset,
      count: quotes.length,
    },
  });
});

// Getting quotes by ID
const getQuoteById = catchAsync(async (req, res) => {
  const quoteId = req.params.id;

  const quote = await db.Quote.findByPk(quoteId, {
    attributes: ['id', 'text', 'author'],
    include: {
      model: db.Category,
      attributes: ['name'],
      as: 'allCategories',
    },
  });

  if (!quote) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: `Quote with ID ${quoteId} not found`,
    });
  }

  return res.success({
    data: quote,
  });
});

module.exports = {
  getQuotes,
  getQuoteById,
};
