var Employee = function(firstname, lastname, gender, projects) {
	this.id = nextIndex(employeeCollection);
	this.firstname = firstname;
	this.lastname = lastname;
	this.gender = gender;
	this.projects = projects;
};
Employee.prototype.toString = function employeeToString() {
	return this.firstname + " " + this.lastname ;
};
Employee.fromJSON = function(json){
	//var obj = JSON.parse(json);
	var employee = new Employee(json.firstname, json.lastname, json.gender, json.projects);
	employee.id = json.id;
	return employee;
};