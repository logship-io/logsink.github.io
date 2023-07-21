//import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const INFLOW_URL = 'https://backend.logship.io';
const INFLOW_ACCOUNT = '00000000-0000-0000-0000-000000000000';
const uuid = function(){
    return Array
     .from(Array(16))
     .map(e => Math.floor(Math.random() * 255)
     .toString(16)
     .padStart(2,"0"))
     .join('')
     .match(/.{1,4}/g)
     .join('-')
};
const logMetric = (name, value, ...tags) => {
    const url = INFLOW_URL + '/inflow/' + INFLOW_ACCOUNT;
    const schema = 'logship.public.' + name;
    let now = new Date();

    let data = new Map();
    data.set('value', value);
    tags.forEach(tag => {
        data.set(tag.key, tag.value);
    });
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body : JSON.stringify([
            {
                schema: schema,
                timestamp: now.toISOString(),
                data: Object.fromEntries(data)
            }
        ])
    })
    .then(response => {
        if (!response.ok) {
            logger.error('Failed to log metric', response);
        }
    });
}

var firstVisit = true;
var visitContext = uuid();
var geolocation = {
    latitude: 0,
    longitude: 0,
};

export default (function () {

    const logPageVisit = (function(name, path) {
        logMetric(name, 1, 
            {
                key: 'context',
                value: visitContext
            },
            {
                key: 'path',
                value: path
            },
            {
                key: 'latitude',
                value: geolocation.latitude
            },
            {
                key: 'longitude',
                value: geolocation.longitude
            },
            {
                key: 'useragent',
                value: navigator.userAgent
            },
            {
                key: 'language',
                value: navigator.language
            });
    });

    return {
      onRouteUpdate({location}) {
        if (firstVisit) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    geolocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    logPageVisit("page.visit", location.pathname);
                  }, function() {
                    console.log("Couldn't get user location");
                });
            }
            firstVisit = false;
        }

        logPageVisit("page.visit", location.pathname);
      },
    };
  })();