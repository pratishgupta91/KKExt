function QuoteHelper() {
	var quoteElem;
}

QuoteHelper.prototype.Initialize = function() {
	this.quoteElem = $('#quote');
};

QuoteHelper.prototype.GetQuoteFromServer = function(callback) {
	console.log("server");

	$.ajax({url: "http://quotes.rest/qod.json", success: function(result){
		callback(result.contents.quotes[0].quote);
	}});
	//callback("ll");
};

QuoteHelper.prototype.CreateQuote = function(quote) {
	var quote = {
		"text": quote,
		"lastUpdated": +new Date()
	};
	return quote;
};

QuoteHelper.prototype.IsServerRequestNeeded = function(lastUpdated) {
	var curTime = +new Date();
	var tenHoursInMillis = (10 * 60 * 60 * 1000); 
	if((curTime - lastUpdated) > tenHoursInMillis) {
		return true;
	}
	return false;
};

QuoteHelper.prototype.SetQuote = function(quote) {
	//this.quoteElem.text(quote);
};

