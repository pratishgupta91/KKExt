var notes = 'notes';
var quote = 'quote';

function ChromeHelper() {

}

ChromeHelper.RetrieveItems = function(data, callback) {
	chrome.storage.sync.get(data, function(items) {
		if (chrome.runtime.error) {
			callback(null);
		}
		else {
			callback(items);
		}
	});
};

ChromeHelper.RetrieveNotes = function(callback) {
	this.RetrieveItems(notes, callback);
};

ChromeHelper.StoreNoteAt = function(index, note) {
	this.RetrieveNotes(function(items) {
		if (items && items.notes) {
			items.notes.splice(index, 0, note);
			chrome.storage.sync.set({notes : items.notes});
		}
		else {	
			firstNote = [];
			firstNote.push(note);
			chrome.storage.sync.set({notes : firstNote});
		}
	});
};

ChromeHelper.RemoveNoteAt = function(index) {
	this.RetrieveNotes(function(items) {
		if (items) {
			items.notes.splice(index, 1 /* count of items to be deleted at index */);
			chrome.storage.sync.set({notes : items.notes});
		}
	});
};

ChromeHelper.Notify = function(id, notificationTemplate) {
	if (chrome.notifications.getPermissionLevel) {
		chrome.notifications.getPermissionLevel(function (permissionLevel) {
			if (permissionLevel === 'granted') {
				chrome.notifications.create(id, notificationTemplate, function(id) {});
			}
		});
	}
};

ChromeHelper.RetrieveQuote = function(callback) {
	this.RetrieveItems(quote, callback);
};

ChromeHelper.StoreQuote = function(updatedQuote) {
	newQuote = [];
	newQuote.push(updatedQuote);
	chrome.storage.sync.set({quote : newQuote});
};