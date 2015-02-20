var Project = function(name, client_id) {
	this.id = nextIndex(projectCollection);
	this.name = name;
	this.client_id = client_id;
};
Project.prototype.toString = function projectToString() {
	return findObjectById(clientCollection, this.client_id) + " : " + this.id + " " + this.name;
};
Project.fromJSON = function(json){
	//var obj = JSON.parse(json);
	var project = new Project(json.name, json.client_id);
	project.id = json.id;
	return project;
};
