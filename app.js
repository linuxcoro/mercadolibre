var path = require('path'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    express = require('express'),
    AmazonListScraper = require('amazon-list-scraper').default,
    fetch = require('node-fetch')
    
var app = express()
    app.engine('dust', cons.dust)
    app.set('view engine', 'dust')
    app.set('views', __dirname + '/views')
    app.use(express.static(path.join(__dirname,'public')))

function fetchJSON(url) {
    return fetch(url).then(response => response.json())
}

app.get('/json', function(req, res) {
    const scraper = new AmazonListScraper()
    scraper.scrape('https://www.amazon.com/registry/wishlist/1A7GB9IL1UAK2/')
      .then(items => {
        res.json({ 'lista': items });
      })
      .catch(error => {
      });    
});

class Salida {
    constructor(val){
        this.val=val
    }
    buscar(){
        var val=this.val
        var coco=[]
        var ent =[]
        val.forEach(function(x,i) {
            var v = Number(val[i].data.profile.trade_count.replace("+",""))
            var c = Number(val[i].data.profile.feedback_score) 
            if(v >= 500 && c == 100 && v != null){
                ent[i] = parseInt(val[i].data.temp_price)
                coco[i]={
                    precio : Number(val[i].data.temp_price),
                    entero: ent,
                    ventas : v,
                    confianza : c                        
                }        
            }                
        });
        return this.filtrar(ent,coco)
    }

    filtrar(ent,coco){
        var filtro1=[]
        var filtro2=[]
    
        filtro1 = ent.filter(function(e) {
            return e === 0 ? '0' : e
        })
        filtro2 = coco.filter(function(e) {
            return e === 0 ? '0' : e
        })
        var indice = Math.min.apply(null,filtro1)
        var ix = filtro1.indexOf(indice)
        return filtro2[ix].precio
    }
} 

app.get('/', function(req, res){
    let urls = [
        'https://localbitcoins.com/buy-bitcoins-online/USD/.json',
        'https://localbitcoins.com/buy-bitcoins-online/VES/.json',
        'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?q={"status":"1"}&apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
    ];
    let promises = urls.map(url => fetchJSON(url));
    Promise.all(promises).then((responses) => {
        var ruta1 = responses[0].data.ad_list
        var ruta2 = responses[1].data.ad_list
        var ruta3 = responses[2]
        var obj1 = new Salida(ruta1)
        var dolar = obj1.buscar()
        var obj2 = new Salida(ruta2)
        var bolivar = obj2.buscar()
        var convertir = (1/dolar)*bolivar
        res.render('index', {'json': ruta3 , 'gitf': convertir })

        dust.helpers.ima = function (chunk, context, bodies, params) {
            var x = dust.helpers.tap(params.x, chunk, context),
            xx = 'https://linuxcoro.herokuapp.com/img/'+x.split('/')[4]+'.jpg'
            return xx
        }

        dust.helpers.sum = function (chunk, context, bodies, params) {
            var x = dust.helpers.tap(params.x, chunk, context)
            var y = dust.helpers.tap(params.y, chunk, context)
            sum=(x*y)
            return parseInt(sum)
        }
    })
})

app.listen(process.env.PORT || 8080);
if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:8080')
}