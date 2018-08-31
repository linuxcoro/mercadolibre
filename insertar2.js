const cheerio = require('cheerio');
const request = require('request')

const translate = require('google-translate-api')
/* actualizar valores */
const MongoClient = require('mongodb').MongoClient;
const con = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";


var str=process.argv[2]
var hash=process.argv[3]

url="https://www.amazon.com/dp/"+str
request(url, function(error, response, html){
    var det
    if(!error){
        const $ = cheerio.load(html);
        // detalles
        $('#feature-bullets').find('.a-list-item').each(function(i,elem){
            if($(this).text().trim()!==undefined)
            det+=$(this).text().trim()+" "
        })
        // imagenes        
        const img = $('#landingImage').attr('data-old-hires')
        if(det!=undefined){
            spanish(hash,det,img)            
        }
     }
})

function spanish(hash,det,img){
    
    var transText = det.replace('undefined'," ");

//    var url2 = 'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
    var url2 = 'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?q={"hash":"'+ hash +'"}&apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
    var titulo
    request(url2, function(error, r, html){
        const arr = JSON.parse(html)
        titulo = arr[0].title
        spanish_title(titulo)
    })


    translate(transText, {to: 'es'}).then(res => {
        console.log(res.text);
        MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
            var dbo = db.db("linuxcoro");
            var myquery = { hash: hash };
            var newvalues = { $set: {descripcion: res.text , imagen : img } };                            
            dbo.collection("articles").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("insert descripcion");
                db.close();
            });
        });
        //=> I speak English
    }).catch(err => {
        console.error(err);
    });


}


function spanish_title(titulo){
    translate(titulo, {to: 'es'}).then(res => {
        console.log(res.text);
        MongoClient.connect(con,{ useNewUrlParser: true }, function(err, db) {
            var dbo = db.db("linuxcoro");
            var myquery = { hash: hash };
            var newvalues = { $set: { titulo: res.text } };                            
            dbo.collection("articles").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("insert titulo");
                db.close();
            });
        });
        //=> I speak English
    }).catch(err => {
        console.error(err);
    });
}
