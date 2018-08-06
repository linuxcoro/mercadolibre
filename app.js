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
    url = 'https://www.amazon.com/registry/wishlist/1A7GB9IL1UAK2/';
    request(url, function(error, response, html){
        if(!error){
			let $ = cheerio.load(html);
			let kurs = [];
			$('.g-itemImage img').each(function(i, elem) {
				kurs[i] = $(this).attr("src");
			});
           	res.render('index', {'json': kurs });

        }
    })
});



app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
