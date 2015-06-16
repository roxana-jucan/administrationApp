function ClientTable() {
	this.table = document.getElementById("clientsTable");
	this.collection = [];
	this.tableName = "clientsTable";
	this.lastRowId = "addNewClientRow";
	
	this.addRowToTable = function(client){
		$table = $("#clientsTable tbody");
		$row = $('<tr/>');
		$row.append("<td>"+client.id+"</td>");
		$row.append("<td>"+client.name+"</td>");
		$row.append("<td>"+countryMap[client.country]+"</td>");
		$row.append("<td/>");
		$row.append("<td><span onclick=\"" + this.tableName + ".removeRow(" + client.id + ")\">" + DELETE + "</span></td>");
		
		$table.append($row);
	};
	
	this.addEditRowToTable = function(){
		$("#addNewClientRow").remove();
		
		var selectCountry = generateSelectByMap(countryMap, "country");
		selectCountry.selectedIndex = 0;
		
		$table = $("#clientsTable tbody");
		$row = $('<tr/>');
		$row.append("<td/>");
		$row.append("<input id=\"clientName\" type=\"text\" />");
		$col = $('<td/>');
		$col.append(selectCountry);
		$row.append($col);
		$row.append("<td><span onclick=\"" + this.tableName + ".save()\">" + SAVE + "</span></td>");
		$row.append("<td><span onclick=\"" + this.tableName + ".render();\">" + CANCEL + "</span></td>");
		
		$table.append($row);
	};
	
	this.save = function(){
		if ($("#clientName").val().trim() !== ""){
			var client = new Client($("#clientName").val(), $("#country").val());
			this.collection[this.collection.length] = client;
			$("#errorBox").append("");
		} else {
			$("#errorBox").append("Please enter valid non empty values");
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