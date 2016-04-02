function NoteCreateBoxHelper() {

	// Member variables
	var optionsElem;				// Options band 
	var doneButtonElem;				// Done button
	var reminderIntervalElem		// Reminder drop down
	var noteColors					// Note colors
	var noteEditBoxElem				// Note edit box

	// Member functions
	this.InitElements = function() {
		 this.optionsElem = $('.options_band');
		 this.doneButtonElem = $('#done');
		 this.reminderIntervalElem = $('#remindertime');
		 this.noteEditBoxElem = $('#note');
	};
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

NoteCreateBoxHelper.prototype.Initialize = function() {
	this.InitElements();
	this.noteColors = ['#FF8A80', '#80D8FF', '#FFFF8D', '#FFD180', '#CED7DB', '#A7FFEB', '#CCFF90'];

	// Collapse options band
	this.CollapseOptionsBand();
};

NoteCreateBoxHelper.prototype.GetDoneButton = function() {
	return this.doneButtonElem;
};

NoteCreateBoxHelper.prototype.ExpandOptionsBand = function() {
	this.optionsElem.show();
};

NoteCreateBoxHelper.prototype.CollapseOptionsBand = function() {
	this.optionsElem.hide();
};

NoteCreateBoxHelper.prototype.EditBoxClickHandler = function() {
	this.ExpandOptionsBand();
};

NoteCreateBoxHelper.prototype.GetNoteTextBox = function() {
	return this.noteEditBoxElem;
};

NoteCreateBoxHelper.prototype.ResetEditBox = function() {
	this.noteEditBoxElem.val('');
};

NoteCreateBoxHelper.prototype.GetNoteTextAndReset = function() {
	var text = this.noteEditBoxElem.val();
	this.ResetEditBox();
	return text;
};

NoteCreateBoxHelper.prototype.GetReminderInterval = function() {
	return parseInt($('select[name=remindertime]').val());
};

NoteCreateBoxHelper.prototype.GetNoteColor = function() {
	return this.noteColors[getRandomInt(0, (this.noteColors.length - 1))];
};

NoteCreateBoxHelper.prototype.CreateNote = function(index) {
	var noteText = this.GetNoteTextAndReset();
	if(noteText.length > 0) {
		var note = {
			"id": index,
			"text": noteText,
			"color": this.GetNoteColor(),
			"lastReminded": +new Date(),
			"interval" : this.GetReminderInterval()
		};
		return note;
	}
	return null;
};

