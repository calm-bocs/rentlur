const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const craigslist = require('node-craigslist');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const client = new craigslist.Client({
  baseHost: 'craigslist.com',
  city: 'Austin',
});

// authentication
app.post('/api/login', (req, res) => {
  console.log('requested to login');
  res.end();
});
app.get('/api/logout', (req, res) => {
  console.log('requested to logout');
  res.end();
});
app.post('/api/signup', (req, res) => {
  console.log('requested to signup');
  res.end();
});
//

app.post('/api/:UserId', (req, res) => {
  console.log(req.body);
  res.end();
});

app.get('/api/:UserId', (req, res) => {
  console.log(req.body);
  res.end();
});

app.delete('/api/:UserId', (req, res) => {
  console.log(req.body);
  res.end();
});
app.post('/api/properties', (req, res) => {
  console.log(req.body);
  res.end();
});

app.post('/api/search', (req, res) => {
  const baseHost = req.body.baseHost || 'craigslist.org';
  const category = req.body.category || 'hhh';
  const maxAsk = req.body.maxAsk || '50000';
  const minAsk = req.body.minAsk || '0';
  const city = req.body.city || 'Austin';
  const postal = req.body.postal || '78701';
  const searchDistance = req.body.searchDistance || '25';

  const searchQuery = {
    baseHost,
    category,
    city,
    maxAsk,
    minAsk,
    postal,
    searchDistance,
    offset: '5',
  };

  client.search(searchQuery, '', (err, data) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log('data in the search', data);
      res.json(data);
    }
  });
});
app.use(express.static(path.resolve(__dirname, '../react-client/dist')));

// parse application/json
app.listen(3000, () => {
  console.log('listening on port 3000!');
});
