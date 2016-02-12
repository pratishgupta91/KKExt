addNote("Hi addedsafasfasfasdfd 3 gtdyusag gf sjadf sdfjg sdfjas dfjksd fsdjfsdjfjsdgf jgjasdgf jsdf jsdgfj 1", "6", "6");
addNote("Hi added 2", "6", "7");
addNote("Hi addedsafasfasfasdfd 3 gtdyusag gf sjadf sdfjg sdfjas dfjksd fsdjfsdjfjsdgf jgjasdgf jsdf jsdgfj", "6", "8");
addNote("Hi addedsafasfasfasdfd 3 gtdyusag gf sjadf sdfjg sdfjas dfjksd fsdjfsdjfjsdgf jgjasdgf jsdf jsdgfj", "6", "9");

;(function($) {
    $.fn.textfill = function(options) {
        var fontSize = options.maxFontPixels;
        var ourText = $('span:visible:first', this);
        var maxHeight = $(this).height();
        var maxWidth = $(this).width();
        var textHeight;
        var textWidth;
        do {
            ourText.css('font-size', fontSize);
            textHeight = ourText.height();
            textWidth = ourText.width();
            fontSize = fontSize - 1;
        } while ((textHeight > maxHeight || textWidth > maxWidth) && fontSize > 3);
        return this;
    }

    $.fn.addNote = function(options) {
    	var text = options.text;
    	var color = options.color;
    	var id = options.id;
    	colId += ((id % 3) + 1);
		$(colId).append(makeNote(text, color, id));
		var boxId = "#box" + id; 
    }

    $.fn.makeNote = function(options) {
    	var text = options.text;
    	var color = options.color;
    	var id = options.id;
    	var boxScript = "<div class='box' id='box" + id + "'><span>" + text + "</span></div>";
		return boxScript;
    }

})(jQuery);


function makeNote(text, color, id)
{
	var boxScript = "<div class='box' id='box" + id + "'><span>" + text + "</span></div>";
	return boxScript;
}

function addNote(text, color, id)
{
	var colId = "#col";
	colId += ((id % 3) + 1);
	var column = document.getElementById(colId);
	$(colId).append(makeNote(text, color, id));
	var boxId = "#box" + id; 
	//$(boxId).textfill({ maxFontPixels: 36 });
}

$(document).ready(function() {
    $('.box').textfill({ maxFontPixels: 36 });
});