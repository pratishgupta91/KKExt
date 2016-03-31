function TagBandBoxHelper() {

}

TagBandBoxHelper.prototype.GetTagBoxCount = function() {
	return $(TagBox_CN).length;
};


function TagBandHelper() {
	var tagContainer;
}

TagBandHelper.prototype.Initialize = function() {
	this.tagContainer = $(TagConainer_CN);
};