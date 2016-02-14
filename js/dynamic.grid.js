//addNote("Hi addedsafasfasfasdfd 3 gtdyusag gf sjadf sdfjg sdfjas dfjksd fsdjfsdjfjsdgf jgjasdgf jsdf jsdgfj 1", "6", "6");
//addNote("Hi added 2", "6", "7");
//addNote("Hi addedsafasfasfasdfd 3 gtdyusag gf sjadf sdfjg sdfjas dfjksd fsdjfsdjfjsdgf jgjasdgf jsdf jsdgfj", "6", "8");
//addNote("Hi addedsafasfasfasdfd 3 gtdyusag gf sjadf sdfjg sdfjas dfjksd fsdjfsdjfjsdgf jgjasdgf jsdf jsdgfj", "6", "9");

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
    };

    $.fn.addNote = function(options) {
    	var text = options.text;
        var textLen = text.length;
    	var color = options.color;
    	var id = options.id;
        var boxScript = "<div class='box' id='box" + id + "'><span>" + text + "</span><div class='bottomBar' id='bottomBar" + id + "'><div class='icons' id='icons" + id + "'><img class='icon' id='delete" + id + "' src='img/delete.png'></div></div></div>";
        this.append(boxScript);
        var boxId = "#box" + id;
        var fontSize = 20;
        if(textLen < 10) fontSize = 100;
        else if(textLen < 20) fontSize = 70;
        else if(textLen < 30) fontSize = 50;
        else if(textLen < 40) fontSize = 37;
        else if(textLen < 60) fontSize = 30;
        else if(textLen < 90) fontSize = 23;
        $(boxId).css('font-size', fontSize);
        $(boxId).css('background-color', color);
    };

    $.fn.expandCreateBox = function() {
        $('#done').show();
        $(this).height(100);
    };

    $.fn.contractCreateBox = function() {
        $('#done').hide();
        $(this).css('height','auto');
    };

    $.fn.handlerIn = function() {
        $('.icons').hide();
    };

    $.fn.handlerOut = function() {
        $('.icons').show();
    };
})(jQuery);

//x2 + ax + 100 = 0
//y = h - 5t2
//x = ut
//y = h - 5x2/u2
$(document).ready(function() {
    // $('#col1').addNote(
    //     {text : "Hi a", 
    //      color: "#67CCDE",
    //      id: "0"});

    // $('#col2').addNote(
    //     {text : "Hibjkhh khkhkh kjh kk kjhk hkh khkj hkh kh  a", 
    //      color: "#F56743",
    //      id: "1"});

    // $('#col3').addNote(
    //     {text : "Hi, my name ih. What should I do?", 
    //      color: "#F1EE23",
    //      id: "2"});

    // $('#col1').addNote(
    //     {text : "Hi, my name ih. What should I do?", 
    //      color: "#F1EE23",
    //      id: "3"});

    $('#createBox').contractCreateBox();
    
    $('#note').click(function(){
        $("#createBox").expandCreateBox();
    });

    $('#done').click(function(){
        var text = $('#note').val();
        if(text.length > 0) {
            var numBoxes = $('.box').length;
            var colId = '#col' + ((numBoxes % 3) + 1);
            $(colId).addNote({text : text, color: "#fff", id: numBoxes});
            $('#note').val('');

            $('#icons' + numBoxes).hide();
            $('#box' + numBoxes).mouseenter( function() {
                $('#icons' + numBoxes).show();
            });
         
            $('#box' + numBoxes).mouseleave( function() {
                $('#icons' + numBoxes).hide();
            });

            $('#delete' + numBoxes).click( function() {
                $('#box' + numBoxes).hide();
                // Todo remove
            });
        }
        $('#createBox').contractCreateBox();
    });
});

