const { StatusCodes } = require('http-status-codes');
const db = require('../../database/models');
const { EntityNotFound } = require('../../errors');

const fetchQuoteById = async (id, options = {}) => {
  const { transaction } = options;

  const quote = await db.Quote.findByPk(
    id,
    {
      attributes: ['id', 'text', 'author'],
      include: {
        model: db.Category,
        attributes: ['name'],
        as: 'allCategories',
      },
      transaction,
    },
  );

  if (!quote) {
    throw new EntityNotFound({
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: 'NOT_FOUND',
      message: `Quote with ID ${id} not found`,
    });
  }

  return {
    data: quote,
  };
};

module.exports = fetchQuoteById;
