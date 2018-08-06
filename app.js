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
/*
	let axios = require('axios');
	let cheerio = require('cheerio');

	let base_url = 'http://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';

	axios.get(base_url).then( (response) => {
	  let $ = cheerio.load(response.data);
	  let kurs = [];
	  $('tr', '.text-right').each( (i, elm) => {
	    kurs.push( {
	      currency: $(elm).children().first().text(),
	      erate: {
	        sell: $(elm).children().eq(1).first().text(),
	        buy: $(elm).children().eq(2).first().text()
	      },
	      tt: {
	        sell: $(elm).children().eq(3).first().text(),
	        buy: $(elm).children().eq(4).first().text()
	      },
	      notes: {
	        sell: $(elm).children().eq(5).first().text(),
	        buy: $(elm).children().eq(6).first().text()
	      }
	    });
	  });
	  return(kurs);
	})
	.then ( (kurs) => {
	  res.json(kurs);
	});
*/

/*	let axios = require('axios');
	let cheerio = require('cheerio');

	let base_url = 'http://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator';

	axios.get(base_url).then( (response) => {
	  let $ = cheerio.load(response.data);
	  let kurs = [];
	  $('tr', '.text-right').each( (i, elm) => {
	    kurs.push( {
	      imagen: $('.div.g-itemImage').attr("src");
	    });
	  });
	  return(kurs);
	})
	.then ( (kurs) => {
	  res.json(kurs);
	});
*/

var  DilbertURL = 'https://www.amazon.com/gp/registry/wishlist/1A7GB9IL1UAK2';

request(DilbertURL, function (error, response, body) {
    var $ = cheerio.load(body);


    $('div.g-itemImage').each(function(i, element){
	    kurs.push( {
	      //imagen: $('.div.g-itemImage').attr("src");
	      imagen: $().attr("src");
	    });
    })
	.then ((kurs) => {
	  res.json(kurs);
	});
    ;

});



});




app.listen(process.env.PORT || 5000);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:5000');
}
