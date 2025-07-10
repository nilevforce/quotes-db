/* eslint-disable no-param-reassign */
const afterFind = (results) => {
  if (results) {
    const quotes = Array.isArray(results) ? results : [results];
    quotes.forEach((quote) => {
      if (quote.allCategories) {
        quote.dataValues.categories = quote.allCategories.map(
          (category) => category.name,
        );
        delete quote.dataValues.allCategories;
        delete quote.dataValues.matchedCategories;
      }
    });
  }
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
      as: 'allCategories',
      through: models.QuoteCategory,
      foreignKey: 'quoteId',
      otherKey: 'categoryId',
    });

    Quote.belongsToMany(models.Category, {
      as: 'matchedCategories',
      through: models.QuoteCategory,
      foreignKey: 'quoteId',
      otherKey: 'categoryId',
    });
  };

  return Quote;
};
