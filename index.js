
const publicIp = require('public-ip');
const fs = require('fs');
const rpn = require('request-promise-native')
const domains = require('./my_zone_identifier.json') 
const headers = require('./headers')
var myJson = {
    ip: ''
};

function updateIpWorker() {
    console.log('doWork empieza!')
    publicIp.v4()
    .then(ip => {
        if(ip === domains[0].content) return 0
        const promises = domains.map((element) => {
          var options = {
            uri: `https://api.cloudflare.com/client/v4/zones/${headers.zone_identifier}/dns_records/${element.id}`,
            json : true,
            headers: headers.header,
            body: {
                'type':'A',
                'name':element.name,
                'content':ip,
                'ttl':120,
                'proxied':element.name == 'ssh.carloscacharreo.xyz' || element.name == 'chat.carloscacharreo.xyz' ? false : true }
            };    
            return rpn.put(options)
        })
        Promise.all(promises)
        .then(function(arrOfHtmlResponses) {
            require('./scriptGetDns')
            exit.process(1)
            return bool
        })
        .catch(function(err){
            console.log(err);
            return false
        })
    }).catch(err => {
        console.log(err)
        return false
    })
}

function firstIpFetched(err, data) {
    if(err) process.exit(0)
    setInterval(updateIpWorker,10000)
}

function getIp() {
    publicIp.v4({ http: true, timeout: 2000 }).then(ip => {
        console.log('1st publicIp =>' + ip)
        myJson.ip = ip;
        fs.writeFile( 'ip.json', JSON.stringify( myJson ), 'utf8', firstIpFetched );
    })
    .catch (err => {
        console.log(err)
        setTimeout(getIp,10000)
    });
}

getIp()



