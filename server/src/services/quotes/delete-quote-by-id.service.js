const { StatusCodes } = require('http-status-codes');
const db = require('../../database/models');
const { EntityNotFound } = require('../../errors');

const deleteQuoteById = async (id) => {
  const countRows = await db.Quote.destroy({
    where: { id },
  });

  if (!countRows) {
    throw new EntityNotFound({
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: 'NOT_FOUND',
      message: `Quote with ID ${id} not found`,
    });
  }
};

module.exports = deleteQuoteById;
