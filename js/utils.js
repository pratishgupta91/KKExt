getTime();
getGreetings();
//getQuote();

function getTime()
{
	var currentdate = new Date();
	var hours = (currentdate.getHours() >= 10) ? currentdate.getHours() : "0" + currentdate.getHours();
	var minutes = (currentdate.getMinutes() >= 10) ? currentdate.getMinutes() : "0" + currentdate.getMinutes();
    var currentTime =  hours + ":" + minutes;
    //document.getElementById("time").innerHTML = currentTime;
}

function GetReminderRatio(created, interval) {
	var curTime = +new Date();
    return (curTime - created)  / interval;
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
	//document.getElementById("greeting").innerHTML = greetingStr + ", Pratish";
}

// function getQuoteFromServer()
// {
// 	//alert("hi");
// 	var req = new XMLHttpRequest();
// 	req.open('GET', 'http://quotes.rest/qod.json', false);
// 	req.send(null);
// 	if(req.status == 200) {
// 		return req.responseText;
// 	}
// }

// function getQuote()
// {
// 	var currentDate = new Date();
// 	var day = currentDate.getDate();
// 	var month = currentDate.getMonth() + 1;
// 	var year = currentDate.getFullYear();
// 	var today = year + "-" + 
// 		((month < 9) ? "0" + month : month) + "-" +
// 		((day < 9) ? "0" + day : day);

// 	var jQuote = "";
// 	chrome.storage.sync.get('quote', function(items) {
// 	    if (chrome.runtime.error || items.quote == "") {
// 	        jQuote = getQuoteFromServer();
//     		chrome.storage.sync.set({'quote' : jQuote});
// 	    }
// 	    else if(JSON.parse(items.quote).contents.quotes[0].date != today){
// 	    	jQuote = getQuoteFromServer();
//     		chrome.storage.sync.set({'quote' : jQuote});
// 	    }
// 	    else{
// 	    	jQuote = items.quote;
// 		}
// 	    var parsedQuote = JSON.parse(jQuote);
// 	    document.getElementById("quote").innerHTML = parsedQuote.contents.quotes[0].quote;
// 	});
// }