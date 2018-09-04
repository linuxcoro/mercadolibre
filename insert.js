/* consultar la api */
var cheerio = require('cheerio')
var request = require('request')
var url='https://linuxcoro.herokuapp.com/json'

/* insertar valores */
var MongoClient = require('mongodb').MongoClient;
var con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";

/* halando datos url */
request(url, function(error, r, html){
    const arr = JSON.parse(html)
    var det = []
    if(r.statusCode==200){
        art=arr.lista
        for (var index = 0; index < art.length; index++) {
            var element = art[index];
            det = "https://www.amazon.com/dp/"+element.titulo.detalle.split('/')[4]
 
           //console.log(myobj)
           var myobj = {
                hash: element.hash,
                title: element.titulo.t,
                des: det,
                titulo: "",
                descripcion: "",
                precio: element.precio,
                imagen: "",
                status: ""
            }

            /* console.log(index+myobj.title) */  
            if(myobj.titulo!=undefined && myobj.img!=""){
                console.log('paso la condicion'+index)
                insertardb(myobj)
            }
        }
    }
})

/* buscar */
/* 
function obtener(valor){
    for(var i = 0; i < json.length; i++){
      if(json[i].value == valor)
        return json[i].label;
    }
}
 */
function insertardb(myobj){
    MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
        var dbo = db.db("linuxcoro");
        dbo.collection("articles").findOne({'hash':myobj.hash}, function(err, result) {
            if (!result) {
                dbo.collection("articles").insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                })
            }
            else{
                db.close();
                console.log('no')
            }
        }) 
    })
} 