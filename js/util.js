// next index generator - it gets the maximum id and adds 1
var nextIndex = function (arrayOfObjects) {
var i;
	if (arrayOfObjects !== undefined && arrayOfObjects.length > 0){
		var maxIndex = arrayOfObjects[0].id;
		for (i = 1; i < arrayOfObjects.length; i++) {
			if (maxIndex < arrayOfObjects[i].id){
				maxIndex = arrayOfObjects[i].id;
			}
		}
		return ++maxIndex;
	}
	return 1;
};

// creating an element of type "select" and populating it with some values
// the values will be those corresponding to the map
function generateSelectByMap(map, id){
	var selectObject = document.createElement("select");
	var key;
	selectObject.id = id;
	
	// Question ???
	// why is this a good practice?
	// The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.
	for(key in map){
		if (map.hasOwnProperty(key)) {
			selectObject.options.add(new Option(map[key],key));
		}
	}
	
	return selectObject;
}

// creating an element of type "select" and populating it with some values
// the values will be those corresponding to the collection
function generateSelect(collection, elementId, multiple){
	var selectObject;
	var i;
	
	if (collection !== null && collection.length > 0){
		selectObject = document.createElement("select");
		if (multiple){
			selectObject.multiple = multiple;
		}
		
		selectObject.id = elementId;
		for (i = 0; i < collection.length; i++) {
			selectObject.options.add(new Option(collection[i] , collection[i].id));
		}
	} 

	return selectObject;
}

function findObjectById(collection, id){
	var i;
	for (i = 0; i < collection.length; i++){
		if (collection[i].id == id) {
			return collection[i];
		}
	}
	return null;
} 

function getSelectedValues(elementId){
	var selectedValues = [];
	var selectBox = document.getElementById(elementId);
	for (var i = 0; i < selectBox.options.length; i++) {
		if( selectBox.options[i].selected == true){
			selectedValues[selectedValues.length] = selectBox.options[i].value;
		}
	}
	return selectedValues;
}
