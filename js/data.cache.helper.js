function DataCacheHelper () {
	var tags;
	var notes;
}

DataCacheHelper.prototype.GetAllTags = function() {
	this.tags = ["Work", "Personal", "Others"];
	return this.tags;
};

DataCacheHelper.prototype.GetTagAt = function(index) {
	return this.tags[index];
};

DataCacheHelper.prototype.GetAllNotes = function(callback) {

	// If already cached then return cached notes
	if(this.notes) {
		callback(this.notes);
	}
	else {
		var that = this;
		ChromeHelper.RetrieveNotes(function(items) {
			if(items && items.notes) {
				that.notes = items.notes;
				callback(that.notes);
			}
			else {
				callback(null);
			}
		});
	}
};

DataCacheHelper.prototype.GetTagSpecificNotes = function(tagIndex, callback) {
	var tag = this.GetTagAt(tagIndex);

	this.GetAllNotes(function(notes){
		if(notes) {
			var tagSpecificNotes = new Array();
			notes.forEach(function(note) {
				if(note.tag == tag) {
					tagSpecificNotes.push(note);
				}
			});
			callback(tagSpecificNotes);
		}
	});
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

DataCacheHelper.prototype.RemoveNoteAt = function(index) {

	var that = this;

	// Change locally and update the server
	this.GetAllNotes(function(notes){
		if(notes) {
			for(var i = 0; i < notes.length; ++i) {
				if(notes[i].id == index) {
					that.notes.splice(i, 1);
					ChromeHelper.RemoveNoteAt(i);
					break;
				}
			}
			
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
