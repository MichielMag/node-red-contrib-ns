var params = {"dateTime":"2019-03-30 22:19:00","uicCode":"8400169"};

const NS = require('node-ns-api');

var api = new NS.API("**REMOVED**");
api.getArrivals(params)
    .then((val) => {
        console.log(val);
    })
    .catch((err) => {
        console.error(err);
    })

    /*,
        "arrivals": "arrivals.js",
        "departures": "departures.js",
        "big departures": "big-departures.js",
        "disruption": "disruption.js",
        "disruptions": "disruptions.js",
        "trip": "trip.js",
        "trips": "trips.js"*/