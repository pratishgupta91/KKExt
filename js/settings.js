function Settings() {
	var settingsBox;
	var noteVisibilitySetting;
};

Settings.prototype.Init = function(visibility) {
	this.settingsBox = $(SettingsBox_CN);
	this.settingsBox.css("width", "0px");
}

Settings.prototype.UpdateNoteVisibilityUIStatus = function(visibility) {
	if(visibility) {
		this.noteVisibilitySetting.prop('checked', false);
		//this.noteVisibilitySetting.css("color", "white");
	}
	else {
		this.noteVisibilitySetting.prop('checked', true);
		//this.noteVisibilitySetting.css("color", "black");
	}
}

// This event is thrown whenever note visibility button is clicked
Settings.prototype.SettingsNoteVisibilityEvent = function(callback) {
	var that = this;
	$(NoteVisibility_CN).click(function(event) {
		//event.stopPropagation();
		callback(function(visibility) {
			that.UpdateNoteVisibilityUIStatus(visibility);
		});
	})
}

Settings.prototype.GenerateSettingsScript = function() {
	var options = ["Hide Notes", "About"];
	var script = "<div class='settings-padding'></div>";

	script += "Settings";

	// Add show notes / hide notes
	script += "<div class='settings-option settings-note-visibility'>";
	script += "<div class='settings-note-visibility-label'>";
	script += "Hide Notes";
	script += "</div>";
	script += "<div class='settings-note-visibility-checkbox'>";
	script += "<label>";
	script += "<input type='checkbox'>";
	script += "</label>";
	script += "</div>";
	script += "</div>";

	// Add about
	script += "<div class='settings-option'>";
	script += "About";
	script += "</div>";

	return script;
}

Settings.prototype.AddSettingsOptions = function() {
	var script = this.GenerateSettingsScript();
	this.settingsBox.append(script);
	this.noteVisibilitySetting = $(NoteVisibility_CN);
}

Settings.prototype.RemoveSettingsOptions = function() {
	this.settingsBox.empty();
}

Settings.prototype.ExpandSettings = function(callback) {
	var that = this;
	this.settingsBox.animate({
		width: "200",
	}, 70, function() {
		that.AddSettingsOptions();
		callback();
	});
}

Settings.prototype.CollapseSettings = function(callback) {
	//this.settingsBox.css("right", this.GetCollapsePosition() + "px");
	this.RemoveSettingsOptions();
	this.settingsBox.animate({
		width: "0",
	}, 70, function() {
		callback();
	});
}

Settings.prototype.IsSettingsCollapsed = function() {
	if(this.settingsBox.width() == 0) {
		return true;
	}
	return false;
}

Settings.prototype.ToggleSettingsView = function(noteVisibility, callback) {
	var that = this;
	if(this.IsSettingsCollapsed()) {
		this.ExpandSettings(function() {
			that.UpdateNoteVisibilityUIStatus(noteVisibility);
			callback(true);
		});
	}
	else {
		this.CollapseSettings(function() {
			callback(false);
		});
	}
}

