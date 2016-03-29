function ReminderHelper() {
	toBeRemindedNotes = [];
}

ReminderHelper.prototype.Initialize = function() {
	toBeRemindedNotes = [];
};

ReminderHelper.prototype.CreateReminderTemplate = function(reminderItems) {
	var template = {
		type: 'list',
		iconUrl: 'img/delete.png',
		title: reminderItems.length + ' notes need attention',
		message: reminderItems.length + ' notes need attention.',
		items: reminderItems
	};

	return template;
};

ReminderHelper.prototype.IsReminderDue = function(interval, lastReminded) {
	if(interval > 0){
		var currentTime = +new Date();
		var intervalInMillis = (interval * 0 * 60 * 1000);
		if((currentTime - lastReminded) > intervalInMillis) {
			return true;
		}
	}
	return false;
};

ReminderHelper.prototype.PushReminderItems = function(title, interval, lastReminded) {
	if (this.IsReminderDue(interval, lastReminded)) {
		this.toBeRemindedNotes.push({"title": title, "message": (interval + " hours")});
	}
};

ReminderHelper.prototype.ResetReminderItems = function() {
	this.toBeRemindedNotes = [];
};

ReminderHelper.prototype.GetReminderItems = function() {
	return (this.toBeRemindedNotes.length > 0) ? this.toBeRemindedNotes : null;
};

