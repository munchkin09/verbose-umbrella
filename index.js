
const publicIp = require('public-ip');
const fs = require('fs');
const rpn = require('request-promise-native')
const domains = require('./my_zone_identifier.json') 
const headers = require('./headers')
var myJson = {
    ip: ''
};






function doWork() {
    const json = require('./ip.json');
    console.log('doWork empieza!' + json.ip)
    publicIp.v4()
    .then(ip => {
        if(ip === domains[0].content) return 0
        domains.map((element) => {
            var options = {
                url: 'https://api.cloudflare.com/client/v4/zones/968a8c0efcb81e720783a14683cc3d2c/dns_records/' + element.id,
                headers: headers,
                body: {
                    'type':'A',
                    'name':element.name,
                    'content':ip,
                    'ttl':120,
                    'proxied':element.name == 'ssh.carloscacharreo.xyz' || element.name == 'chat.carloscacharreo.xyz' ? false : true }
              };    
            console.log(JSON.stringify(options,null,2))
            rpn.put(options)
            .then(function (htmlString) {
                 response =  JSON.parse(htmlString)
                 console.log(htmlString);
                 

            })
            .catch(function (err) {
                // Crawling failed...
            });
        })
        


    })
}

function yourCallback(err, data) {
    if(err) process.exit(0)
    setInterval(doWork,10000)
}

publicIp.v4({ http: true, timeout: 2000 }).then(ip => {
    console.log('1st publicIp =>' + ip)
    myJson.ip = ip;
    fs.writeFile( 'ip.json', JSON.stringify( myJson ), 'utf8', yourCallback );
});



