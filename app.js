const path = require('path'),
      cons = require('consolidate'),
      dust = require('dustjs-helpers'),
      express = require('express'),
      AmazonListScraper = require('amazon-list-scraper').default,
      fetch = require('node-fetch')
    
const app = express()
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
        let val=this.val
        let coco=[]
        let ent =[]
        val.forEach(function(x,i) {
            let v = Number(val[i].data.profile.trade_count.replace("+",""))
            let c = Number(val[i].data.profile.feedback_score) 
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
        let filtro1=[]
        let filtro2=[]
    
        filtro1 = ent.filter(function(e) {
            return e === 0 ? '0' : e
        })
        filtro2 = coco.filter(function(e) {
            return e === 0 ? '0' : e
        })
        let indice = Math.min.apply(null,filtro1)
        let ix = filtro1.indexOf(indice)
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
        let ruta1 = responses[0].data.ad_list
        let ruta2 = responses[1].data.ad_list
        let ruta3 = responses[2]
        let obj1 = new Salida(ruta1)
        let dolar = obj1.buscar()
        let obj2 = new Salida(ruta2)
        let bolivar = obj2.buscar()
        let convertir = (1/dolar)*bolivar
        res.render('index', {'json': ruta3 , 'gitf': convertir })

        dust.helpers.ima = function (chunk, context, bodies, params) {
            let x = dust.helpers.tap(params.x, chunk, context),
            xx = 'https://linuxcoro.herokuapp.com/img/'+x.split('/')[4]+'.jpg'
            return xx
        }

        dust.helpers.sum = function (chunk, context, bodies, params) {
            let x = dust.helpers.tap(params.x, chunk, context)
            let y = dust.helpers.tap(params.y, chunk, context)
            sum=(x*y)
            return parseInt(sum)
        }
    })
})

app.listen(process.env.PORT || 8080);
if (process.env.PORT === undefined) {
  console.log('Running at: http://localhost:8080')
}