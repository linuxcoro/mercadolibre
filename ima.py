import requests
import sys
#print sys.argv[1]


req = 'https://api.mlab.com/api/1/databases/linuxcoro/collections/articles?q={"hash":"'+ sys.argv[1] +'"}&apiKey=DSgbEQwpXRchIpWtCLjgEH-h83rECC4i'
r = requests.get(req)
if r.status_code == 200:
	decoded = r.json()
	for n in range(0,len(decoded)):
		url = decoded[n]['imagen']
		nom = decoded[n]['des']
		if url != "":
			#filename = url.split('/')[-1]
			filename = nom.split('/')[4] + '.jpg'
			r = requests.get(url, allow_redirects=True)
			open('public/img/'+filename, 'wb').write(r.content)
			#print ('imagen guardada') #para pyhon3
			print 'imagen guardada' #para pyhon27
