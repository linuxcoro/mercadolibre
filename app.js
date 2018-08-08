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

            $('.a-fixed-left-grid .a-spacing-none').find('.a-size-base a').each(function(i, elem) {
                    tit[i] = $(this).text();
            });

            $('.a-fixed-left-grid .a-spacing-none').find('span .a-offscreen').each(function(i, elem) {
                pre[i] = $(this).text();
            });

            $('.a-fixed-left-grid .a-spacing-none').find('.g-itemImage img').each(function(i, elem) {
                img[i] = $(this).attr("src");
            });





            var kurs = { 'titulo': tit , 'precio': pre ,  'imagen': img }

            res.json({ 'imagen': kurs });
        }
    })
});



app.listen(process.env.PORT || 8080);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:8080');
}
