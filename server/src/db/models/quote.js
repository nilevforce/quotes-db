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
