const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const db = require('../../database/models');
const { EntityNotFound } = require('../../errors');

const fetchQuotes = async ({
  limit = 5,
  offset = 0,
  author,
  category,
  text,
}) => {
  const whereQuery = {};
  if (author) whereQuery.author = { [Op.iLike]: `%${author}%` };
  if (text) whereQuery.text = { [Op.iLike]: `%${text}%` };

  const whereCategories = {};
  if (category) whereCategories.name = { [Op.iLike]: category };

  const quotes = await db.Quote.findAll({
    attributes: ['id', 'text', 'author'],
    limit,
    offset,
    order: [['id', 'ASC']],
    where: whereQuery,
    include: [
      {
        model: db.Category,
        attributes: ['name'],
        as: 'allCategories',
        through: { attributes: [] },
      },
      {
        model: db.Category,
        attributes: ['name'],
        as: 'matchedCategories',
        through: { attributes: [] },
        where: whereCategories,
      },
    ],
  });

  if (quotes.length === 0) {
    throw new EntityNotFound({
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: 'NOT_FOUND',
      message: 'Quotes not found',
    });
  }

  return {
    data: quotes,
    meta: {
      limit,
      offset,
    },
  };
};

module.exports = fetchQuotes;
