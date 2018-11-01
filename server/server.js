
// modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// routers
const authRouter = require('./authRoutes.js');
const dbRouter = require('./dbRoutes.js');

// require('dotenv').config()
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// routes
app.use('/api/favorites', dbRouter);
app.use('/api', authRouter);


app.use(express.static(path.resolve(__dirname, '../react-client/dist')));
app.get('/*', function(req, res) {
  console.log('static file endpoint reached, url:' + req.url);
  res.sendFile(path.join(__dirname, '../react-client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  })
})


// Setup

let port = process.env.PORT;
if (port === undefined || port === null || port === "") {
  port = 3000;
}
app.listen(port, () => {
  console.log('listening on port ' + port + '!');
});
