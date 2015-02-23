function EmployeeTable() {
	this.table = document.getElementById("employeesTable");
	this.collection = [];
	this.tableName = "employeesTable";
	this.lastRowId = "addNewProjectRow";
	
	this.addRowToTable = function(employee){
		var row = this.table.tBodies[0].insertRow();
		var cellId = row.insertCell(0);
		var cellFirstName = row.insertCell(1);
		var cellLastName = row.insertCell(2);
		var cellGender = row.insertCell(3);
		var cellProjects = row.insertCell(4);
		var cellEditOrSave = row.insertCell(5);
		var cellDelete= row.insertCell(6);
		
		cellId.innerHTML = employee.id;
		cellFirstName.innerHTML = employee.firstname;
		cellLastName.innerHTML = employee.lastname;
		cellGender.innerHTML = genderMap[employee.gender];
		
		var htmlContent= ""
		if (employee.projects !== undefined) {
			for (var i = 0; i < employee.projects.length; i++){
				var project = findObjectById(projectsTable.collection, employee.projects[i])
				htmlContent += project;
				htmlContent += "<br />"
			}
		}
	
		cellProjects.innerHTML = htmlContent;
		
		cellEditOrSave.innerHTML = "";
		cellDelete.innerHTML = "<span onclick=\"" + this.tableName + ".removeRow(" + employee.id + ")\">" + DELETE + "</span>";
	};
	
	this.addEditRowToTable = function(){
		var selectProjects = generateSelect(projectsTable.collection, "projects", true);	
		if (selectProjects !== undefined) {
			var numberOfRowsInTable = this.table.tBodies[0].getElementsByTagName('tr').length;
			if (numberOfRowsInTable > 0){
				this.table.tBodies[0].deleteRow(numberOfRowsInTable - 1);
			}
		
			var row = this.table.tBodies[0].insertRow();
			var cellId = row.insertCell(0);
			var cellFirstName = row.insertCell(1);
			var cellLastName = row.insertCell(2);
			var cellGender = row.insertCell(3);
			var cellProjects = row.insertCell(4);
			var cellEditOrSave = row.insertCell(5);
			var cellDelete= row.insertCell(6);
			
			cellId.innerHTML = "";
			cellFirstName.innerHTML = "<input id=\"employeeFirstName\" type=\"text\" />";
			cellLastName.innerHTML = "<input id=\"employeeLastName\" type=\"text\" />";
			
			var selectGender = generateSelectByMap(genderMap, "gender");
			selectGender.selectedIndex = 0;
			cellGender.appendChild(selectGender);
			
			selectProjects.selectedIndex = 0;
			cellProjects.appendChild(selectProjects);
		
			cellEditOrSave.innerHTML = "<span onclick=\"" + this.tableName + ".save()\">" + SAVE + "</span>";
			cellDelete.innerHTML = "<span onclick=\"" + this.tableName + ".render();\">" + CANCEL + "</span>";	
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
		