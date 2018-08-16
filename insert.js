var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro";
// mongodb://<dbuser>:<dbpassword>@ds243798.mlab.com:43798/linuxcoro
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