import psycopg2

# import requests
# req = 'https://linuxcoro.herokuapp.com/'
# r = requests.get(req)
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


# export PGHOST=ec2-50-17-194-129.compute-1.amazonaws.com
# export PGDATABASE=ddjgevmsurduca
# export PGUSER=nkhkzwpxietfbc
# export PGPASSWORD=52140030c14ffbdd15a93968ba3e186a59acff91055d061798d7d86f7a9b21e9

#conn = psycopg2.connect(dbname=ENTER NAME OF DATABASE, user=ENTER USERNAME, password=ENTER PASSWORD, host=ENTER IP ADDRESS OF HOST, port=5432)


conn = psycopg2.connect("dbname=ddjgevmsurduca, user=nkhkzwpxietfbc, password=52140030c14ffbdd15a93968ba3e186a59acff91055d061798d7d86f7a9b21e9, host=ec2-50-17-194-129.compute-1.amazonaws.com, port=5432")
cur = conn.cursor()

cur.execute('INSERT INTO articulos (nombre,precio,imagen) VALUES("2 Pack - DIRECTV IR / RF Universal Remote Control (RC66RX)",9.64,"71lK+J4v9VL._SS135_.jpg")')

conn.commit()
cur.close()
conn.close()
