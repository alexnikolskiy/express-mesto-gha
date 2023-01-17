const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorRouter = require('./routes/errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата

// мидлвэр-костыль авторизации
// _id: '63c48d5bd1bbdceac4b3cc5e'
app.use((req, res, next) => {
  req.user = {
    _id: '63c48d5bd1bbdceac4b3cc5e',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', errorRouter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
