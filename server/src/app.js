const express = require('express');
const middlewares = require('./middlewares');
const routers = require('./routes');

const app = express();

app.use(express.json());
app.use(middlewares.morganMiddleware);

app.use('/api/quotes', routers.quotesRouter);
app.use('/api/categories', routers.categoriesRouter);

app.use(middlewares.errorHandler);

module.exports = app;
