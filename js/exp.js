;(function($) {
    
    var gridObj;

    function Grid (gridWidth, boxWidth, boxMargin) {
        this.gridWidth = gridWidth;
        this.boxWidth = boxWidth;
        this.boxes = 0;
        this.colHeights = [];
        this.cols = (gridWidth / (boxWidth + boxMargin));
        this.getGridWidth = function(){
            return this.gridWidth;
        };
        this.addBox = function(boxHeight){
            var colIndex = this.boxes % this.cols;
            this.colHeights[colIndex] += boxHeight;
            this.boxes++;
        };
    }

    function getGrid() {
        if(!gridObj){
            gridObj = new Grid(300, 100, 0);
        }
        return gridObj;
    }

    $.fn.addBoxAndRefresh = function () {
        var grid = getGrid();
        var boxScript = "<div class='box' id='box" + grid.boxes + "'><span>" + "text" + "</span></div>";
        this.prepend(boxScript);
        $('#box' + grid.boxes).css({ 
            position: "absolute",
            marginLeft: 0, marginTop: 0,
            top: 0, left: 0
        })

        for(var i = 0; i < grid.boxes; i++){
            
            $('#box' + i).css({ 
                top: 0, left: 0
            });
        }
        $('#lol').css({ 
            position: "absolute",
            marginLeft: 0, marginTop: 0,
            top: 0, left: 0
        })
    }

    $.fn.initialize = function() {
        var grid = getGrid();
        grid.addBox(20);
        var x = 0;
    };

})(jQuery);

$(document).ready(function() {
    $('containerGrid').initialize();
});

