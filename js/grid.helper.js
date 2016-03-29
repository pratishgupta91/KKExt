var dynamicGrid;

$(document).ready(function() {

    dynamicGrid = new DynamicGrid();
    dynamicGrid.Initialize();

    var chromeHelper = new ChromeHelper();
    var reminderHelper = new ReminderHelper();
    var noteCreateBoxHelper = new NoteCreateBoxHelper();
    noteCreateBoxHelper.Initialize();

    var quoteHelper = new QuoteHelper();
    quoteHelper.Initialize();

     chromeHelper.RetrieveQuote(function(items) {

        //  If there is already an item stored
        if(items && items.quote) {

            // If the quote is not fresh then get it from server
            if(quoteHelper.IsServerRequestNeeded(items.quote[0].lastUpdated)) {
                quoteHelper.GetQuoteFromServer(function(response) {
                    chromeHelper.StoreQuote(quoteHelper.CreateQuote(response));
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
                chromeHelper.StoreQuote(quoteHelper.CreateQuote(response));
                quoteHelper.SetQuote(response);
            });
        }
    });

    // Load all the notes and notify reminders
    chromeHelper.RetrieveNotes(function(items) {
        if (items) {
            reminderHelper.ResetReminderItems();
            items.notes.forEach(function(note) {
                dynamicGrid.AppendAndPositionBox(note.text, note.color, note.interval);
                reminderHelper.PushReminderItems(note.text, note.interval, note.lastReminded);
            });

            var reminderItems = reminderHelper.GetReminderItems();
            if (reminderItems) {
                var reminderTemplate = reminderHelper.CreateReminderTemplate(reminderItems);
                chromeHelper.Notify('reminder', reminderTemplate);
            }
        }
    });

    // Edit box click listener
    noteCreateBoxHelper.GetNoteTextBox().click(function() {
        noteCreateBoxHelper.ExpandOptionsBand();
    });

    // Done button click listener
    noteCreateBoxHelper.GetDoneButton().click(function(){
        var note = noteCreateBoxHelper.CreateNote();
        if(note) {
            dynamicGrid.PrependAndPositionBox(note.text, note.color, note.interval);
            chromeHelper.StoreNoteAt(0 /* index */, note);
        }
        noteCreateBoxHelper.CollapseOptionsBand();
    });

    // Box children click listeners
    // 1. Delete button listener
    dynamicGrid.GetGridElem().on('click', BoxHelper.GetDeleteButtonClass(), function(e) {
        var box = BoxHelper.GetBoxFromChildElem($(this));
        var clickedIndex = BoxHelper.GetBoxIndex(box);
        dynamicGrid.RemoveBox(box);
        chromeHelper.RemoveNoteAt(clickedIndex);
    });

    dynamicGrid.GetGridElem().on('mouseenter', BoxHelper.GetSquareBoxClass(), function(e) {
        BoxHelper.ShowBottomBar($(this));
    });

    dynamicGrid.GetGridElem().on('mouseleave', BoxHelper.GetSquareBoxClass(), function(e) {
        BoxHelper.HideBottomBar($(this));
    });
});

$( window ).resize(function() {
  dynamicGrid.ReadjustBoxes();
});