function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Max 6 cols
var colHeight = [0, 0, 0, 0, 0, 0];
var toBeRemindedNotes;
jNote = [];

function getPosition(index){
    var grid = $('.grid');
    var boxWidth = grid.children('li').outerWidth(true);
    var gridWidth = grid.outerWidth(true);
    var colCounts = Math.floor(gridWidth / boxWidth);

    var colIndex = (index % colCounts);

    var position = {
      x: boxWidth * colIndex,
      y: colHeight[colIndex]
    };

    var boxHeight = $( "li:eq(" + index + ")" ).outerHeight(true);
    colHeight[colIndex] += boxHeight;
    return position;
}

function notifyActiveReminders() {

    // Get all the intended notes
    var id = 'reminder';
    if (chrome.notifications.getPermissionLevel) {
        chrome.notifications.getPermissionLevel(function (permissionLevel) {
            if (permissionLevel === 'granted') {
                chrome.notifications.create(id, {
                    type: 'list',
                    iconUrl: 'img/delete.png',
                    title: jNote.length + ' notes need attention',
                    message: jNote.length + ' notes need attention.',
                    items: jNote
                }, function(id) {});
            }
        });
    }
}

function reAdjust() {
    colHeight = [0, 0, 0, 0, 0, 0];

    $( "li" ).each(function( index ) {
        var position = getPosition(index);
        $(this).css('left', position.x + "px");
        $(this).css('top', position.y + "px");
    });
}

;(function($) {
    $.fn.addNote = function(options) {
        var text = options.text;
        var textLen = text.length;
        var color = options.color;
        var lastReminded = options.lastReminded;
        var interval = options.interval;
        var isAppend = options.isAppend;
        var boxScript = "<li class='square_box' style='background-color:" + color + "'><div class='mainContent'>" + text + "</div><div class='bottomBar'><img class='delete' src='img/delete.png'></div></li>";

        // Add to grid
        if(isAppend) {this.append(boxScript);}
        else {this.prepend(boxScript);}

        // Set font size
        var fontSize = 20;
        if(textLen < 10) fontSize = 100;
        else if(textLen < 20) fontSize = 70;
        else if(textLen < 30) fontSize = 50;
        else if(textLen < 40) fontSize = 37;
        else if(textLen < 60) fontSize = 30;
        else if(textLen < 90) fontSize = 23;

        var index = 0;

        // Set box positions
        if (isAppend) {
            var listItem = $( "li" ).last();
            var notesCount = $("li").length;
            index = notesCount - 1;
            listItem.css('font-size', fontSize);
            var position = getPosition(index);
            listItem.css('left', position.x + "px");
            listItem.css('top', position.y + "px");
        }
        else {
            var listItem = $( "li" ).first();
            listItem.css('font-size', fontSize);
            reAdjust();
        }
        
        // Empty the text box
        $('#note').val('');

        // Add reminded notes to the array
        if(interval > 0){
            var currentTime = +new Date();
            var intervalInMillis = (interval * 60 * 60 * 1000);
            if((currentTime - lastReminded) > intervalInMillis) {
                jNote.push({
                    "title": text,
                    "message": (interval + " hours")
                });
            }
        }
    };

    $.fn.expandCreateBox = function() {
        $('#done').show();
        $('#remindertime').show();
        $(this).height(100);
        buttonWidth = $('#done').outerWidth(true);
        buttionRightPos = parseInt($('#done').css('right'));
        reminderWidth = $('#remindertime').outerWidth(true);
        $('#remindertime').css('right', (buttonWidth + buttionRightPos) + "px");
    };

    $.fn.contractCreateBox = function() {
        $('#done').hide();
        $('#remindertime').hide();
        $(this).css('height','auto');
    };

})(jQuery);

$(document).ready(function() {
    var grid = $('.grid');
    var isDeleteClicked = false;
    var isNotesLoaded = false;

    var colors = ['#FF8A80', '#80D8FF', '#FFFF8D', '#FFD180', '#CED7DB', '#A7FFEB', '#CCFF90'];

    // Load all the notes
    chrome.storage.sync.get('notes', function(items) {
        if (!chrome.runtime.error) {
            var count = items.notes.length;
            jNote = [];
            for(var i = 0; i < items.notes.length; ++i){
                grid.addNote({
                    "text" : items.notes[i].text,
                    "color": items.notes[i].color,
                    "lastReminded": items.notes[i].lastReminded,
                    "interval" : items.notes[i].interval,
                    "isAppend": true});
            }

            notifyActiveReminders();
        }
        isNotesLoaded = true;
    });

    // Contract note create box
    $('#createBox').contractCreateBox();
    
    // If clocked on note edit text, then expand
    $('#note').click(function(){
        $("#createBox").expandCreateBox();
    });

    // If clicked on done button, 
    // 1. if no text then contract CreateBox
    // 2. else, add note, save to chrome and then contract
    $('#done').click(function(){    

        // Get notes data
        var text = $('#note').val();
        var reminderTime = parseInt($('select[name=remindertime]').val());
        var currentTime = +new Date();

        if((text.length > 0)) {
            var randomColorIndex = getRandomInt(0, (colors.length - 1));

            // Add note
            grid.addNote({
                "text": text,
                "color": colors[randomColorIndex],
                "lastReminded": currentTime,
                "interval" : reminderTime,
                "isAppend": false});
            
            // Save to chrome
            chrome.storage.sync.get('notes', function(items) {
                if (chrome.runtime.error) {
                    jNote = [];
                    jNote.push({
                        "text": text,
                        "color": colors[randomColorIndex],
                        "lastReminded": currentTime,
                        "interval" : reminderTime
                    });

                    chrome.storage.sync.set({'notes' : jNote});                
                }
                else{
                    items.notes.splice(0, 0, {
                        "text": text,
                        "color": colors[randomColorIndex],
                        "lastReminded": currentTime,
                        "interval" : reminderTime
                    });
                    chrome.storage.sync.set({'notes' : items.notes});
                }
            });
        }
        $('#createBox').contractCreateBox();
    });

    // Event listeners for delete
    grid.on('click', 'li', function () {
        if(isDeleteClicked){
            $(this).remove();

            // Readjust the boxes
            reAdjust();
            isDeleteClicked = false;
        }
    });


    grid.on('click', '.delete', function(e) {
        var clickedIndex = $(this).closest('li').index();
        isDeleteClicked = true;

        // Delete from chrome
        chrome.storage.sync.get('notes', function(items) {
            items.notes.splice(clickedIndex, 1);
            chrome.storage.sync.set({'notes' : items.notes});
        });
    });
});

$( window ).resize(function() {
  reAdjust();
});