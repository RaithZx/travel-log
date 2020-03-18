/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./midddlewares');
const logs = require('./api/logs');

const app = express();

mongoose.connect(process.env.DATABESE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log(Error, err.message);
  });

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
console.log(process.env.CORS_ORIGIN);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use('/api/logs', logs);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

const port = process.env.PORT || 1337;


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
