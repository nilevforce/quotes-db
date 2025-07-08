/* eslint-disable no-param-reassign */
const afterFind = (results) => {
  if (!results) return;
  const quotes = Array.isArray(results) ? results : [results];
  quotes.forEach((quote) => {
    if (quote.Categories) {
      quote.dataValues.categories = quote.Categories.map(({ name }) => name);
      delete quote.dataValues.Categories;
    }
  });
};

module.exports = (sequelize, DataTypes) => {
  const Quote = sequelize.define(
    'Quote',
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterFind,
      },
    },
  );

  Quote.associate = (models) => {
    Quote.belongsToMany(models.Category, {
      through: models.QuoteCategory,
      foreignKey: 'quoteId',
      otherKey: 'categoryId',
    });
  };

  return Quote;
};
