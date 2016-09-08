$(document).ready(function() {

	dynamicGrid = new DynamicGrid();
	dynamicGrid.Initialize();

	var uiManager = new UIManager();
	uiManager.Initialize(dynamicGrid);

	uiManager.GetNoteVisibilityStatus(function(isVisible) {
		if(isVisible == true) {
			uiManager.ShowUI();
		}
		else {
			uiManager.HideUI();
		}
	});

	$(NotesViewSwitch_CN).click(function() {
		uiManager.ToggleNotesUI(function(isVisible) {
			isVisible ? uiManager.ShowUI() : uiManager.HideUI();
		});
	});

	// Dismiss sidebar when click outside
	// $(window).click(function() {
	// 	var v = uiManager.IsSettingsViewVisible();
	// 	if(v) {
	// 		uiManager.ToggleSettingsView(function(visibility){});
	// 	}
	// });

});

$( window ).resize(function() {
  dynamicGrid.ReadjustAndAnimate(0, NO_OP);
});


// ChromeHelper.RetrieveQuote(function(items) {

// 			//  If there is already an item stored
// 			if(items && items.quote) {

// 				// If the quote is not fresh then get it from server
// 				if(quoteHelper.IsServerRequestNeeded(items.quote[0].lastUpdated)) {
// 					quoteHelper.GetQuoteFromServer(function(response) {
// 						ChromeHelper.StoreQuote(quoteHelper.CreateQuote(response));
// 						quoteHelper.SetQuote(response);
// 					});
// 				}

// 				else {
// 					quoteHelper.SetQuote(items.quote[0].text);
// 				}
// 			}

// 			// Else get from server and store
// 			else {
// 				quoteHelper.GetQuoteFromServer(function(response) {
// 					ChromeHelper.StoreQuote(quoteHelper.CreateQuote(response));
// 					quoteHelper.SetQuote(response);
// 				});
// 			}
// 		});