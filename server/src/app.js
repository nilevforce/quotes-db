const express = require('express');
const apiV1 = require('./api');
const middlewares = require('./middlewares');

const app = express();

app.use(middlewares.requestLogger);
app.use(middlewares.successResponse);

app.use('/api/v1/quotes', apiV1.routers.quotesRouter);
app.use('/api/v1/healthz', apiV1.routers.healthzRouter);

app.use(middlewares.notFoundHandler);
app.use(middlewares.errorConverter);
app.use(middlewares.errorHandler);

module.exports = app;
