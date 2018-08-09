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
            var img = [];
            var tit = [];       
            var pre = [];
            var dif = 0;

            $('.a-fixed-left-grid .a-spacing-none').find('.a-size-base a').each(function(i, elem) {
                    var t = $(this).text();  
                    var d = 'https://www.amazon.com'+$(this).attr('href');
                    tit[i] = {t,d};
            });

            $('.a-fixed-left-grid .a-spacing-none').find('span .a-offscreen').each(function(i, elem) {
                pre[i] = $(this).text();
            });

            $('.a-fixed-left-grid .a-spacing-none').find('.g-itemImage img').each(function(i, elem) {
                img[i] = $(this).attr("src");
            });


            // en caso que exista diferencias
            if (tit.length != pre.length && tit.length != pre.length) {
                dif = 1;
            };
            var kurs = { 'titulo': tit , 'precio': pre ,  'imagen': img , 'diferencias': dif  }
        }
        res.json({ 'lista': kurs });
    })



});



app.listen(process.env.PORT || 8080);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:8080');
}
