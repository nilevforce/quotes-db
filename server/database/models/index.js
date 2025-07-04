const {
  Sequelize,
  DataTypes,
} = require('sequelize');

const sequelize = new Sequelize(
  'postgres://user:password@localhost:5432/db',
  { logging: false },
);

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Quote = sequelize.define('Quote', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
  },
});

const QuoteCategory = sequelize.define(
  'QuoteCategory',
  {},
  {
    timestamps: false,
    indexes: [
      { unique: false, fields: ['QuoteId'] },
      { unique: false, fields: ['CategoryId'] },
    ],
  },
);

Quote.belongsToMany(Category, { through: QuoteCategory });
Category.belongsToMany(Quote, { through: QuoteCategory });

module.exports = {
  sequelize,
  Category,
  Quote,
  QuoteCategory,
};
