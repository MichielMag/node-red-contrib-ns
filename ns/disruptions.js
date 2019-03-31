const NS = require('node-ns-api');

module.exports = function(RED) {
    function NsApiDisruptions(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        // Retrieve the config node
        this.api_key = RED.nodes.getNode(config.api_key);
        this.config = config;

        if (this.api_key) {
            this.api_key = this.api_key.api_key;
            this.api = new NS.API(this.api_key);
        } else {
            this.status({fill:"red",shape:"ring",text:"no api key set"});
        }

        this.makeParameters = function(config, payload) 
        {
            var parameters = {
                disruption_type: null,
                type: null,
                actual: null,
                lang: null,
            };

            // Find all parameter keys in the config and payload
            for(let key in parameters)
            {
                // First try config
                if (config !== undefined && config[key] !== null && config[key] !== undefined)
                {
                    parameters[key] = config[key];
                }
                // Then overwrite with payload.
                if (payload !== undefined && payload[key] !== null && payload[key] !== undefined)
                {
                    parameters[key] = payload[key];
                }

                if (typeof(parameters[key]) === 'string' && parameters[key].length === 0)
                {
                    parameters[key] = null;
                }
            }

            parameters.type = parameters.disruption_type;

            return parameters;
        };


        node.on('input', function(msg) {
            if (this.api === undefined || this.api === null)
            {
                return;
            }

            var parameters = this.makeParameters(this.config, msg.payload);

            try {
                this.api.getDisruptions(parameters)
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
    RED.nodes.registerType("disruptions",NsApiDisruptions);
}
