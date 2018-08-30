import requests
import pymongo
req = 'http://localhost:8080'
r = requests.get(req)
 if r.status_code == 200:
 	decoded = r.json()
 	for x in decoded:
 		for n in xrange(0,len(decoded[x])):
 			print '----------------------------------------------'
 			print decoded[x][n]['hash']
 			print decoded[x][n]['titulo']['t']
 			print decoded[x][n]['precio']
#  			url = decoded[x][n]['imagen']
# 			filename = url.split('/')[-1]
# 			print filename
# 			r = requests.get(url, allow_redirects=True)
# 			open('public/img/'+filename, 'wb').write(r.content)
# 			print '----------------------------------------------'