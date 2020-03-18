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
// console.log(process.env.DATABESE_URL);
mongoose.connect(process.env.DATABESE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.log('xxx Error fatal');
    console.log(Error, err.message);
  });

// mongoose.createConnection('mongodb://localhost:27017/framework', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on('open', () => {
//   console.log('Connected to mongodb server.');
//   mongoose.connection.db.listCollections().toArray((err, names) => {
//     console.log(names);
//   });
// });


// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
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
