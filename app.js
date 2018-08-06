var path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	request = require('request'),
	axios=require('axios'),
	express = require('express');

var cheerio = require('cheerio');

var app = express();

	app.engine('dust', cons.dust);
	app.set('view engine', 'dust');
	app.set('views', __dirname + '/views');




app.get('/', function(req, res) {
	request('https://www.amazon.com/gp/registry/wishlist/1A7GB9IL1UAK2', function(err, resp, html) {
		if (!err){
			const $ = cheerio.load(html);
			res.json(html);
		}
	}
});




app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
