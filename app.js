var path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	request = require('request'),
	axios=require('axios'),
	express = require('express');

var app.engine('dust', cons.dust),
	app.set('view engine', 'dust'),
	app.set('views', __dirname + '/views'),
	app.use(express.static(path.join(__dirname,'public'))),
	app = express();




app.get('/', function(req, res) {
	res.render('index');
});

app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
