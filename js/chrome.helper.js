var notes            = 'notes';
var quote            = 'quote';
var note_visibility  = 'note_visibility';

function ChromeHelper() {

}

ChromeHelper.RetrieveItems = function(data, callback) {
	chrome.storage.sync.get(data, function(items) {
		if (chrome.runtime.error) {
			callback(null);
		}
		else if(items) {
			callback(items);
		}
		else {
			callback(null);
		}
	});
};

ChromeHelper.RetrieveNotes = function(callback) {
	this.RetrieveItems(notes, function(items) {
		if(items && items.notes) {
			callback(items.notes);
		}
		else {
			callback(null);
		}
	});
};

ChromeHelper.StoreNoteAt = function(index, note) {
	this.RetrieveNotes(function(storedNotes) {
		if (storedNotes) {
			storedNotes.splice(index, 0, note);
			chrome.storage.sync.set({notes : storedNotes});
		}
		else {	
			firstNote = [];
			firstNote.push(note);
			chrome.storage.sync.set({notes : firstNote});
		}
	});
};

ChromeHelper.RemoveNoteAt = function(index) {
	this.RetrieveNotes(function(storedNotes) {
		if (storedNotes) {
			storedNotes.splice(index, 1 /* count of items to be deleted at index */);
			chrome.storage.sync.set({notes : storedNotes});
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
	this.RetrieveItems(quote, function(items) {
		if(items && items.quote) {
			callback(items.quote);
		}
		else {
			callback(null);
		}
	});
};

ChromeHelper.StoreQuote = function(updatedQuote) {
	newQuote = [];
	newQuote.push(updatedQuote);
	chrome.storage.sync.set({quote : newQuote});
};

ChromeHelper.StoreNoteVisibility = function(visibility) {
	chrome.storage.sync.set({note_visibility : visibility});
}

ChromeHelper.RetrieveNoteVisibility = function(callback) {
	this.RetrieveItems(note_visibility, function(items) {
		if(items && items.note_visibility != null) {
			callback(items.note_visibility);
		}
		else {
			callback(null);
		}
	});
}