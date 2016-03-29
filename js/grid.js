function DynamicGrid() {

	// Private members
	var gridElem;
	var gridWidth = 0;
	var columnCount = 0;
	var boxWidth = 0;

	// Max 7 cols supported
	var columnHeights;

	// Functions
	this.InitGridElem = function() {
		this.gridElem = $('.grid');
		this.columnHeights = [0, 0, 0, 0, 0, 0, 0];
	}
}

// Initialize the grid
DynamicGrid.prototype.Initialize = function() {
	this.InitGridElem();
};

// Get grid element
DynamicGrid.prototype.GetGridElem = function() {
	return this.gridElem;
};

// Get grid width
DynamicGrid.prototype.GetGridWidth = function() {
	return this.gridElem.outerWidth(true);
};

// Get box elem with index = [index] in the grid
DynamicGrid.prototype.GetBoxElem = function(index) {
	return this.gridElem.find('.square_box').eq(index);
}

// Get width of box with index = [index] in the grid
DynamicGrid.prototype.GetBoxWidth = function(index) {
	return this.GetBoxElem(index).outerWidth(true);
};

// Get height of box with index = [index] in the grid
DynamicGrid.prototype.GetBoxHeight = function(index) {
	return this.GetBoxElem(index).outerHeight(true);
};

// Get number of columns in the grid
DynamicGrid.prototype.GetColCount = function() {
	return Math.floor(this.GetGridWidth() / this.GetBoxWidth(0));
};

// Get number of boxes
DynamicGrid.prototype.GetBoxCount = function() {
	return $('.square_box').length;
};

// Get position of new box with index = [index] in the grid
DynamicGrid.prototype.GetBoxPositionAt = function(index) {
	var colIndex = (index % this.GetColCount());

	var position = {
		x: this.GetBoxWidth(index) * colIndex,
		y: this.columnHeights[colIndex]
	};

	this.columnHeights[colIndex] += this.GetBoxHeight(index);
	return position;
};

// Set the position of box
DynamicGrid.prototype.SetBoxAt = function(box, index) {
	var position = this.GetBoxPositionAt(index);
	box.css('left', position.x + 'px');
	box.css('top', position.y + 'px');
};

// Reset Column heights
DynamicGrid.prototype.ResetColHeights = function() {
	this.columnHeights = [0, 0, 0, 0, 0, 0, 0];
};

// Readjust all boxes
DynamicGrid.prototype.ReadjustBoxes = function() {
	this.ResetColHeights();
	var that = this;

	$('.square_box').each(function(index) {
		that.SetBoxAt($(this), index);
	});
};

DynamicGrid.prototype.SetFontSize = function(box, textLength) {

	// Set font size
	var fontSize = 20;
	if(textLength < 10) fontSize = 100;
	else if(textLength < 20) fontSize = 70;
	else if(textLength < 30) fontSize = 50;
	else if(textLength < 40) fontSize = 37;
	else if(textLength < 60) fontSize = 30;
	else if(textLength < 90) fontSize = 23;

	box.css('font-size', fontSize);
};

// Create box script
DynamicGrid.prototype.CreateBox = function(text, color) {
	var boxScript = "<li class='square_box' style='background-color:" + color + "'>";
	boxScript += "<div class='mainContent'>" + text + "</div>";
	boxScript += "<div class='bottomBar'>";
	boxScript += "<i class='fa fa-times fa-lg delete'></i>";
	boxScript += "<i class='fa fa-clock-o fa-lg reminder_icon'></i>";
	boxScript += "</div></li>";
	return boxScript;
};

// Append a box
DynamicGrid.prototype.AppendAndPositionBox = function(text, color, interval) {

	// 1. Add box to grid at pos (0, 0)
	var boxScript = this.CreateBox(text, color);
	this.gridElem.append(boxScript);

	// 2. Set Font size
	var index = (this.GetBoxCount() - 1);
	var appendedBox = this.GetBoxElem(index);
	this.SetFontSize(appendedBox, text.length);
	appendedBox.data(IS_REMINDER, ((interval > 0) ? true : false));

	// 3. Position the box at appropriate coordinates
	this.SetBoxAt(appendedBox, index);

};

// Prepend a box
DynamicGrid.prototype.PrependAndPositionBox = function(text, color, interval) {

	// 1. Add box to grid at pos (0, 0)
	var boxScript = this.CreateBox(text, color);
	this.gridElem.prepend(boxScript);

	// 2. Set Font size
	var prependedBox = this.GetBoxElem(0 /* index */);
	this.SetFontSize(prependedBox, text.length);
	prependedBox.data(IS_REMINDER, ((interval > 0) ? true : false));

	// 3. Readjust all boxes
	this.ReadjustBoxes();
};

// Remove a box at index = [index] from grid
DynamicGrid.prototype.RemoveBox = function(box) {
	// Remove the box and readjust
	box.remove();
	this.ReadjustBoxes();
};



