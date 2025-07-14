const db = require('../../database/models');
const fetchQuoteById = require('./fetch-quote-by-id.service');
const upsertCategories = require('../categories/upsert-categories.service');

const createQuote = async ({ text, author, categories }) => {
  const id = await db.sequelize.transaction(async (t) => {
    // Create new categories
    const categoryInstances = await upsertCategories(
      { categories },
      { transaction: t },
    );

    // Create the quote
    const quote = await db.Quote.create(
      { text, author },
      { transaction: t },
    );

    // Associate the quote with the retrieved categories
    await quote.setAllCategories(categoryInstances, { transaction: t });

    return quote.id;
  });

  const { data } = await fetchQuoteById(id);

  return { data };
};

module.exports = createQuote;
