const publicIp = require('public-ip');
const fs = require('fs');
const rpn = require('request-promise-native');
const headers = require('./headers');

function getDnsRecords() {
    return new Promise(function(resolve, reject) {
        var options = {
            url: 'https://api.cloudflare.com/client/v4/zones/'+ headers.zone_identifier +'/dns_records',
            headers: headers.header,
          };
        rpn.get(options)
        .then(function (jsonString) {
            const response = JSON.parse(jsonString)
             console.log(jsonString);

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
        console.log("my_zone_identifier.json guardado el día " + new Date().toLocaleDateString());
        process.exit(1)
    })
});

