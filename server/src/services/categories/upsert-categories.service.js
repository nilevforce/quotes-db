const db = require('../../database/models');

const upsertCategories = async ({ categories }, options = {}) => {
  const { transaction } = options;
  const categoryList = categories.map((name) => ({ name }));

  await db.Category.bulkCreate(
    categoryList,
    {
      ignoreDuplicates: true,
      transaction,
    },
  );

  const categoryInstances = await db.Category.findAll(
    {
      where: {
        name: categories,
      },
      transaction,
    },
  );

  return categoryInstances;
};

module.exports = upsertCategories;
