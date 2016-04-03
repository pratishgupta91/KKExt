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

/* static */ TagBoxHelper.SetTagBoxUnselectedStyle = function(boxElem) {
    boxElem.css("background-color", "#ffffff");
    boxElem.css("color", "darkgray");
};

/* static */ TagBoxHelper.SetTagBoxSelectedStyle = function(boxElem) {
    boxElem.css("background-color", "#00cccc");
    boxElem.css("color", "white");
};

function TagBandHelper() {
    var tagContainer;
    var selectedTagIndex;
}

TagBandHelper.prototype.Initialize = function() {
    this.tagContainer = $(TagConainer_CN);
    this.selectedTagIndex = ALL_TAGS;
};

TagBandHelper.prototype.GetTagBandElem = function() {
    return this.tagContainer;
};

TagBandHelper.prototype.GetTagBoxElem = function(index) {
    return this.tagContainer.find(TagBox_CN).eq(index);
};

TagBandHelper.prototype.GetTagBoxHeight = function(index) {
    return this.GetTagBoxElem(index).outerHeight(true);
};

TagBandHelper.prototype.GetTagBoxWidth = function(index) {
    return this.GetTagBoxElem(index).outerWidth(true);
};

TagBandHelper.prototype.GetTagBoxCount = function() {
    return TagBoxHelper.GetTagBoxClass().length;
}

TagBandHelper.prototype.CreateTagBox = function(tagName, noteCount, tagColor) {

    var box  = "<li class='tag_box'>";
    box += "<div class='tag_box_big_text'>" + tagName + "</div>";
    box += "<div class='note_count'>" + noteCount;
    box += "</div>";
    box += "</li>";
    return box;
}

TagBandHelper.prototype.AppendTagBox = function(tagName, noteCount, tagColor) {
    if(noteCount > 0) {
        var boxScript = this.CreateTagBox(tagName, noteCount, tagColor);
        this.GetTagBandElem().append(boxScript);
    }
};

TagBandHelper.prototype.TagBoxClicked = function(index) {
    var prevIndex = this.selectedTagIndex;
    this.selectedTagIndex = index;
    if(prevIndex != ALL_TAGS) {
        var prevSelectedBox = this.GetTagBoxElem(prevIndex);
        TagBoxHelper.SetTagBoxUnselectedStyle(prevSelectedBox);
    }

    var selectedBox = this.GetTagBoxElem(index);
    TagBoxHelper.SetTagBoxSelectedStyle(selectedBox);
};

TagBandHelper.prototype.GetSelectedIndex = function() {
    return this.selectedTagIndex;
};

TagBandHelper.prototype.RemoveAllTagBoxes = function() {
    $(TagBox_CN).remove();
};