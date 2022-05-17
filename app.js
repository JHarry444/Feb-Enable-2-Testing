const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const kittenRouter = require('./routes/kitten');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/kitten', kittenRouter);

app.use('*', (req, res, next) => next(createError(404, 'Not found')));

// eslint-disable-next-line no-unused-vars
app.use(({ status, message }, req, res, _next) => {
  if (!status) res.status(400).send(message);
  res.status(status).send(message);
});

module.exports = app;
