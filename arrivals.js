const NS = require('node-ns-api');

module.exports = function(RED) {
    function NsApiArrivals(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        // Retrieve the config node
        this.api_key = RED.nodes.getNode(config.api_key);

        if (this.api_key) {
            this.api_key = this.api_key.api_key;
            this.api = new NS.API(this.api_key);
        } else {
            this.status({fill:"red",shape:"ring",text:"no api key set"});
        }


        node.on('input', function(msg) {
            if (this.api === undefined || this.api === null)
            {
                return;
            }

            node.send(msg);

            var parameters = msg.payload;

            try {
            this.api.getArrivals(parameters)
                .then((result) => {
                    msg.payload = result;
                    node.send(msg);
                })
                .catch((err) => {
                    node.error(err);
                })
            }
            catch(ex) {
                node.error(err);
            }
        });
    }
    RED.nodes.registerType("arrivals",NsApiArrivals);
}
