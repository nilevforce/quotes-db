const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const db = require('../../database/models');
const { EntityNotFound } = require('../../errors');

const fetchCategories = async ({
  limit = 5,
  offset = 0,
  name,
}) => {
  const whereQuery = {};
  if (name) whereQuery.name = { [Op.iLike]: `%${name}%` };

  const categories = await db.Category.findAll({
    attributes: ['id', 'name'],
    limit,
    offset,
    order: [['id', 'ASC']],
    where: whereQuery,
  });

  if (categories.length === 0) {
    throw new EntityNotFound({
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: 'NOT_FOUND',
      message: 'Categories not found',
    });
  }

  return {
    data: categories,
    meta: {
      limit,
      offset,
    },
  };
};

module.exports = fetchCategories;
