$(function(){
	var page = 1;
	var query = "matrix";
    $.ajax({
    	url: 'http://www.omdbapi.com/?s=' + query + '&type=movie&page=1',

    	type: "GET",

    	dataType : "json",

    }).done(function(data) {
    	if(data.Search) {
    		for(var i = 0; i < data.Search.length; i++) {
    			$("body").append( "<div class=movie></div>");
    			x = $(".movie")[i];
    			$(x).attr('id', i).append(data.Search[i].Title, data.Search[i].Year );
    		}
    	} else {
    		$("body").append( "<div class=error>Sorry, no movies match your search</div>");
    	}

    	$(window).scroll(function() {
    		
   		if($(window).scrollTop() + $(window).height() == $(document).height()) {
   			page ++;
   			callAjax(page, query); 		
   		}
	});
  		}).always(function( xhr, status ) {
    		console.log( "The request is complete!" );
  		});
});



var callAjax = function(page, query) { 
	$.ajax( {
		url: 'http://www.omdbapi.com/?s=' + query + '&type=movie&page=' + page,

    	type: "GET",

    	dataType : "json",
	}).done(function(data) {
		if(data.Search) {
    		for(var i = 0; i < data.Search.length; i++) {	
    			$("body").append( "<div class=movie></div>");
    			y = $(".movie").length - 1;
    			x = $(".movie")[y];
    			$(x).attr('id', y ).append(data.Search[i].Title, data.Search[i].Year );
    		}
    	} else if(!$(".error")[0]) {
    		$("body").append( "<div class=error>No more movies match your search</div>");
    	}
	})
}