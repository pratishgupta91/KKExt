function UIManager() {
    var dataCachehelper;
    var dynamicGrid;
    var reminderHelper;
    var tagBandHelper;
}

UIManager.prototype.Initialize = function(dataCachehelper, dynamicGrid, tagBandHelper) {
    this.dynamicGrid = dynamicGrid;
    this.dataCacheHelper = dataCachehelper;
    this.tagBandHelper = tagBandHelper;
    //this.reminderHelper = reminderHelper;
};

UIManager.prototype.AddNotesToUI = function(tagIndex) {
    var that = this;

    this.dataCacheHelper.GetAllNotes(function(notes) {
        if (notes && (notes.length > 0)) {
            that.dynamicGrid.RemoveAllBoxes();
            notes.forEach(function(note) {
                if((note.ID_TAG_INDEX == tagIndex) || (tagIndex == ALL_TAGS)) {
                    that.dynamicGrid.AppendAndPositionBox(note.text, note.color, note.interval, note.id);
                }
            });
        }
    });
};

UIManager.prototype.AddAllTagsToUI = function() {
    var that = this;

    this.dataCacheHelper.GetAllTags(function(tags) {
        if (tags && (tags.length > 0)) {
            tags.forEach(function(tag) {
                var tagName = that.dataCacheHelper.GetTagNameAt(tag.ID_TAG_INDEX);
                var tagColor = that.dataCacheHelper.GetTagColorAt(tag.ID_TAG_INDEX);
                var noteCount = tag.ID_TAG_NOTE_COUNT;
                that.tagBandHelper.AppendTagBox(tagName, noteCount, tagColor);
            });
        }
    });
};

UIManager.prototype.RefreshTagBand = function() {
    this.tagBandHelper.RemoveAllTagBoxes();
    this.AddAllTagsToUI();
};

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