const express = require('express');
const routers = require('./routes');

const app = express();

app.use('/api/v1/quotes', routers.quotesRouter);
app.use('/api/v1/categories', routers.categoriesRouter);

module.exports = app;
