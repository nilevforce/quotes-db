const { StatusCodes } = require('http-status-codes');
const db = require('../../database/models');
const { EntityNotFound } = require('../../errors');

const fetchRandomQuotes = async ({ limit = 3 }) => {
  const quotes = await db.Quote.findAll({
    attributes: ['id', 'text', 'author'],
    limit,
    order: db.sequelize.random(),
    include: [
      {
        model: db.Category,
        attributes: ['name'],
        as: 'allCategories',
        through: { attributes: [] },
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

  return {
    data: quotes,
    meta: {
      limit,
    },
  };
};

module.exports = fetchRandomQuotes;
