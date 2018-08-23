/* consultar la api */
const cheerio = require('cheerio');
const request = require('request')
const requestPromise = require('request-promise');
const Promise = require('bluebird');

let url='https://linuxcoro.herokuapp.com/'

 /* insertar valores */
 var MongoClient = require('mongodb').MongoClient;
 var con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";

function detalle(str){
/* 
    Promise.map(urls, requestPromise) 
    .map((htmlOnePage, index) => {
      var det = undefined
      const $ = cheerio.load(htmlOnePage);
  
      // detalles
      $('#feature-bullets').find('.a-list-item').each(function(i,elem){
          if($(this).text().trim()!==undefined)
            det+=$(this).text().trim()
      })
      // imagenes        
      const img = $('#landingImage').attr('data-old-hires')
        return {det,img}
    })    
    .then(console.log)
    .catch((e) => console.log('We encountered an error' + e));

 */     
    let url=str.des
    let detalle
    let tod=[]
    
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            
            // detalles
            $('#feature-bullets').find('.a-list-item').each(function(i,elem){
                if($(this).text().trim()!==undefined)
                    detalle += $(this).text().trim()
            })
            // imagenes        
            let img = $('#landingImage').attr('data-old-hires')
            tod = {str,detalle,img}
            if(tod.detalle!=undefined){
                console.log("hash: "+tod.str.hash)
                console.log("titulo: "+tod.str.titulo)
                console.log("precio: "+tod.str.precio)
                console.log("detalle: "+tod.detalle)
                console.log("imagen: "+tod.img)
                
                
                MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("linuxcoro");
                    dbo.collection("articles").findOne({'hash':tod.str.hash}, function(err, result) {
                        if (err) { }                
                        if (!result) {
                            var myobj = {
                                hash: tod.str.hash,
                                titulo: tod.str.titulo,
                                detalle: tod.detalle,
                                precio: tod.str.precio,
                                imagen: tod.imagen
                            };
                            dbo.collection("articles").insertOne(myobj, function(err, res) {
                              if (err) throw err;
                              console.log("1 document inserted");
                              db.close();
                            });
                        }
                    }) 
                });
    




            }
        }
        

    })




}



request(url, function(error, r, html){
    let arr = JSON.parse(html)
    let det = []
    if(r.statusCode==200){
        art=arr.lista
        for (let index = 0; index < art.length; index++) {
            const element = art[index];
            det = "https://www.amazon.com/dp/"+element.titulo.detalle.split('/')[4]
 
            var myobj = {
                hash: element.hash,
                titulo: element.titulo.t,
                des: det,
                precio: element.precio
            };

            /* clave de los detalles */


                    /* 
            MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
                if (err) throw err;
                var dbo = db.db("linuxcoro");
                dbo.collection("articles").findOne({'hash':element.hash}, function(err, result) {
                    if (err) { }                
                    if (!result) {
                        var myobj = {
                            hash: element.hash,
                            titulo: element.titulo.t,
                            detalle: element.titulo.detalle,
                            precio: element.precio,
                            detalle: element.imagen
                        };
                        dbo.collection("articles").insertOne(myobj, function(err, res) {
                          if (err) throw err;
                          console.log("1 document inserted");
                          db.close();
                        });
                    }
                }) 
            });

 */                        
            detalle(myobj)

        }



        
    }
})


