var dynamicGrid;

$(document).ready(function() {

    dynamicGrid = new DynamicGrid();
    dynamicGrid.Initialize();

    var reminderHelper = new ReminderHelper();
    var dataCacheHelper = new DataCacheHelper();

    var noteCreateBoxHelper = new NoteCreateBoxHelper();
    noteCreateBoxHelper.Initialize();

    var quoteHelper = new QuoteHelper();
    quoteHelper.Initialize();

    var tagBandHelper = new TagBandHelper();
    tagBandHelper.Initialize();

    ChromeHelper.RetrieveQuote(function(items) {

        //  If there is already an item stored
        if(items && items.quote) {

            // If the quote is not fresh then get it from server
            if(quoteHelper.IsServerRequestNeeded(items.quote[0].lastUpdated)) {
                quoteHelper.GetQuoteFromServer(function(response) {
                    ChromeHelper.StoreQuote(quoteHelper.CreateQuote(response));
                    quoteHelper.SetQuote(response);
                });
            }

            else {
                quoteHelper.SetQuote(items.quote[0].text);
            }
        }

        // Else get from server and store
        else {
            quoteHelper.GetQuoteFromServer(function(response) {
                ChromeHelper.StoreQuote(quoteHelper.CreateQuote(response));
                quoteHelper.SetQuote(response);
            });
        }
    });

    // Load all the notes and notify reminders
    dataCacheHelper.GetAllNotes(function(notes) {
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

    // Edit box click listener
    noteCreateBoxHelper.GetNoteTextBox().click(function() {
        noteCreateBoxHelper.ExpandOptionsBand();
    });

    // Done button click listener
    noteCreateBoxHelper.GetDoneButton().click(function(){
        dataCacheHelper.GetNewNoteIndex(function(newNodeIndex) {
            var note = noteCreateBoxHelper.CreateNote(newNodeIndex);
            if(note) {
                dynamicGrid.PrependAndPositionBox(note.text, note.color, note.interval, note.id);
                dataCacheHelper.StoreNoteAt(0 /* index */, note);
            }
            noteCreateBoxHelper.CollapseOptionsBand();
        });
    });

    // Box children click listeners
    // 1. Delete button listener
    dynamicGrid.GetGridElem().on(CLICK_EVENT, BoxHelper.GetDeleteButtonClass(), function(e) {
        var box = BoxHelper.GetBoxFromChildElem($(this));
        var noteIndex = box.data(NOTE_ID);
        dataCacheHelper.RemoveNoteAt(noteIndex);
        dynamicGrid.RemoveBox(box);
    });

    // 2. Mouse enter listener
    dynamicGrid.GetGridElem().on(MOUSE_ENTER_EVENT, BoxHelper.GetSquareBoxClass(), function(e) {
        BoxHelper.ShowBottomBar($(this));
    });

    // 3. Mouse exit listener
    dynamicGrid.GetGridElem().on(MOUSE_EXIT_EVENT, BoxHelper.GetSquareBoxClass(), function(e) {
        BoxHelper.HideBottomBar($(this));
    });

    // Tag band listener
    tagBandHelper.GetTagBandElem().on(CLICK_EVENT, TagBoxHelper.GetTagBoxClass(), function(e) {
        var tagBox = ($(this));
    });
});

$( window ).resize(function() {
  dynamicGrid.ReadjustAndAnimate(0, NO_OP);
});