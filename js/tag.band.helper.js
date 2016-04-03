function TagBoxHelper() {

}

/* static */ TagBoxHelper.GetTagBoxCount = function() {
    return $(TagBox_CN).length;
};

/* static */ TagBoxHelper.GetTagBoxClass = function() {
    return TagBox_CN;
};

/* static */ TagBoxHelper.GetTagBoxIndex = function(boxElem) {
    return boxElem.index();
};

function TagBandHelper() {
    var tagContainer;
}

TagBandHelper.prototype.Initialize = function() {
    this.tagContainer = $(TagConainer_CN);
};

TagBandHelper.prototype.GetAllNotes = function() {
};

TagBandHelper.prototype.GetTagBandElem = function() {
    return this.tagContainer;
};

TagBandHelper.prototype.CreateTagBox = function(tagName, noteCount, tagColor) {

    var box  = "<li class='tag_box' style='background-color:" + tagColor + "'>";
    box += "<div class='tag_box_bottom_bar'>";
    box += "<div class='tag_name'>" + tagName + "</div>";
    box += "<div class='tag_box_bottom_bar_separator'>&middot;</div>";
    box += "<div class='tag_note_count'>" + noteCount + " notes</div>";
    box += "</div>";
    box += "</li>";
    return box;
}

TagBandHelper.prototype.AppendTagBox = function(tagName, noteCount, tagColor) {
    var boxScript = this.CreateTagBox(tagName, noteCount, tagColor);
    this.GetTagBandElem().append(boxScript);
};