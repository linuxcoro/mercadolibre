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
            var $ = cheerio.load(html);
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};
           	//res.render('index', {'json': json });
           	

           	//res.json({'json': $('.g-itemImage').text() });

            $('.g-itemImage').filter(function(){
                var data = $(this);

                // The .star-box-giga-star class was exactly where we wanted it to be.
                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

                rating = data.text();

                json.rating = rating;
           		res.json({'json': json.rating });
            })



        }
    })
});




app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
