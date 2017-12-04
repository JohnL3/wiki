$('document').ready(function(){
	var _input = $('#input');
	var _ul = $('ul');
	var idName = 0;
	var olIdName = 0;
	
	var wiki = {
		myUrl: "https://en.wikipedia.org/w/api.php?action=opensearch&format=jsonfm&search=",
		myUrlb:"&namespace=0&limit=5&format=json",
		input: document.getElementById('input'),
		search: "",
		myUrlC:"&namespace=0&limit=20&format=json"
	};
	
	// for when typing in input box
	_input.keyup(function(e) {
	  
	  var code = e.keyCode || e.which;
	  // if used to stop the enter key up triggering here
	  if(code != 13){
	      if(code != 40) {
	          if(code != 38){
		            var regE = /^[A-Za-z\s\0-9]+$/;
              	wiki.search = wiki.input.value;
	                if(regE.test(wiki.search))
		                  wikiSearch();
	                }
	      }
	  }
});
	
	// for when hitting enter in input box
	_input.keypress(function(e) {
		 var code = e.keyCode || e.which;
 		if(code == 13) {
	 	    wikiSearchResults();
 		}
	});
	//used when backspace is pressed in input box;
	_input.keydown(function(e) {
		var code = e.keyCode || e.which;
 		if(code == 8) {
	 	    if(_input.length === 1) {
				$('.divhttpaddress').remove();
				$('.httpaddress').remove();
				idName = 0;
			}
 		}
	});
	
	//Used when in input box the up Arrow and Down Arrow are pressed
	_input.keydown(function(e){
	  var code = e.keyCode || e.which;
	  var res;
 		if(code == 40) {
			(idName < 4)? idName++:false;
		 
			var previous = (idName > 0)? idName-1:0;
			var _id ='#'+idName;
			var cl_id = '#'+previous;
		
			res = $(_id).text();
			 _input.val(res);
			$(cl_id).css('background-color','white');
			$(_id).css('background-color','#5252fd');
 		}
 		 if(code == 38) {
			(idName === 0)? idName=0:idName--;
			_id ='#'+idName;
			var Next = (idName < 4)? idName+1:4;
			var cls_id = '#'+Next;
			$(_id).css('background-color','#5252fd');
			(idName === 4)? false:$(cls_id).css('background-color','white');
			res = $(_id).text();
 			 _input.val(res);
 		}
	});
	
	// for when mouse is going over the lis from input box
	_ul.on('mouseover', 'li',function(){
		var a = $(this).text();
		var idNum = $(this).attr('id');
		idName = idNum;
		_input.val(a);
		var thisId = '#'+idNum;
		$(thisId).css('background-color','#a7bcec');
		for (let x = 0;x <= 4; x++){
			if(x != idName) {
				var otherIds = '#'+x;
				$(otherIds).css('background-color','white');
			}
		}
	});
	
	_ul.on('click', 'li',function(){
      wikiSearchResults();
	});
	
//first search get list for 5 <li>
function wikiSearch() {
//https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=pageimages%7Cpageterms&titles=Iron%20Maiden%20(album)

	 wiki.search = wiki.input.value;
	 var theUrl= wiki.myUrl+wiki.search+wiki.myUrlb;
  $.ajax({
    url:theUrl,
    dataType:'jsonp',
    success: function(data){sort(data);},
    statusCode:{
    404:function(){
    alert('There was a problem with the server - Try again soon');
  }}
  });
}	
// second search get list for 10 <div>
function wikiSearchResults() {
  wiki.search = wiki.input.value;
	//var search = wiki.input.value;
	var theUrl= wiki.myUrl+wiki.search+wiki.myUrlC;
  $.ajax({
    url:theUrl,
    dataType:'jsonp',
    success: function(data){console.log(data);sortData(data);},
    statusCode:{
    404:function(){
    alert('There was a problem with the server - Try again soon');
  }}
  });
}
// to append divs for second search
function sortData(data){
  //var _p = $('p');
  var _searchResults = $('#searchResults');
	var first = data[1],
	    second = data[3],
	    div = "",
	    para="",
	    paraB="",
	    third = data[2],
	    obj = JSON.stringify(data),
	    dataLength = (data[2].length > 10)? 10:data[2].length;
	   
	//_p.html(obj);
	$('.httpaddress').remove();
	$('.divhttpaddress').remove();
	for (var x=0;x<dataLength;x++) {
		if( first[x] !== undefined & third[x].length > 0){
		    para ='<a href="'+second[x]+'"target="_blank">'+first[x]+'</a>';
		    div = '<div id="'+x+'"><p class="large">'+para+'</p></div>';
		    _searchResults.append(div);
		    var len = third[x].length;
		    if(len >180){
		 	      var text = third[x];
		 	
            // shorten is a helper function to show less of the text received from search results
		 	      text = shorten(text);
		 	      paraB = '<p class="small">'+text+'</p>';
		    } else {
		        paraB = '<p class="small">'+third[x]+'</p>';
		      }
		 
		  var current = document.getElementById(x);
		  $(current).append(paraB);
		
		  $(current).attr('class', 'divhttpaddress');
		}
	}
	
}	
// to append <li> for first search	
function sort(data){
	var _seperate = $('#seperate');
	var first = data[1],second = data[3],li = "";
	
	$('.divhttpaddress').remove();
	$('.httpaddress').remove();
	for (var x=0;x<first.length;x++) {
		li = '<li id="'+x+'"></li>';
		_seperate.append(li);
		var current = document.getElementById(x);
		$(current).html(first[x]);
		$(current).attr('class', 'httpaddress');
	}
	
}	
	
function shorten(text) {
	var len = text.length;
	if(len > 150){
		var res = text.slice(0, 150).concat('....');
		return res;
	}
}
});	
	


