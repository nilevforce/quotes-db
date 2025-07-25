const { StatusCodes } = require('http-status-codes');
const db = require('../../database/models');
const { EntityNotFound } = require('../../errors');

const fetchCategoryById = async (id, options = {}) => {
  const { transaction } = options;

  const category = await db.Category.findByPk(
    id,
    {
      attributes: ['id', 'name'],
      transaction,
    },
  );

  if (!category) {
    throw new EntityNotFound({
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: 'NOT_FOUND',
      message: `Category with ID ${id} not found`,
    });
  }

  return {
    data: category,
  };
};

module.exports = fetchCategoryById;
