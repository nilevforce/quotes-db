const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const db = require('../database/models');
const { EntityNotFound } = require('../errors');

// Getting all quotes
const getQuotes = async (req, res) => {
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
    throw new EntityNotFound({
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: 'NOT_FOUND',
      message: 'Quotes not found',
    });
  }

  res.status(StatusCodes.OK).json({
    data: quotes,
    meta: {
      limit,
      offset,
    },
  });
};

// Getting quotes by ID
// const getQuoteById = async (req, res) => {
//   const quoteId = req.params.id;

//   const quote = await db.Quote.findByPk(quoteId, {
//     attributes: ['id', 'text', 'author'],
//     include: {
//       model: db.Category,
//       attributes: ['name'],
//       as: 'allCategories',
//     },
//   });

//   if (!quote) {
//     throw new ApiError({
//       statusCode: httpStatus.NOT_FOUND,
//       message: `Quote with ID ${quoteId} not found`,
//     });
//   }

//   return res.success({
//     data: quote,
//   });
// };

module.exports = {
  getQuotes,
};
