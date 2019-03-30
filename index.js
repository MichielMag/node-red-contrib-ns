var params = {"dateTime":"2019-03-30 22:19:00","uicCode":"8400169"};

const NS = require('node-ns-api');

var api = new NS.API("7c6f49b181eb487cae63f0379e07db58");
api.getArrivals(params)
    .then((val) => {
        console.log(val);
    })
    .catch((err) => {
        console.error(err);
    })