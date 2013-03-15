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
 		var url = "http://api.tumblr.com/v2/blog/" + name + ".tumblr.com/posts/photo?api_key=" + API_KEY + "&notes_info=true&callback=?";
 		var image = "http://25.media.tumblr.com/e49d042bb128a120d447c7812e2914c7/tumblr_mjiqgrsKVX1r0ix14o1_r5_400.gif";
 		var song;
 		var quote = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.";
 		var source = "Lorem Ipsum";

 		$.getJSON(url, function(data) {

 			$("#bg").attr("src", image);
 			$("#quote-text").append(quote);
 			$("#quote-source").append("- " + source);
 			$("form").hide();
 			console.log(data);
 			

 		});

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