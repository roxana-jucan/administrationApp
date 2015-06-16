var Table = function(){
	this.render = function () {		
		// I need it!
		var i;
		// clear body in case it exists
		if (this.table.tBodies[0] !== undefined){
			this.table.removeChild(this.table.tBodies[0]);
		}
		this.table.createTBody();
		
		if (this.collection.length > 0){
			for (i = 0; i < this.collection.length; i++) {
				var object = this.collection[i];
				this.addRowToTable(object);
			}
			this.addFinalRow();
		} else {
			this.addEditRowToTable();
		}
		this.renderDependencies();
	};
	
	// it's the same for all tables
	this.addFinalRow = function(){
		var row = this.table.tBodies[0].insertRow();
		row.id = this.lastRowId;
		var cellId = row.insertCell(0);
		cellId.innerHTML = "<span onclick=\"" + this.tableName + ".addEditRowToTable();\">+</span>";
	};
	
	// it's the same for all tables
	this.removeRow = function (id){
		var i;
		for (i = 0; i < this.collection.length; i++){
			if (this.collection[i].id === id) {
				if (this.canElementBeRemoved(this.collection[i].id)){
					this.collection.splice(i,1);
					document.getElementById("errorBox").innerHTML = "";
					break;
				} else {
					document.getElementById("errorBox").innerHTML = "Please delete the child dependencies first";
				}
			}
		}

		this.storeDataToLocalStorage();
		this.render();
	};
	
	this.canElementBeRemoved = function() {
		return true;
	};
	
	this.renderDependencies = function() {
		// nothing to render except for the current table
	};
};
