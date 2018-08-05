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
    url = 'http://www.imdb.com/title/tt1229340/';
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
           	//res.render('index', {'json': json });
           	res.json({'json': html });
        }
    })
});




app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
