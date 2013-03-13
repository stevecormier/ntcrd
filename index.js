 $(document).ready(function() {
 
 	var api_key = "zZS7bbI3ecCfoYcxwoEtdkGDWEEmNlD2YR246WAQcbyXcvp6Rx";
 	var name = "chillbutdip";
 	var url = "http://api.tumblr.com/v2/blog/" + name + ".tumblr.com/posts/photo?api_key=" + api_key + "&notes_info=true&callback=?";
	
 	$.getJSON(url, function(data) {

 		console.log(data);

 	});

 });