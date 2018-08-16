/* consultar la api */
let request = require('request')
let url='https://linuxcoro.herokuapp.com/'

request(url, function(error, r, html){
    let arr = JSON.parse(html)
    //console.log(html)
    if(r.statusCode==200){
        art=arr.lista
        for (let index = 0; index < art.length; index++) {
            const element = art[index];
            console.log(element.hash)
            console.log(element.titulo.t)
            console.log(element.titulo.detalle)
            console.log(element.precio)
            console.log(element.imagen)
            console.log('---------------------------------')
        }
    }
})


 /* insertar valores */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("linuxcoro");
  var myobj = { nombre: "Company", apellido: "Highway" };
  dbo.collection("usuarios").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});