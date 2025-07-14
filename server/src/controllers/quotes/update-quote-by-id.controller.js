const { StatusCodes } = require('http-status-codes');
const {
  updateQuoteById: updateQuoteByIdService,
} = require('../../services');

const updateQuoteById = async (req, res) => {
  const { id } = req.params;
  const { text, author, categories } = req.body;

  const result = await updateQuoteByIdService(id, {
    text,
    author,
    categories,
  });

  res.status(StatusCodes.OK).send(result);
};

module.exports = updateQuoteById;
