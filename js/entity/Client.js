var Client = function(name, country) {
	this.id = nextIndex(clientsTable.collection);
	this.name = name;
	this.country = country;
};
Client.prototype.toString = function clientToString() {
	return this.id + " " + this.name;
};
Client.fromJSON = function(json){
	//var obj = JSON.parse(json);
	var client = new Client (json.name, json.country);
	client.id = json.id;
	return client;
};