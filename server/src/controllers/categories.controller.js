const db = require('../db/models');

const getCategories = async (req, res) => {
  try {
    const limit = 10;
    const categories = await db.Category.findAll({
      attributes: ['id', 'name'],
      limit,
    });

    if (!categories) {
      return res.status(404).json({
        message: 'Categories not found',
      });
    }

    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);

    if (!Number.isInteger(categoryId)) {
      return res.status(400).json({
        message: `Invalid category ID "${req.params.id}": must be an integer`,
      });
    }

    const category = await db.Category.findByPk(categoryId, {
      attributes: ['id', 'name'],
    });

    if (!category) {
      return res.status(404).json({
        message: `Category with ID ${categoryId} not found`,
      });
    }

    return res.json(category);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
};
