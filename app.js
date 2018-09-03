var path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    request = require('request'),
    axios=require('axios'),
    cryptojs = require("crypto-js"),
    express = require('express'),
    cheerio = require('cheerio');
    
var app = express();
    app.engine('dust', cons.dust);
    app.set('view engine', 'dust');
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname,'public')));


app.get('/json', function(req, res) {
    url = 'https://www.amazon.com/registry/wishlist/1A7GB9IL1UAK2/';
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var img = [];
            var tit = [];
            var mystr = [];
            var pre = [];
            var todo = [];
            var dif = 0;

            $('.a-fixed-left-grid .a-spacing-none').find('.a-size-base a').each(function(i, elem) {
                var t = $(this).text();  
                var detalle = 'https://www.amazon.com'+$(this).attr('href');
                mystr[i] = cryptojs.SHA256(detalle).toString();
                tit[i] = {t,detalle};
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
        }

        for (var i = tit.length - 1; i >= 0; i--) {
            var hash = mystr[i]
            var titulo=tit[i]
            var precio=pre[i]
            var imagen=img[i]

            var kurs = {hash , titulo , precio , imagen}
            todo[i] = kurs
        };
        res.json({ 'lista': todo });
    })
});

app.get('/', function(req, res){
    var url2 = 'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
    var art=[]
    request(url2, function(error, r, html){
        const arr = JSON.parse(html)
        res.render('index', {'json': arr});
    })

	dust.helpers.ima = function (chunk, context, bodies, params) {
	    var x = dust.helpers.tap(params.x, chunk, context),
        xx = 'https://linuxcoro.herokuapp.com/img/'+x.split('/')[5];
	    return xx;
	};


});




app.listen(process.env.PORT || 8080);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:8080');
}
