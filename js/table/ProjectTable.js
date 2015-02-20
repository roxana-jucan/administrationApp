function ProjectTable() {
	this.table = document.getElementById("projectsTable");
	this.collection = projectCollection;
	this.tableName = "projectsTable";
	this.lastRowId = "addNewProjectRow";
	
	this.addRowToTable = function(project){
		var row = this.table.tBodies[0].insertRow();
		var cellId = row.insertCell(0);
		var cellName = row.insertCell(1);
		var cellClient = row.insertCell(2);
		var cellEditOrSave = row.insertCell(3);
		var cellDelete= row.insertCell(4);
		
		cellId.innerHTML = project.id;
		cellName.innerHTML = project.name;
		var client = findObjectById(clientCollection, project.client_id);
		if (client !== null) {
			cellClient.innerHTML = client.id + " " + client.name;
		}
		cellEditOrSave.innerHTML = "";
		cellDelete.innerHTML = "<span onclick=\"" + this.tableName + ".removeRow(" + project.id + ")\">" + DELETE + "</span>";
	};
	
	this.addEditRowToTable = function(){
		var selectClient = generateSelect(clientCollection, "client_id");
		if (selectClient !== undefined) {
			var numberOfRowsInTable = this.table.tBodies[0].getElementsByTagName('tr').length;
			if (numberOfRowsInTable > 0){
				this.table.tBodies[0].deleteRow(numberOfRowsInTable - 1);
			}
			
			var row = this.table.tBodies[0].insertRow();
			var cellId = row.insertCell(0);
			var cellName = row.insertCell(1);
			var cellClient = row.insertCell(2);
			var cellEditOrSave = row.insertCell(3);
			var cellDelete= row.insertCell(4);
			
			cellId.innerHTML = "";
			cellName.innerHTML = "<input id=\"projectName\" type=\"text\" />";
			
			selectClient.selectedIndex = 0;
			cellClient.appendChild(selectClient);
			cellEditOrSave.innerHTML = "<span onclick=\"" + this.tableName + ".save()\">" + SAVE + "</span>";
			cellDelete.innerHTML = "<span onclick=\"" + this.tableName + ".render();\">" + CANCEL + "</span>";	
		}
	};
	
	this.save = function(){
		if (document.getElementById("projectName").value.trim() !== ""){
			var project = new Project(document.getElementById("projectName").value, document.getElementById("client_id").value);
			this.collection[this.collection.length] = project;
			document.getElementById("errorBox").innerHTML = "";
		} else {
			document.getElementById("errorBox").innerHTML = "Please enter valid non empty values";
		}			
		this.render();
		employeesTable.render();
		
		localStorage.setItem("projectCollection", JSON.stringify(this.collection));
	};
}        
ProjectTable.prototype = new Table();
ProjectTable.prototype.canElementBeRemoved = function(projectId) {
	var i, j;
	for (i = 0; i < employeeCollection.length; i++) {
		if (employeeCollection[i].projects !== undefined) {
			for (j = 0; j < employeeCollection[i].projects.length; j++) {
				if (employeeCollection[i].projects[j] == projectId) {
					return false;
				}
			}
		}
	}
	
	return true;
};
ProjectTable.prototype.renderDependencies = function() {
	employeesTable.render();
}