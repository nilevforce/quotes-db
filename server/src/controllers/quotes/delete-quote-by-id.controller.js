const { StatusCodes } = require('http-status-codes');
const {
  deleteQuoteById: deleteQuoteByIdService,
} = require('../../services');

const deleteQuoteById = async (req, res) => {
  const { id } = req.params;

  await deleteQuoteByIdService(id);

  res.status(StatusCodes.NO_CONTENT).send();
};

module.exports = deleteQuoteById;
