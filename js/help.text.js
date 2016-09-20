function HelpText() {
}


HelpText.GetHiddenNoteTextScript = function() {
	var script = "";
	script += "<div class='help-text-block'>";
	
	script += "<div class='help-text-notes-hidden-clock'>";
	var time = getTime();
	script += time;
	script += "</div>";

	script += "<div class='help-text-notes-hidden-label'>Your notes are currently hidden</div>"

	script += "<div class='help-text-notes-hidden-button'>SHOW NOTES</div>";

	script += "</div>";
	return script;
};

HelpText.HelpTextShowNotesClickHandler = function (callback) {
	$(HelpTextNoteBtn_CN).click(function() {
		callback();
	});
}

HelpText.ShowHiddenNotesInformation = function() {
	$(HelpTextBlock_CN).empty();
	var helpTextElem = $(HelpText_CN);
	helpTextElem.append(HelpText.GetHiddenNoteTextScript());
};

HelpText.Hide = function() {
	$(HelpTextBlock_CN).empty();
}