function UIManager() {
	var dataCachehelper;
}

UIManager.prototype.Initialize = function(dataCachehelper) {
	this.dataCachehelper = dataCachehelper;
};

UIManager.prototype.AddNotesToUI = function(tags) {
	this.dataCacheHelper.GetAllNotes(function(notes) {
        if (notes) {
            reminderHelper.ResetReminderItems();
            notes.forEach(function(note) {
                dynamicGrid.AppendAndPositionBox(note.text, note.color, note.interval, note.id);
                reminderHelper.PushReminderItems(note.text, note.interval, note.lastReminded);
            });

            var reminderItems = reminderHelper.GetReminderItems();
            if (reminderItems) {
                var reminderTemplate = reminderHelper.CreateReminderTemplate(reminderItems);
                ChromeHelper.Notify('reminder', reminderTemplate);
            }
        }
    });
};