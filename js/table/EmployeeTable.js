function EmployeeTable() {
	this.table = document.getElementById("employeesTable");
	this.collection = [];
	this.tableName = "employeesTable";
	this.lastRowId = "addNewEmployeeRow";
	
	this.addRowToTable = function(employee){
		$table = $("#employeesTable tbody");
		$row = $('<tr/>');
		$row.append("<td>"+employee.id+"</td>");
		$row.append("<td>"+employee.firstname+"</td>");
		$row.append("<td>"+employee.lastname+"</td>");
		$row.append("<td>"+genderMap[employee.gender]+"</td>");
		$col = $('<td/>');

		if (employee.projects !== undefined) {
			for (var i = 0; i < employee.projects.length; i++){
				var project = findObjectById(projectsTable.collection, employee.projects[i])
				$col.append(project.toString());
				$col.append("<br />");
			}
		}
		$row.append($col);
		$row.append("</td>");
		$row.append("<td/>");
		$row.append("<td><span onclick=\"" + this.tableName + ".removeRow(" + employee.id + ")\">" + DELETE + "</span></td>");
		
		$table.append($row);
	};
	
	this.addEditRowToTable = function(){
		$("#addNewEmployeeRow").remove();
		
		var selectProjects = generateSelect(projectsTable.collection, "projects", true);	
		if (selectProjects !== undefined) {
			selectProjects.selectedIndex = 0;
		
			$table = $("#employeesTable tbody");
			$row = $('<tr/>');
			$row.append("<td/>");
			$row.append("<td><input id=\"employeeFirstName\" type=\"text\" /></td>");
			$row.append("<td><input id=\"employeeLastName\" type=\"text\" /></td>");
			
			var selectGender = generateSelectByMap(genderMap, "gender");
			selectGender.selectedIndex = 0;
			$colGender = $('<td/>');
			$colGender.append(selectGender);
			$row.append($colGender);
			
			$colProject = $('<td/>');
			$colProject.append(selectProjects);
			$row.append($colProject);
			$row.append("<td><span onclick=\"" + this.tableName + ".save()\">" + SAVE + "</span></td>");
			$row.append("<td><span onclick=\"" + this.tableName + ".render();\">" + CANCEL + "</span></td>");
		
			$table.append($row);
		}
	};
	
	this.save = function(){
		if (document.getElementById("employeeFirstName").value.trim() !== "" && document.getElementById("employeeLastName").value.trim() !== ""){
			var employee = new Employee(document.getElementById("employeeFirstName").value, document.getElementById("employeeLastName").value, document.getElementById("gender").value, getSelectedValues("projects"));
			this.collection[this.collection.length] = employee;
			document.getElementById("errorBox").innerHTML = "";
		} else {
			document.getElementById("errorBox").innerHTML = "Please enter valid non empty values";
		}	
		
		this.storeDataToLocalStorage();
		this.render();
	};
	
	this.storeDataToLocalStorage = function(){
		localStorage.setItem("employeeCollection", JSON.stringify(this.collection));
	}
}        
EmployeeTable.prototype = new Table();
		