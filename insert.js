/* consultar la api */
let request = require('request')
let url='https://linuxcoro.herokuapp.com/'

 /* insertar valores */
 var MongoClient = require('mongodb').MongoClient;
 var con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";
 

request(url, function(error, r, html){
    let arr = JSON.parse(html)
    //console.log(html)
    if(r.statusCode==200){
        art=arr.lista
        for (let index = 0; index < art.length; index++) {
            const element = art[index];
/*             console.log(element.hash)
            console.log(element.titulo.t)
            console.log(element.titulo.detalle)
            console.log(element.precio)
            console.log(element.imagen)
            console.log('---------------------------------')
 */


            MongoClient.connect(con, function(err, db) {
                if (err) throw err;
                var dbo = db.db("linuxcoro");
                var busca = dbo.collection("articles").find_one({'hash':element.hash})
                console.log(busca)
                
/* 
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

 */

            });
        }
    }
})


