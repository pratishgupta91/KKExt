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

UIManager.prototype.ShowUI = function() {
    this.ShowNotesUI();
    this.AddNoteCreatorToUI();
};

UIManager.prototype.HideUI = function() {
    this.HideNotesUI();
    this.RemoveNoteCreatorFromUI();
}

UIManager.prototype.ToggleNotesUI = function(callback) {
    var that = this;
    this.GetNoteVisibilityStatus(function(isVisible) {
        that.SetNoteVisibilityStatus(!isVisible);
        if(isVisible) {
            that.HideUI();
        }
        else {
            that.ShowUI();
        }
        callback(!isVisible);
    });
}

UIManager.prototype.ShowNotesUI = function() {
    this.AddNotesToUI();
};


UIManager.prototype.HideNotesUI = function() {
    this.dynamicGrid.GetGridElem().empty();
};


UIManager.prototype.AddBoxEvents = function() {
    // 1. Delete button listener
    this.dynamicGrid.GetGridElem().on(CLICK_EVENT, BoxHelper.GetDeleteButtonClass(), function(e) {
        var box = BoxHelper.GetBoxFromChildElem($(this));
        var noteIndex = BoxHelper.GetBoxIndex(box);
        this.DeleteNoteFromUI(noteIndex);
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

UIManager.prototype.RemoveNoteCreatorFromUI = function() {
    this.noteCreateBoxHelper.RemoveNoteCreatorFromUI();
}

UIManager.prototype.AddNoteCreatorToUI = function() {
    this.noteCreateBoxHelper.AddNoteCreatorToUI();
    this.AddNoteCreatorBoxEvents();
}


// First time when the notes get added
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

// When user adds a note, 
// 1. The note gets added in data cache helper
// 2. The note gets added in chrome storage 
// 3. The note gets added in UI 
UIManager.prototype.AddNoteToUI = function(note) {
    var that = this;
    this.dataCacheHelper.GetNewNoteIndex(function(newNodeIndex) {
        if(note) {
            that.dynamicGrid.PrependAndPositionBox(note.text, note.color, GetReminderRatio(note.created, note.interval), note.id);
            that.dataCacheHelper.StoreNoteAt(0 /* index */, note);
        }
    });
}

// When user deletes a note, 
// 1. The note gets deleted from data cache helper
// 2. The note gets deleted from chrome storage 
// 3. The note gets removed from UI
UIManager.prototype.DeleteNoteFromUI = function(noteIndex) {
    var note = this.dataCacheHelper.GetNoteAt(noteIndex);
    this.dataCacheHelper.RemoveNoteAt(noteIndex);
    var box = this.dynamicGrid.GetBoxElem(noteIndex);
    this.dynamicGrid.RemoveBox(box);
}

UIManager.prototype.SetNoteVisibilityStatus = function(visibility) {
    this.dataCacheHelper.SetNoteVisibility(visibility);
}

UIManager.prototype.GetNoteVisibilityStatus = function(callback) {
    this.dataCacheHelper.GetNoteVisibility(function(visibility){
        callback(visibility);
    })
}

UIManager.prototype.SettingsNoteVisibilityListener = function() {
    var that = this;
    this.settingsHelper.SettingsNoteVisibilityEvent(function(ack) {
        that.ToggleNotesUI(function(visibility) {
            ack(visibility);
        });
    })
}

UIManager.prototype.ToggleSettingsView = function(visibility) {
    var that = this;
    this.GetNoteVisibilityStatus(function(visibility) {
        that.settingsHelper.ToggleSettingsView(visibility, function(isVisible) {
            if(isVisible) {
                that.SettingsNoteVisibilityListener();
            }
            callback(visibility);
        });
    });
}

UIManager.prototype.IsSettingsViewVisible = function() {
    var v = this.settingsHelper.IsSettingsCollapsed();
    if(v) return false;
    return true;
    //return (!this.settingsHelper.IsSettingsCollapsed());
}

UIManager.prototype.AttachReminders = function() {
    // 1. Add the notes to UI
    // this.dataCacheHelper.GetAllNotes(function(notes) {
    //     if (notes) {
    //         reminderHelper.ResetReminderItems();
    //         notes.forEach(function(note) {
    //             if((note.tagIndex == tagIndex) || (tagIndex == ALL_TAGS)) {
    //                 dynamicGrid.AppendAndPositionBox(note);
    //                 reminderHelper.PushReminderItems(note);
    //             }
    //         });

    //         var reminderItems = reminderHelper.GetReminderItems();
    //         if (reminderItems) {
    //             var reminderTemplate = reminderHelper.CreateReminderTemplate(reminderItems);
    //             ChromeHelper.Notify('reminder', reminderTemplate);
    //         }
    //     }
    // });
};