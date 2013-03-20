 $(document).ready(function() {

 	var API_KEY = "zZS7bbI3ecCfoYcxwoEtdkGDWEEmNlD2YR246WAQcbyXcvp6Rx";

 	var theWindow        = $(window);
	var $bg              = $("#bg");
	var aspectRatio      = $bg.width() / $bg.height();

 	jQuery.ajaxSetup({
  		beforeSend: function() {
     		$('#loading').show();
  		},
  		complete: function(){
     		$('#loading').hide();
  		},
	});
 
 	function createNTCRD(){

 		var name = $(":text").attr("value");
 		var photo_url = "http://api.tumblr.com/v2/blog/" + name + ".tumblr.com/posts/photo?api_key=" + API_KEY + "&notes_info=true&callback=?";
 		var quote_url = "http://api.tumblr.com/v2/blog/" + name + ".tumblr.com/posts/quote?api_key=" + API_KEY + "&notes_info=true&callback=?";
 		var audio_url = "http://api.tumblr.com/v2/blog/" + name + ".tumblr.com/posts/audio?api_key=" + API_KEY + "&notes_info=true&callback=?";
 		var photo;
 		var audio;
 		var quote;
 		var source;

 		$.getJSON(photo_url, function(data) {
 			console.log(data);
 			photo = findMostNotes(data.response.posts);

 			$("#bg").attr("src", data.response.posts[photo].photos[0].original_size.url);
 			
 		});

 		$.getJSON(quote_url, function(data) {

 			quote = findMostNotes(data.response.posts);

 			$("#quote-text").append(data.response.posts[quote].text);
 			$("#quote-source").append("- " + data.response.posts[quote].source);

 		});
 
 		$("form").hide();

	}

	function resizeBg() {
		
		if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
		    $bg
		    	.removeClass()
		    	.addClass('bgheight');
		} else {
		    $bg
		    	.removeClass()
		    	.addClass('bgwidth');
		}
					
	}

	function findMostNotes(posts){

		var index = 0;

		for (var i = 1; i < posts.length; i++) {
			if(posts[i].note_count > posts[index].note_count){
				index = i;
			} 
		}

		return index;

	}
	                   			
	theWindow.resize(resizeBg).trigger("resize"); 

 	$(":text").keydown(function(event){

 		if(event.keyCode == 13){

 			event.preventDefault();
 			createNTCRD();

		};
 	});

 	$(":button").click(function () {
 		createNTCRD();

 	});
});