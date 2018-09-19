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
        'https://localbitcoins.com/buy-bitcoins-online/VES/.json',
        'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?q={"status":"1"}&apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
    ];
      
    let promises = urls.map(url => fetchJSON(url));      
    Promise.all(promises).then((responses) => {
        var ruta1 = responses[0].data.ad_list
        var coco=[]
        var filtro1=[]
        var filtro2=[]
        var ent =[]
        ruta1.forEach(function(x,i) {
            v = Number(ruta1[i].data.profile.trade_count.replace("+",""))
            c = Number(ruta1[i].data.profile.feedback_score) 
            if(v >= 500 && c == 100 && v != null){
                ent[i] = parseInt(ruta1[i].data.temp_price)
                coco[i]={
                    precio : Number(ruta1[i].data.temp_price),
                    entero: ent,
                    ventas : v,
                    confianza : c                        
                }        
            }                
        });
 
        filtro1 = ent.filter(function(e) {
            return e === 0 ? '0' : e
        })
        filtro2 = coco.filter(function(e) {
            return e === 0 ? '0' : e
        })
        indice = Math.min.apply(null,filtro1)

        ix = filtro1.indexOf(indice)

        var ruta2 = responses[1]

        res.render('index', {'json': ruta2 , 'gitf': filtro2[ix].precio })

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
