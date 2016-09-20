function UIManager() {
    var dataCacheHelper;
    var dynamicGrid;
    var noteCreateBoxHelper;
    var reminderHelper;
    var settingsHelper;
}

UIManager.prototype.Initialize = function(dynamicGrid) {
    this.dynamicGrid = dynamicGrid;
    this.dataCacheHelper =  new DataCacheHelper();


    this.noteCreateBoxHelper = new NoteCreateBoxHelper();
    this.noteCreateBoxHelper.Initialize();

    this.settingsHelper = new Settings();
    this.settingsHelper.Init();
    //this.reminderHelper = reminderHelper;
};

// -------------------------------------------
// Notes UI 
// Adds the events to the notes
// -------------------------------------------
UIManager.prototype.AddBoxEvents = function() {
    // 1. Delete button listener
    var that = this;
    this.dynamicGrid.GetGridElem().on(CLICK_EVENT, BoxHelper.GetDeleteButtonClass(), function(e) {
        var box = BoxHelper.GetBoxFromChildElem($(this));
        var noteIndex = BoxHelper.GetBoxIndex(box);
        that.DeleteNoteFromUI(noteIndex);
    });

    // 2. Mouse enter listener
    this.dynamicGrid.GetGridElem().on(MOUSE_ENTER_EVENT, BoxHelper.GetSquareBoxClass(), function(e) {
        BoxHelper.ShowBottomBar($(this));
    });

    // 3. Mouse exit listener
    this.dynamicGrid.GetGridElem().on(MOUSE_EXIT_EVENT, BoxHelper.GetSquareBoxClass(), function(e) {
        BoxHelper.HideBottomBar($(this));
    });
}

// -------------------------------------------
// Notes UI 
// Adds the events to the creator box
// -------------------------------------------
UIManager.prototype.AddNoteCreatorBoxEvents = function() {
    // Edit box click listener
    var that = this;
    this.noteCreateBoxHelper.GetNoteTextBox().click(function() {
        that.noteCreateBoxHelper.ExpandOptionsBand();
    });

    // Done button click listener
    this.noteCreateBoxHelper.GetDoneButton().click(function(){
        var note = that.noteCreateBoxHelper.CreateNote();
        that.AddNoteToUI(note);
        that.noteCreateBoxHelper.CollapseOptionsBand();
    });
}

// -------------------------------------------
// Notes UI 
// Adds the view of notes to UI
// -------------------------------------------
UIManager.prototype.AddNotesToUI = function() {
    var that = this;

    this.dataCacheHelper.GetAllNotes(function(notes) {
        if (notes && (notes.length > 0)) {
            that.dynamicGrid.RemoveAllBoxes();
            notes.forEach(function(note) {
                that.dynamicGrid.AppendAndPositionBox(note.text, note.color, GetReminderRatio(note.created, note.interval)
                , note.id);
            });

            // Add box events
            that.AddBoxEvents();
        }
    });
};

// -------------------------------------------
// Notes UI 
// Adds the listener of show notes button 
// when notes are hidden
// -------------------------------------------
UIManager.prototype.HelpTextShowNotesClickHandler = function() {
    var that = this;
    HelpText.HelpTextShowNotesClickHandler(function(callback) {
        that.ToggleNotesUI(function(){});
    })
};

// -------------------------------------------
// Notes UI 
// Adds the view of Help text when notes are hidden
// -------------------------------------------
UIManager.prototype.ShowHiddenNoteHelpText = function() {
    HelpText.ShowHiddenNotesInformation();
    this.HelpTextShowNotesClickHandler();
};

// -------------------------------------------
// Notes UI 
// Adds the view of notes and creator box to UI
// -------------------------------------------
UIManager.prototype.ShowNotesUI = function() {
    this.AddNotesToUI();
    this.noteCreateBoxHelper.AddNoteCreatorToUI();
    this.AddNoteCreatorBoxEvents();
    HelpText.Hide();
};

// -------------------------------------------
// Notes UI 
// Remove the view of notes and creator 
// box from UI
// -------------------------------------------
UIManager.prototype.HideNotesUI = function() {
    this.dynamicGrid.GetGridElem().empty();
    this.noteCreateBoxHelper.RemoveNoteCreatorFromUI();
    this.ShowHiddenNoteHelpText();
}

// -------------------------------------------
// Notes UI 
// Toggles the view of notes and creator box
// -------------------------------------------
UIManager.prototype.ToggleNotesUI = function(callback) {
    var that = this;
    this.GetNoteVisibilityStatus(function(isVisible) {
        that.SetNoteVisibilityStatus(!isVisible);
        if(isVisible) {
            that.HideNotesUI();
        }
        else {
            that.ShowNotesUI();
        }
        callback(!isVisible);
    });
}

// -------------------------------------------
// Notes UI 
//
// When user adds a note, 
// 1. The note gets added in data cache helper
// 2. The note gets added in chrome storage 
// 3. The note gets added in UI 
// -------------------------------------------
UIManager.prototype.AddNoteToUI = function(note) {
    var that = this;
    this.dataCacheHelper.GetNewNoteIndex(function(newNodeIndex) {
        if(note) {
            that.dynamicGrid.PrependAndPositionBox(note.text, note.color, GetReminderRatio(note.created, note.interval), note.id);
            that.dataCacheHelper.StoreNoteAt(0 /* index */, note);
        }
    });
}

// -------------------------------------------
// Notes UI 
//
// When user deletes a note, 
// 1. The note gets deleted from data cache helper
// 2. The note gets deleted from chrome storage 
// 3. The note gets removed from UI
// -------------------------------------------
UIManager.prototype.DeleteNoteFromUI = function(noteIndex) {
    var note = this.dataCacheHelper.GetNoteAt(noteIndex);
    this.dataCacheHelper.RemoveNoteAt(noteIndex);
    var box = this.dynamicGrid.GetBoxElem(noteIndex);
    this.dynamicGrid.RemoveBox(box);
}


// -------------------------------------------
// Notes UI 
// Stores the current visibility in cache 
// and storage
// -------------------------------------------
UIManager.prototype.SetNoteVisibilityStatus = function(visibility) {
    this.dataCacheHelper.SetNoteVisibility(visibility);
}

// -------------------------------------------
// Notes UI 
// Retrieves the current visibility from cache and storage
// -------------------------------------------
UIManager.prototype.GetNoteVisibilityStatus = function(callback) {
    this.dataCacheHelper.GetNoteVisibility(function(visibility){
        callback(visibility);
    })
}

// ---------------------------------Notes UI ends----------------------------------------->


// -------------------------------------------
// Settings UI
// Check if settings UI is visible
// --------------------------------------------
UIManager.prototype.IsSettingsViewVisible = function() {
    var v = this.settingsHelper.IsSettingsBoxCollapsed();
    if(v) return false;
    return true;
    //return (!this.settingsHelper.IsSettingsCollapsed());
}

// -------------------------------------------
// Settings UI - Note visibility option
// Register note visibility option setting 
// click event
// --------------------------------------------
UIManager.prototype.RegisterNoteVisibilitySettingsOptionClickEvent = function() {
    var that = this;
    this.GetNoteVisibilityStatus(function(noteVisibility) {
        that.settingsHelper.RegisterNoteVisibilitySettingOptionClickEvent(function(callbackAck) {
            that.ToggleNotesUI(function(noteVisibility) {
                callbackAck(noteVisibility);
            });
        });
    });
}

// -------------------------------------------
// Settings UI 
// Toggle settings view 
// --------------------------------------------
UIManager.prototype.ToggleSettingsView = function(callback) {
    var that = this;
    this.GetNoteVisibilityStatus(function(noteVisibility) {
        that.settingsHelper.ToggleSettingsBoxView(noteVisibility, function(settingsBoxVisibility) {

            // If settings box is visible, register for events
            if(settingsBoxVisibility) {
                that.RegisterNoteVisibilitySettingsOptionClickEvent();
            }
            callback(settingsBoxVisibility);
        });
    });
}

