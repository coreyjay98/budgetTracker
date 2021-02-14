const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const ck = require('ckey');

const PORT = ck.PORT || 8080;

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(ck.DB_URL || 'mongodb://localhost/budget', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// routes
app.use(require('./routes/api.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
