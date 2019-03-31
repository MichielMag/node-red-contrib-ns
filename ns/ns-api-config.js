module.exports = function(RED) {
    function NsApiConfig(config) {
        RED.nodes.createNode(this,config);
        this.api_key = this.credentials.api_key;
        this.name = config.name;
    }
    RED.nodes.registerType("ns-api-config",NsApiConfig,{
        credentials: {
            api_key: {type:"text"}
        }
    });
}