const express = require('express');
const middlewares = require('./middlewares');
const routers = require('./routes');

const app = express();

app.use(middlewares.morganMiddleware);

app.use('/api/quotes', routers.quotesRouter);

app.use(middlewares.errorHandler);

module.exports = app;
