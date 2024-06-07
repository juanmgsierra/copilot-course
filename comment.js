// create web server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const db = require('../database/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/comments', (req, res) => {
  db.getComments((err, data) => {
    if (err) {
      console.log('error getting comments', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/comments', (req, res) => {
  db.addComment(req.body, (err, data) => {
    if (err) {
      console.log('error adding comment', err);
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});