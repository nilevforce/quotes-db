const healthzController = require('./controllers/healthz.controller');
const quotesController = require('./controllers/quotes.controller');

const healthzRouter = require('./routes/healthz.router');
const quotesRouter = require('./routes/quotes.router');

module.exports = {
  controllers: {
    healthzController,
    quotesController,
  },
  routers: {
    healthzRouter,
    quotesRouter,
  },
};
