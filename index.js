 $(document).ready(function() {

 	var API_KEY = "zZS7bbI3ecCfoYcxwoEtdkGDWEEmNlD2YR246WAQcbyXcvp6Rx";

 	var theWindow        = $(window);
	var $bg              = $("#bg");
	var aspectRatio      = $bg.width() / $bg.height();

	if(window.location.href.split( '?' )[1] != null){
 		createNTCRD();
 	} 

 	function createNTCRD(){

 		var name = window.location.href.split( '?' )[1];
 		var photo_url = "http://api.tumblr.com/v2/blog/" + name + ".tumblr.com/posts/photo?api_key=" + API_KEY + "&notes_info=true&callback=?";
 		var quote_url = "http://api.tumblr.com/v2/blog/" + name + ".tumblr.com/posts/quote?api_key=" + API_KEY + "&notes_info=true&callback=?";
 		var audio_url = "http://api.tumblr.com/v2/blog/" + name + ".tumblr.com/posts/audio?api_key=" + API_KEY + "&notes_info=true&callback=?";
 		var photo;
 		var audio;
 		var quote;
 		var source;
 		var count = 2;

 		$('#loading').show();

 		$.getJSON(photo_url, function(data) {

 			if(data.meta.status === 200){

 				photo = findMostNotes(data.response.posts);
 				$("#bg").attr("src", data.response.posts[photo].photos[0].original_size.url);
 				count--;

 				if (count === 0){
 					showNTCRD();
 				};

 			}else{
	 			requestFailed();
	 		};

 		});

 		$.getJSON(quote_url, function(data) {

 			if(data.meta.status === 200){

	 			quote = findMostNotes(data.response.posts);
	 			$("#quote-text").append(data.response.posts[quote].text);
	 			$("#quote-source").append("- " + data.response.posts[quote].source);

	 			count--;

	 			if (count === 0){
	 				showNTCRD();
	 			};
	 		}else{
	 			requestFailed();
	 		};

 		});

	}

	function showNTCRD(){
		$('#loading').hide();
		$("form").hide();
		$("#quote").show();
		$("#bg").show();
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

	function requestFailed(){
		window.location = "./fail.html";
	}
	                   			
	theWindow.resize(resizeBg).trigger("resize"); 

 	$(":text").keydown(function(event){

 		if(event.keyCode == 13){

 			event.preventDefault();
 			history.pushState(null, null, "?" + $(":text").attr("value"));
 			createNTCRD();

		};
 	});

 	$(":button").click(function () {
 		history.pushState(null, null, "?" + $(":text").attr("value"));
 		createNTCRD();

 	});

});