module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  Category.associate = (models) => {
    Category.belongsToMany(models.Quote, {
      through: models.QuoteCategory,
      foreignKey: 'categoryId',
      otherKey: 'quoteId',
    });
  };

  return Category;
};
