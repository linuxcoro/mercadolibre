/* consultar la api */
let cheerio = require('cheerio');
let request = require('request')
let url='https://linuxcoro.herokuapp.com/'

 /* insertar valores */
 var MongoClient = require('mongodb').MongoClient;
 var con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";
 
 function descripcion(val){
    request(val, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html)                    
            
/*             $('#productTitle','.a-size-large').each(function(i, elem) { */
             $('#title','.a-size-large .a-spacing-none').each(function(i, elem) { 
                pre = $(this).text()
                console.log(pre)
            });
            


        }
    })

 }

request(url, function(error, r, html){
    let arr = JSON.parse(html)
    //console.log(html)
    if(r.statusCode==200){
        art=arr.lista
        for (let index = 0; index < art.length; index++) {
            const element = art[index];
            var myobj = {
                hash: element.hash,
                titulo: element.titulo.t,
                detalle: element.titulo.detalle,
                precio: element.precio,
                detalle: element.imagen
            };

            descripcion(element.titulo.detalle)



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
        }
    }
})


