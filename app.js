var bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	request = require('request'),
	path = require('path'),
	express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send('hello, Edixon');
});

app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
