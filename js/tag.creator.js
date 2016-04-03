function TagCreator () {
}

/* static */ TagCreator.CreateTag = function(tagIndex, noteCount) {
	var tag = 
		{
			ID_TAG_INDEX: tagIndex,
			ID_TAG_NOTE_COUNT: noteCount
		};
	return tag;
};