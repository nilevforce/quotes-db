const { StatusCodes } = require('http-status-codes');
const db = require('../../database/models');
const fetchQuoteById = require('./fetch-quote-by-id.service');
const upsertCategories = require('../categories/upsert-categories.service');
const { EntityNotFound } = require('../../errors');

const updateQuoteById = async (id, {
  text,
  author,
  categories,
}) => {
  await db.sequelize.transaction(async (t) => {
    const quote = await db.Quote.findByPk(id, { transaction: t });

    if (!quote) {
      throw new EntityNotFound({
        statusCode: StatusCodes.NOT_FOUND,
        errorCode: 'NOT_FOUND',
        message: `Quote with ID ${id} not found`,
      });
    }

    if (text) quote.text = text;
    if (author) quote.author = author;

    await quote.save({ transaction: t });

    if (categories) {
      const categoryInstances = await upsertCategories(
        { categories },
        { transaction: t },
      );

      await quote.setAllCategories(categoryInstances, { transaction: t });
    }
  });

  const { data } = await fetchQuoteById(id);

  return { data };
};

module.exports = updateQuoteById;
