const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Import routes
const pokemonRoute = require('./routes/pokemon');

app.use('/api/v2/pokemon', pokemonRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db');
});

// Listen to server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
