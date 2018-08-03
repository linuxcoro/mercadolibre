var express = require('express'),
	path = require('path');

var app = express();

app.get('/', function(req, res) {
  res.send('hello, Edixon');
});

app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
