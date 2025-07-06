const db = require('../db/models');

const getQuotes = async (req, res) => {
  try {
    const limit = 10;
    const quotes = await db.Quote.findAll({
      attributes: ['id', 'text', 'author'],
      limit,
    });

    if (!quotes) {
      return res.status(404).json({
        message: 'Quotes not found',
      });
    }

    return res.json(quotes);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getQuoteById = async (req, res) => {
  try {
    const quoteId = Number(req.params.id);

    if (!Number.isInteger(quoteId)) {
      return res.status(400).json({
        message: `Invalid quote ID "${req.params.id}": must be an integer`,
      });
    }

    const quote = await db.Quote.findByPk(quoteId, {
      attributes: ['id', 'text', 'author'],
    });

    if (!quote) {
      return res.status(404).json({
        message: `Quote with ID ${quoteId} not found`,
      });
    }

    return res.json(quote);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getQuotes,
  getQuoteById,
};
