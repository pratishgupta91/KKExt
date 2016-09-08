function BoxHelper() {
}

var deleteButtonClass = ".delete";
var bottomBarClass = ".bottomBar";
var squreBoxClass = ".square_box";
var reminderButtonClass = ".reminder_icon";

/* static */ BoxHelper.GetBoxFromChildElem = function(childElem) {
	return childElem.closest('.square_box');
};

/* static */ BoxHelper.GetBoxIndex = function(boxElem) {
	return boxElem.index();
};

/* static */ BoxHelper.GetDeleteButtonClass = function(boxElem) {
	return deleteButtonClass;
};

/* static */ BoxHelper.GetBottomBarClass = function(boxElem) {
	return bottomBarClass;
};

/* static */ BoxHelper.GetSquareBoxClass = function(boxElem) {
	return squreBoxClass;
};

/* static */ BoxHelper.HideBottomBar = function(boxElem) {
	var bottomBarElem = boxElem.find(bottomBarClass);
	bottomBarElem.animate({opacity: 0}, 'fast', function() {
		bottomBarElem.css('visibility', 'hidden');
	});

	//bottomBarElem.fadeTo("fast", 0);
	//bottomBarElem.css("visibility", 'hidden');
};

/* static */ BoxHelper.ShowBottomBar = function(boxElem) {

	// 1. Show bottombar
	var bottomBarElem = boxElem.find(bottomBarClass);
	bottomBarElem.animate({opacity: 1}, 'fast', function() {
		bottomBarElem.css('visibility', 'visible');
	});
	//bottomBarElem.css("visibility", 'visible');

	// 2. Check for all the options to be shown
};
