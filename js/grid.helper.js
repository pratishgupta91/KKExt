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

	var uiManager = new UIManager();
	uiManager.Initialize(dataCacheHelper, dynamicGrid, tagBandHelper);

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

	// Add all notes and tags to UI
	uiManager.AddNotesToUI(ALL_TAGS);
	uiManager.AddAllTagsToUI();

	// Edit box click listener
	noteCreateBoxHelper.GetNoteTextBox().click(function() {
		noteCreateBoxHelper.ExpandOptionsBand();
	});

	// Done button click listener
	noteCreateBoxHelper.GetDoneButton().click(function(){
		dataCacheHelper.GetNewNoteIndex(function(newNodeIndex) {
			var note = noteCreateBoxHelper.CreateNote(newNodeIndex);
			if(note) {
				if((note.ID_TAG_INDEX == tagBandHelper.GetSelectedIndex()) ||(ALL_TAGS == tagBandHelper.GetSelectedIndex())) {
					dynamicGrid.PrependAndPositionBox(note.text, note.color, note.interval, note.id);
				}
				dataCacheHelper.StoreNoteAt(0 /* index */, note);
				dataCacheHelper.IncrementTagCount(note.ID_TAG_INDEX);
			}
			noteCreateBoxHelper.CollapseOptionsBand();
			uiManager.RefreshTagBand();
		});
	});

	// Box children click listeners
	// 1. Delete button listener
	dynamicGrid.GetGridElem().on(CLICK_EVENT, BoxHelper.GetDeleteButtonClass(), function(e) {
		var box = BoxHelper.GetBoxFromChildElem($(this));
		var noteIndex = box.data(NOTE_ID);
		var note = dataCacheHelper.GetNoteAt(noteIndex);
		dataCacheHelper.RemoveNoteAt(noteIndex);
		dataCacheHelper.DecrementTagCount(note.ID_TAG_INDEX);
		dynamicGrid.RemoveBox(box);
		uiManager.RefreshTagBand();
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
		var tagIndex = TagBoxHelper.GetTagBoxIndex(tagBox);
		tagBandHelper.TagBoxClicked(tagIndex);
		uiManager.AddNotesToUI(tagIndex);
	});
});

$( window ).resize(function() {
  dynamicGrid.ReadjustAndAnimate(0, NO_OP);
});