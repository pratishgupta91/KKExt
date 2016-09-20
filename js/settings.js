function Settings() {
	var settingsBox;                // Setting box
	var noteVisibilitySettingOption;      // Note Visibility option
};

Settings.prototype.Init = function(visibility) {
	this.settingsBox = $(SettingsBox_CN);
	this.settingsBox.css("width", "0px");
	$(this.settingsBox).click(function(event) {
		event.stopPropagation();
	});
}

Settings.prototype.UpdateNoteVisibilitySettingOptionUI = function(visibility, shouldDismissSettingsBox) {
	if(visibility) {
		$(NoteShow_CN).css("visibility", "hidden");
		$(NoteHide_CN).css("visibility", "visible");
	}
	else {
		$(NoteShow_CN).css("visibility", "visible");
		$(NoteHide_CN).css("visibility", "hidden");
	}

	if(shouldDismissSettingsBox) {
		this.CollapseSettingsBox(function() {});
	}
}

// This event is thrown whenever note visibility button is clicked
Settings.prototype.RegisterNoteVisibilitySettingOptionClickEvent = function(callback) {
	var that = this;
	$(this.noteVisibilitySettingOption).click(function(event) {
		//event.stopPropagation();
		callback(function(visibility) {
			that.UpdateNoteVisibilitySettingOptionUI(visibility, true);
		});
	})
}

// Generate script for adding all the options in settings UI
Settings.prototype.GenerateSettingsScript = function() {
	var options = ["Hide Notes", "About"];
	var script = "<div class='settings-padding'></div>";

	script += "<div class='settings-title'>";
	script += "<div class='settings-title-label'>SETTINGS</div></div>";
	//script += "Settings";

	// Add show notes / hide notes
	script += "<div class='settings-option settings-note-visibility'>";
	
	script += "<div class='settings-note-visibility-show'>";
	script += "<div class='settings-note-visibility-label'>";
	script += "Show Notes";
	script += "</div>";
	script += "<div class='settings-note-visibility-show-image'>";
	script += "<img src='img/visible.png'>";
	script += "</div>";
	script += "</div>";

	script += "<div class='settings-note-visibility-hide'>";
	script += "<div class='settings-note-visibility-label'>";
	script += "Hide Notes";
	script += "</div>";
	script += "<div class='settings-note-visibility-hide-image'>";
	script += "<img src='img/invisible.png'>";
	script += "</div>";
	script += "</div>";

	script += "</div>";

	// Add footer
	script += "<div class='settings-footer'>";
	script += "<div class='settings-footer-line'></div>";

	script += "<div class='settings-footer-version'>";
	script += "<div class='settings-footer-version-label'>";
	script += "Version";
	script += "</div>";
	script += "<div class='settings-footer-version-value'>";
	script += "1.10";
	script += "</div>";
	script += "</div>";

	script += "</div>";

	return script;
}

Settings.prototype.AddSettingsOptionsToSettingsBox = function() {
	var script = this.GenerateSettingsScript();
	this.settingsBox.append(script);
	this.noteVisibilitySettingOption = $(NoteVisibility_CN);
}

Settings.prototype.RemoveSettingsOptionsFromSettingsBox = function() {
	this.settingsBox.empty();
}

// Expand setting box
Settings.prototype.ExpandSettingsBox = function(callback) {
	var that = this;
	this.settingsBox.animate({
		width: "250",
	}, 70, function() {
		that.AddSettingsOptionsToSettingsBox();
		callback();
	});
}

Settings.prototype.CollapseSettingsBox = function(callback) {
	this.RemoveSettingsOptionsFromSettingsBox();
	this.settingsBox.animate({
		width: "0",
	}, 70, function() {
		callback();
	});
}

Settings.prototype.IsSettingsBoxCollapsed = function() {
	if(this.settingsBox.width() == 0) {
		return true;
	}
	return false;
}

Settings.prototype.ToggleSettingsBoxView = function(noteVisibility, callback) {
	var that = this;
	if(this.IsSettingsBoxCollapsed()) {
		this.ExpandSettingsBox(function() {
			that.UpdateNoteVisibilitySettingOptionUI(noteVisibility, false);
			callback(true);
		});
	}
	else {
		this.CollapseSettingsBox(function() {
			callback(false);
		});
	}
}

