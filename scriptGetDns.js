const publicIp = require('public-ip');
const fs = require('fs');
const rpn = require('request-promise-native')

function getDnsRecords() {
    return new Promise(function(resolve, reject) {
        var options = {
            url: 'https://api.cloudflare.com/client/v4/zones/968a8c0efcb81e720783a14683cc3d2c/dns_records',
            headers: require('./headers'),
          };
        rpn.get(options)
        .then(function (htmlString) {
             response =  JSON.parse(htmlString)
             
             
             const domains = response.result.filter((elem) => {
                return elem.type === 'A'
             })
             console.log(JSON.stringify(domains,null,2));
             resolve(domains)
        })
        .catch(function (err) {
            // Crawling failed...
            console.log(err);
            reject(err);
        });
    })
    
}

getDnsRecords()
.then((domains) => {
    fs.writeFile('my_zone_identifier.json',JSON.stringify(domains), {} ,(err) => {
        if(err) console.log(err); process.exit(-2)
        process.exit(1)
    })
});

