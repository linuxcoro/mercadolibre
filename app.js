var path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    request = require('request'),
    axios=require('axios'),
    cryptojs = require("crypto-js"),
    express = require('express'),
    cheerio = require('cheerio'),
    AmazonListScraper = require('amazon-list-scraper').default,
    fetch = require('node-fetch');
    
var app = express();
    app.engine('dust', cons.dust);
    app.set('view engine', 'dust');
    app.set('views', __dirname + '/views');
    app.use(express.static(path.join(__dirname,'public')));


function fetchJSON(url) {
    return fetch(url).then(response => response.json());
}

app.get('/json', function(req, res) {

    const scraper = new AmazonListScraper();
    scraper.scrape('https://www.amazon.com/registry/wishlist/1A7GB9IL1UAK2/')
      .then(items => {
        //res.json(items);
        res.json({ 'lista': items });
      })
      .catch(error => {
      });    


});

app.get('/', function(req, res){
/* 
    se tomara las api para calcular el precio en bolivare de los articulos
    https://localbitcoins.com/sell-bitcoins-online/amazon-gift-card-code/.json
    https://localbitcoins.com/buy-bitcoins-online/amazon-gift-card-code/.json    
 */
    let urls = [
        'https://localbitcoins.com/sell-bitcoins-online/amazon-gift-card-code/.json',
        'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?q={"status":"1"}&apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
    ];
      
    let promises = urls.map(url => fetchJSON(url));      
    Promise.all(promises)
        .then((responses) => {
            var ruta1 = responses[0].data.ad_list
            var todo1=[]
            for (var i in ruta1)
                todo1[i] = Number(ruta1[i].data.temp_price)

            var result = todo1[0];
            todo1.forEach(function(x) {
                if (parseFloat(x) < result) result = x; // find smallest number as string instead
            });
            var s= responses[0].url


            var ruta2 = responses[1]
//            res.render('index', {'json': ruta2 , 'gift': typeof(result)});
            res.render('index', {'json': ruta2 , 'gitf': result })

            dust.helpers.ima = function (chunk, context, bodies, params) {
                var x = dust.helpers.tap(params.x, chunk, context),
                xx = 'https://linuxcoro.herokuapp.com/img/'+x.split('/')[4]+'.jpg';
                return xx;
            };
        

        });
});




app.listen(process.env.PORT || 8080);

if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:8080');
}
