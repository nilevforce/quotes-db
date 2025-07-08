const express = require('express');
const apiV1 = require('./api/v1');
const middlewares = require('./middlewares');

const app = express();

app.use(middlewares.requestLogger);

app.use('/api/v1/quotes', apiV1.routers.quotesRouter);
app.use('/api/v1/healthz', apiV1.routers.healthzRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorConverter);
app.use(middlewares.errorHandler);

module.exports = app;
