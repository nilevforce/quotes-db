const db = require('../../database/models');
const fetchQuoteById = require('./fetch-quote-by-id.service');

/* eslint-disable no-shadow */
const createQuote = async ({ text, author, categories }) => {
  const categoryNames = categories.map((name) => ({ name }));

  const id = await db.sequelize.transaction(async (t) => {
    // Create new categories
    await db.Category.bulkCreate(categoryNames, {
      ignoreDuplicates: true,
      transaction: t,
    });

    // Fetch all category instances matching the provided names
    const categoryInstances = await db.Category.findAll({
      where: { name: categories },
      transaction: t,
    });

    // Create the quote
    const quote = await db.Quote.create({ text, author }, { transaction: t });

    // Associate the quote with the retrieved categories
    await quote.setAllCategories(categoryInstances, { transaction: t });

    return quote.id;
  });

  const { data } = await fetchQuoteById(id);

  return { data };
};

module.exports = createQuote;
