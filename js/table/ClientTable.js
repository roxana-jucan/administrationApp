function ClientTable() {
	this.table = document.getElementById("clientsTable");
	this.collection = [];
	this.tableName = "clientsTable";
	this.lastRowId = "addNewClientRow";
	
	this.addRowToTable = function(client){
		var row = this.table.tBodies[0].insertRow();
		var cellId = row.insertCell(0);
		var cellName = row.insertCell(1);
		var cellCountry = row.insertCell(2);
		var cellEditOrSave = row.insertCell(3);
		var cellDelete= row.insertCell(4);
		
		cellId.innerHTML = client.id;
		cellName.innerHTML = client.name;
		cellCountry.innerHTML = countryMap[client.country];
		cellEditOrSave.innerHTML = "";
		cellDelete.innerHTML = "<span onclick=\"" + this.tableName + ".removeRow(" + client.id + ")\">" + DELETE + "</span>";
	};
	
	this.addEditRowToTable = function(){
		var numberOfRowsInTable = this.table.tBodies[0].getElementsByTagName('tr').length;
		if (numberOfRowsInTable > 0){
			this.table.tBodies[0].deleteRow(numberOfRowsInTable - 1);
		}
		
		var row = this.table.tBodies[0].insertRow();
		var cellId = row.insertCell(0);
		var cellName = row.insertCell(1);
		var cellCountry = row.insertCell(2);
		var cellEditOrSave = row.insertCell(3);
		var cellDelete= row.insertCell(4);
		
		cellId.innerHTML = "";
		cellName.innerHTML = "<input id=\"clientName\" type=\"text\" />";
		var selectCountry = generateSelectByMap(countryMap, "country");
		selectCountry.selectedIndex = 0;
		cellCountry.appendChild(selectCountry);
		cellEditOrSave.innerHTML = "<span onclick=\"" + this.tableName + ".save()\">" + SAVE + "</span>";
		cellDelete.innerHTML = "<span onclick=\"" + this.tableName + ".render();\">" + CANCEL + "</span>";
	};
	
	this.save = function(){
		if (document.getElementById("clientName").value.trim() !== ""){
			var client = new Client(document.getElementById("clientName").value, document.getElementById("country").value);
			this.collection[this.collection.length] = client;
			document.getElementById("errorBox").innerHTML = "";
		} else {
			document.getElementById("errorBox").innerHTML = "Please enter valid non empty values";
		}
		
		this.storeDataToLocalStorage();
		this.render();
		projectsTable.render();
	};
	
	this.storeDataToLocalStorage = function(){
		localStorage.setItem("clientCollection", JSON.stringify(this.collection));
	}
}   
ClientTable.prototype = new Table();
ClientTable.prototype.canElementBeRemoved = function(clientId) {
	var i;
	for (i = 0; i < projectsTable.collection.length; i++) {
		if (projectsTable.collection[i].client_id == clientId) {
			return false;
		}
	}
	
	return true;
};
ClientTable.prototype.renderDependencies = function() {
	projectsTable.render();
}