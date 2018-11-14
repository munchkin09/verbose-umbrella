
const publicIp = require('public-ip');
const fs = require('fs');
const rpn = require('request-promise-native')
const domains = ['carloscacharreo.xyz','api.carloscacharreo.xyz','chat.carloscacharreo.xyz','ssh.carloscacharreo.xyz',] 
var options = {
    url: 'https://api.cloudflare.com/client/v4/zones/968a8c0efcb81e720783a14683cc3d2c/dns_records',
    headers: require('./headers'),
    /*body: {
        'type':'A',
        'name':'',
        'content':'',
        'ttl':120,
        'proxied':false}*/
  };
var myJson = {
    ip: ''
};



rpn.get(options)
            .then(function (htmlString) {
                 response =  JSON.parse(htmlString)
                 console.log(htmlString);
            })
            .catch(function (err) {
                // Crawling failed...
                console.log(err);
                
            });


/*publicIp.v4({ http: true, timeout: 2000 }).then(ip => {
    console.log('1st publicIp =>' + ip)
    myJson.ip = ip;
    fs.writeFile( 'ip.json', JSON.stringify( myJson ), 'utf8', yourCallback );
});



function doWork() {
    const json = require('./ip.json');
    console.log('doWork empieza!' + json.ip)
    publicIp.v4()
    .then(ip => {
        if(ip === json.ip) return 0

        options.body.content = ip
        domains.map(() => {
            options.body.name

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
}*/



