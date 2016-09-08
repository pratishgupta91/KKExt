function DynamicGrid() {

	// Private members
	var gridElem;
	var gridWidth = 0;
	var columnCount = 0;
	var boxWidth = 0;

	// Max 7 cols supported
	var columnHeights;
	var boxPos;

	// Functions
	this.InitGridElem = function() {
		this.gridElem = $('.grid');
		this.columnHeights = [0, 0, 0, 0, 0, 0, 0];
        this.boxPos = new Array();
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
    var position = {
		left: this.boxPos[index][0],
		top: this.boxPos[index][1]
	};

	return position;
};

// Set the position of box
DynamicGrid.prototype.SetBoxPositionAt = function(box, position) {
    box.css('left', position.left + 'px');
    box.css('top', position.top + 'px');
};

// Reset Column heights
DynamicGrid.prototype.ResetColHeights = function() {
	this.columnHeights = [0, 0, 0, 0, 0, 0, 0];
};

DynamicGrid.prototype.LoopBoxes = function(callback) {
    $('.square_box').each(function(index) {
        callback(index);
    });
};

// Readjust all positions
DynamicGrid.prototype.ReadjustBoxPositions = function() {
    this.boxPos.length = 0;
    this.ResetColHeights();
    var that = this;

    this.LoopBoxes( function (index) {
        var colIndex = (index % that.GetColCount());
        var left = (that.GetBoxWidth(index) * colIndex);
        var top = that.columnHeights[colIndex];
        that.boxPos.push([left, top]);
        that.columnHeights[colIndex] += that.GetBoxHeight(index);
    });
};

DynamicGrid.prototype.ReadjustAndAnimate = function(operatedBoxPos, operation) {
    
    // 1. Readjust box positions to get new positions
    this.ReadjustBoxPositions();
    var that = this;

    // 2. Set the new positions
    this.LoopBoxes(function(index) {
        var box = that.GetBoxElem(index);
        var newPos = that.GetBoxPositionAt(index);
        var oldPos = box.position();

        box.animate({
            left: newPos.left,
            top: newPos.top
        }, 200, function() {});
        
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

DynamicGrid.prototype.SetReminderWidth = function(boxElem, ratio) {
	var reminderBarElem = boxElem.find(ReminderBar_CN);
	var boxWidth = boxElem.outerWidth(true);
	var reminderWidth = ratio * boxWidth;

	if(reminderWidth < boxWidth) {
		reminderBarElem.css("width", reminderWidth + "px");
	}
}

// Create box script
DynamicGrid.prototype.CreateBox = function(text, color) {
	var boxScript = "<li class='square_box' style='background-color:" + color + "'>";
	boxScript += "<div class='reminder-bar'></div>";
	boxScript += "<div class='mainContent'>" + text + "</div>";
	boxScript += "<div class='bottomBar'>";
	boxScript += "<i class='fa fa-times fa-lg delete'></i>";
	boxScript += "<i class='fa fa-clock-o fa-lg reminder_icon'></i>";
	boxScript += "</div></li>";
	return boxScript;
};

// Append a box
DynamicGrid.prototype.AppendAndPositionBox = function(text, color, reminderRatio, id) {

	// 1. Add box to grid at pos (0, 0)
	var boxScript = this.CreateBox(text, color);
	this.gridElem.append(boxScript);

	// 2. Set Font size
	var index = (this.GetBoxCount() - 1);
	var appendedBox = this.GetBoxElem(index);
	this.SetFontSize(appendedBox, text.length);

	// 3. Set reminder
	this.SetReminderWidth(appendedBox, reminderRatio);

	// 4. Position the box at appropriate coordinates
    this.ReadjustAndAnimate(index, INSERT_BOX);
};

// Prepend a box
DynamicGrid.prototype.PrependAndPositionBox = function(text, color, reminderRatio, id) {

	// 1. Add box to grid at pos (0, 0)
	var boxScript = this.CreateBox(text, color);
	this.gridElem.prepend(boxScript);

	// 2. Set Font size
	var prependedBox = this.GetBoxElem(0 /* index */);
	this.SetFontSize(prependedBox, text.length);

	// 3. Set reminder
	this.SetReminderWidth(prependedBox, reminderRatio);

	// 4. Readjust all boxes
	this.ReadjustAndAnimate(0, INSERT_BOX);
};

// Remove a box at index = [index] from grid
DynamicGrid.prototype.RemoveBox = function(box) {
	// Remove the box and readjust
	box.remove();
	this.ReadjustAndAnimate(0, DELETE_BOX);
};

DynamicGrid.prototype.RemoveAllBoxes = function() {
	$(SquareBox_CN).remove();
};


