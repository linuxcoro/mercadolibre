var path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	request = require('request'),
	axios=require('axios'),
	express = require('express');

var app = express();

	app.engine('dust', cons.dust);
	app.set('view engine', 'dust');
	app.set('views', __dirname + '/views');




app.get('/', function(req, res) {
	res.render('index');
});

const AmazonListScraper = require('amazon-list-scraper').default;
 
const scraper = new AmazonListScraper();
scraper.scrape('https://www.amazon.com/gp/registry/wishlist/1JMCNHNT959X2')
  .then(items => {
    console.log(items);
    //  [
    //    { 
    //      title: 'The Principles of Object-Oriented JavaScript',
    //      price: 9.99,
    //      link: 'https://www.amazon.com/dp/B00I87B1H8/ref=wl_it_dp_v_nS_ttl/184-4221310-4664445?_encoding=UTF8&colid=1JMCNHNT959X2&coliid=I2ETH645CXBEGM'
    //    },
    //    { 
    //      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    //      price: 38.6,
    //      link: 'https://www.amazon.com/dp/0132350882/ref=wl_it_dp_v_nS_ttl/184-4221310-4664445?_encoding=UTF8&colid=1JMCNHNT959X2&coliid=IDGP10KBLGRPV'
    //    } 
    //  ]
  })
  .catch(error => {
  });





app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
