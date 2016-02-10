getTime();
getGreetings();
getQuote();

function getTime()
{
	var currentdate = new Date();
	var hours = (currentdate.getHours() >= 10) ? currentdate.getHours() : "0" + currentdate.getHours();
	var minutes = (currentdate.getMinutes() >= 10) ? currentdate.getMinutes() : "0" + currentdate.getMinutes();
    var currentTime =  hours + ":" + minutes;
    document.getElementById("time").innerHTML = currentTime;
}

function getGreetings()
{
	var greetingStr = "";
	var date = new Date();
	var hours = date.getHours();

	if(hours < 12)
	{
		greetingStr = "Good Morning";
    }
	else if(hours < 17)
	{
		greetingStr = "Good Afternoon";
	}
	else
	{
		greetingStr = "Good Evening";
	}
	document.getElementById("greeting").innerHTML = greetingStr + ", Kaur";
}

function getQuote()
{
	var currentDate = new Date();
	var day = currentDate.getDate();
	var month = currentDate.getMonth();
	var year = currentDate.getFullYear();
	var today = day + "" + month + "" + year;
	var quote = "";

	chrome.storage.sync.get("quoteLastUpdated", function(items) {}
	    if (!chrome.runtime.error) {
	    	if(items.data == today) {
	    		chrome.storage.sync.get("quote", function(qitems) {
			    if (!chrome.runtime.error) {
			    	quote = qitems.data;
			    }
			}
	    }
	    else {
	    	chrome.storage.sync.set({'quoteLastUpdated': today}, function() {});
	    	var req = new XMLHttpRequest();
			req.open('GET', 'http://quotes.rest/qod.json', false);
			req.send(null);
			if(req.status == 200) {
				var jsonResponse =  req.responseText;
				alert(jsonResponse);
				var quote = jsonResponse;//.contents;//["quotes"][0]["quote"];
				document.getElementById("greeting").innerHTML = quote;
		    }
	    }
    });
}