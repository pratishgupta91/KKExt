function TagBoxHelper() {

}

/* static */ TagBoxHelper.GetTagBoxCount = function() {
	return $(TagBox_CN).length;
};

/* static */ TagBoxHelper.GetTagBoxClass = function() {
	return $(TagBox_CN);
};

/* static */ TagBoxHelper.GetTagBoxIndex = function(boxElem) {
	return boxElem.index();
};

function TagBandHelper() {
	var tagContainer;
	var tags;
}

TagBandHelper.prototype.Initialize = function() {
	this.tagContainer = $(TagConainer_CN);
};

TagBandHelper.prototype.GetAllNotes = function() {
};

TagBandHelper.prototype.GetTagBandElem = function() {
	return this.tagContainer;
};