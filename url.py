import requests
import pymongo
#req = 'http://localhost:8080'
#r = requests.get(req)
# if r.status_code == 200:
# 	decoded = r.json()
# 	for x in decoded:
# 		for n in xrange(0,len(decoded[x])):
# 			print '----------------------------------------------'
# 			print decoded[x][n]['hash']
# 			print decoded[x][n]['titulo']['t']
# 			print decoded[x][n]['precio']

# 			url = decoded[x][n]['imagen']
# 			filename = url.split('/')[-1]
# 			print filename
# 			r = requests.get(url, allow_redirects=True)
# 			open('public/img/'+filename, 'wb').write(r.content)
# 			print '----------------------------------------------'

SEED_DATA = [
    {
        'decade': '1970s',
        'artist': 'Debby Boone',
        'song': 'You Light Up My Life',
        'weeksAtOne': 10
    },
    {
        'decade': '1980s',
        'artist': 'Olivia Newton-John',
        'song': 'Physical',
        'weeksAtOne': 10
    },
    {
        'decade': '1990s',
        'artist': 'Mariah Carey',
        'song': 'One Sweet Day',
        'weeksAtOne': 16
    }
]

#uri = 'mongodb://user:pass@host:port/db'
#uri = 'mongodb://eidrogo:ne0Jahz2at@ds243798.mlab.com:43798/linuxcoro' 
uri = "mongodb://test:test123@ds243798.mlab.com:43798/linuxcoro"
#'mongodb://<dbuser>:<dbpassword>@ds243798.mlab.com:43798/linuxcoro'
client = pymongo.MongoClient(uri)

#db = client.get_default_database('linuxcoro')

# First we'll add a few songs. Nothing is required to create the songs 
# collection; it is created automatically when we insert.

#songs = db['usuarios']

# Note that the insert method can take either an array or a single dict.

#songs.insert_many(SEED_DATA)

db = client.get_database("linuxcoro")

songs = db.usuarios
songs.insert_one({"nombre" : "maria" , "apellido": "colina", "hijos": 1 })

