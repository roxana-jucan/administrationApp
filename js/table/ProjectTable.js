function ProjectTable() {
	this.table = document.getElementById("projectsTable");
	this.collection = [];
	this.tableName = "projectsTable";
	this.lastRowId = "addNewProjectRow";
	
	this.addRowToTable = function(project){
		$table = $("#projectsTable tbody");
		$row = $('<tr/>');
		$row.append("<td>"+project.id+"</td>");
		$row.append("<td>"+project.name+"</td>");
		
		var client = findObjectById(clientsTable.collection, project.client_id);
		if (client !== null) {
			$row.append("<td>" + client.id + " " + client.name + "</td>");
		} else {
			$row.append("<td/>");
		}
			
		$row.append("<td/>");
		$row.append("<td><span onclick=\"" + this.tableName + ".removeRow(" + project.id + ")\">" + DELETE + "</span></td>");
		
		$table.append($row);
	};
	
	this.addEditRowToTable = function(){
		$("#addNewProjectRow").remove();
		
		var selectClient = generateSelect(clientsTable.collection, "client_id");
		if (selectClient !== undefined) {
			selectClient.selectedIndex = 0;
			
			$table = $("#projectsTable tbody");
			$row = $('<tr/>');
			$row.append("<td/>");
			$row.append("<input id=\"projectName\" type=\"text\" />");
			$col = $('<td/>');
			$col.append(selectClient);
			$row.append($col);
			$row.append("<td><span onclick=\"" + this.tableName + ".save()\">" + SAVE + "</span></td>");
			$row.append("<td><span onclick=\"" + this.tableName + ".render();\">" + CANCEL + "</span></td>");
			
			$table.append($row);
		}
	};
	
	this.save = function(){
		if ($("#projectName").val().trim() !== ""){
			var project = new Project($("#projectName").val(), $("#client_id").val());
			this.collection[this.collection.length] = project;
			$("#errorBox").append("");
		} else {
			$("#errorBox").append("Please enter valid non empty values");
		}
		
		this.storeDataToLocalStorage();
		this.render();
		projectsTable.render();
	};

	this.storeDataToLocalStorage = function(){
		localStorage.setItem("projectCollection", JSON.stringify(this.collection));
	}
}        
ProjectTable.prototype = new Table();
ProjectTable.prototype.canElementBeRemoved = function(projectId) {
	var i, j;
	for (i = 0; i < employeesTable.collection.length; i++) {
		if (employeesTable.collection[i].projects !== undefined) {
			for (j = 0; j < employeesTable.collection[i].projects.length; j++) {
				if (employeesTable.collection[i].projects[j] == projectId) {
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