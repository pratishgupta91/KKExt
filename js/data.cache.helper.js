function DataCacheHelper () {
	var tags;
	var notes;
	var isNoteVisible = null;
}


DataCacheHelper.prototype.GetAllNotes = function(callback) {

	// If already cached then return cached notes
	if(this.notes) {
		callback(this.notes);
	}
	else {
		var that = this;
		ChromeHelper.RetrieveNotes(function(notes) {
			if(notes) {
				that.notes = notes;
				callback(that.notes);
			}
			else {
				callback(null);
			}
		});
	}
};

DataCacheHelper.prototype.StoreNoteAt = function(index, note) {

	var that = this;

	// Change locally and update the server
	this.GetAllNotes(function(notes){
		if(notes) {
			that.notes.splice(index, 0, note);
		}
		else {
			that.notes = [];
			that.notes.push(note);
		}
		ChromeHelper.StoreNoteAt(index, note);
	});
};

;

DataCacheHelper.prototype.RemoveNoteAt = function(index) {

	var that = this;

	// Change locally and update the server
	this.GetAllNotes(function(notes){
		if(notes) {
			that.notes.splice(index, 1);
			ChromeHelper.RemoveNoteAt(index);
		}
	});
};

DataCacheHelper.prototype.GetNewNoteIndex = function(callback) {
	this.GetAllNotes(function(notes){
		if(notes && (notes.length > 0)) {
			callback(notes[0].id + 1);
		}
		else {
			callback(0);
		}
	});
};

DataCacheHelper.prototype.GetNoteAt = function(index) {
	var desiredNote;
	this.notes.forEach(function(note) {
		if(note.id == index) {
			desiredNote = note;
		}
	});
	return desiredNote;
};

DataCacheHelper.prototype.SetNoteVisibility = function(visibility) {
	this.isNoteVisible = visibility;
	ChromeHelper.StoreNoteVisibility(visibility);
};

DataCacheHelper.prototype.GetNoteVisibility = function(callback) {
	var that = this;
	if(this.isNoteVisible == null) {
		ChromeHelper.RetrieveNoteVisibility(function(visibility) {
			if(visibility == null) {
				// First time
				ChromeHelper.StoreNoteVisibility(true);
				callback(true);
			}
			else {
				that.isNoteVisible = visibility;
				callback(visibility);
			}
		})
	}
	else {
		callback(this.isNoteVisible);
	}
}


