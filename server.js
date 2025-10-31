const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongodb = require('./backend/db/connect');
const professionalRoutes = require('./backend/routes/professional');

const port = process.env.PORT || 8080;
const app = express();


app.use(express.static(path.join(__dirname, 'frontend')));

//server to index
app.get('/', (req, res) => {
  res.sendFile(Path.join(__dirname, 'frontend','index.html'));
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/professional', professionalRoutes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});