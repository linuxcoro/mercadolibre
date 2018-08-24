/* consultar la api */
const cheerio = require('cheerio')
const request = require('request')
const url='https://linuxcoro.herokuapp.com/'

/* insertar valores */
const MongoClient = require('mongodb').MongoClient;
const con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";

function detalle(str){
    var url=str.des
    var detalle
    var tod=[]
    
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            
            // detalles
            $('#feature-bullets').find('.a-list-item').each(function(i,elem){
                if($(this).text().trim()!==undefined)
                    detalle += $(this).text().trim()
            })
            // imagenes        
            var img = $('#landingImage').attr('data-old-hires')
            tod = {str,detalle,img}
            if(tod.detalle!=undefined && tod.img!=""){
                //MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
                MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
                    var dbo = db.db("linuxcoro");
                    dbo.collection("articles").findOne({'hash':tod.str.hash}, function(err, result) {
                        if (!result) {
                            var myobj = {
                                hash: tod.str.hash,
                                titulo_ingles: tod.str.titulo,
                                detalle_ingles: tod.detalle.substr(9),
                                titulo_esp: "",
                                detalle_esp: "",
                                precio: tod.str.precio.substr(1),
                                imagen: tod.img
                            };
                            dbo.collection("articles").insertOne(myobj, function(err, res) {
                              if (err) throw err;
                              console.log("1 document inserted");
                              db.close();
                            });
                        }
                        else{
                            db.close();
                            console.log('no')
                        }
                    }) 
                });
            }
        }
    })
}




request(url, function(error, r, html){
    const arr = JSON.parse(html)
    var det = []
    if(r.statusCode==200){
        art=arr.lista
        for (let index = 0; index < art.length; index++) {
            var element = art[index];
            det = "https://www.amazon.com/dp/"+element.titulo.detalle.split('/')[4]
 
            var myobj = {
                hash: element.hash,
                titulo: element.titulo.t,
                des: det,
                precio: element.precio
            };
            detalle(myobj)
        }
    }
})


