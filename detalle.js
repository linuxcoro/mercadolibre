const requestPromise = require('request-promise');
const Promise = require('bluebird');
const cheerio = require('cheerio');

var urls = [
    "https://www.amazon.com/dp/B01AX6ZPHI",
    "https://www.amazon.com/dp/B01AX6ZSYI",
    "https://www.amazon.com/dp/B00KFFUWJE",
    "https://www.amazon.com/dp/B079PHXJ21",
    "https://www.amazon.com/dp/B07FM17J8S",
    "https://www.amazon.com/dp/B0035MHR60"
];

Promise.map(urls, requestPromise)
  .map((htmlOnePage, index) => {
    var det = ""
    const $ = cheerio.load(htmlOnePage);

    // detalles
    $('#feature-bullets').find('.a-list-item').each(function(i,elem){
        det+=$(this).text().trim()
    })
    // imagenes        
    const img = $('#landingImage').attr('data-old-hires')
    return {det,img};
  })
  .then(console.log)
  .catch((e) => console.log('We encountered an error' + e));


