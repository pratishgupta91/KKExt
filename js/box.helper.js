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
	bottomBarElem.css("visibility", 'hidden');
};

/* static */ BoxHelper.ShowBottomBar = function(boxElem) {

	// 1. Show bottombar
	var bottomBarElem = boxElem.find(bottomBarClass);
	bottomBarElem.css("visibility", 'visible');

	// 2. Check for all the options to be shown

	// 2.1 Reminder option
	var isReminderAttached = boxElem.data(IS_REMINDER);
	var reminderButtonElem = bottomBarElem.find(reminderButtonClass);
	if(isReminderAttached) {
		reminderButtonElem.show();
	}
	else {
		reminderButtonElem.hide();
	}
};
