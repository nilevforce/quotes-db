module.exports = (sequelize, DataTypes) => {
  const QuoteCategory = sequelize.define(
    'QuoteCategory',
    {
      quoteId: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    },
  );

  return QuoteCategory;
};
