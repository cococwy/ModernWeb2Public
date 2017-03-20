$(document).ready(function () {
	

	
//autoLogin();
	
  
var searchSong = function(term) {
	
			$('#searchText')[0].value = term;
	
			D.status = 'search';

			loadBar(true);
	
			$.get('/search?q=' + term, function(data) {
				console.log('search');
				console.log(data);
				D.listing = data.results;
				$(".page-header").html("Search Result of \"" + term + "\"");
				
				//if (data.resultCount > 0) refreshList();
				//else $('#songlist').text('Nothing found.');
				refreshList();
			});
	
      /* $.ajax({
            type: 'GET',
            //url: 'https://itunes.apple.com/search?term=beyond&country=hk',
            url: 'https://itunes.apple.com/search?term=' + term + '&entity=song',
            data:{todo:"jsonp"},
						dataType: "jsonp",
						crossDomain: true,          
						cache:false, 

            success: function(data) {
							//var results = data.results;
							D.listing = data.results;
							$(".page-header").html("Search Result of \"" + term + "\"");
							refreshList();
							
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
            }
				
   }); */
				
};

	
 var checkText = function () {
  let temp = $('#searchText')[0].value;
  if (temp) {
		//$('.front, #portfolio').hide();
		//$('.List').show();
    searchSong(temp);
  }
	//else searchSong('beatles'); //for testing
};
	
$('#FrontPage').click(function() {
	D.status = 'fp';
	$('.front, #portfolio').show();
	$('.List').hide();
	$('body').scrollTop(0);
});

$('#Top20').click(function() {
	
	loadBar(true);
	D.status = 'top';
	$.get('/top', function(data) {
		D.listing = data;
		refreshList();
		$('.front, #portfolio').hide();
		$('.List').show();
		
		$('.page-header').html("Top 20 songs in people's favourites list:");

		$('body').scrollTop(0);
	});
	
	loadBar(false);

});
	
//searchSong("beatles")
  
$('#searchText').on('keypress', function(e) {
  if (e.which === 13) {
    //searchSong($('#searchText')[0].value);
    checkText();
  }
});

$('#searchButton').on('click', function() {
  checkText();
});
	
$('#loginButton').on('click', function () {
	console.log($('#loginUserName')[0].value);
	console.log($('#loginPassWord')[0].value);
	$.post('/login',
				{
					username: $('#loginUserName')[0].value,
					password: $('#loginPassWord')[0].value
				},
				function (data, status) {
					console.log(data);
					if (data.login) {
						$("#wrong").css({"display": "inline"});
					}
					else {
						$("#wrong").css({"display": "none"});
						$("#modal").hide();
						D.uName = data.username;
						D.uPass = data.password;
						D.uFav = data.favourites;
						D.uFullName = data.fullname;
						$('#modal_trigger').html(D.uFullName + ' <i class="fa fa-user"></i>').css({"color":"#FFF"}).unbind('click');
						$('#modal_trigger').click(function() {
							//popDiag("test");
							//$('.user_management').css({"display":"block"});
							//$('.user_management').show();
							userManagement(true);
						});
						refreshList();
						popDiag("Welcome, " + D.uFullName + ".");
					}
					//alert("Data: " + data + "\nStatus: " + status);
				});
});
	
$('#myfav_btn').click(function() {
	userManagement(false);
	D.status = 'fav';
	loadBar(true);
	D.listing = [];
	
	$.post('/fav', {username: D.uName, password: D.uPass}, function(data) {
			console.log('fav');
			console.log(data);
		
			if (data.length) {
				D.listing = data;
				$('.page-header').html("Favourites List");
				refreshList();
			}	
			else 
			{			//if there is nothing in the favourite list
				$('.front, #portfolio').hide();
				$('.List').show();
				
				$('.page-header').html("Favourites List");
				$('#songlist').html('<h4>Nothing in the list.</h4>');
				loadBar(false);
			}
	});
	
	/*
	let count = D.uFav.length;
	let mC = function(c) {
		if (c < 1) {
			refreshList();
		}
	};
	if (D.uFav.length) {
		$.each(D.uFav, function(index, d){
		      $.ajax({
            type: 'GET',
            url: 'https://itunes.apple.com/lookup?id=' + d,
            data:{todo:"jsonp"},
						dataType: "jsonp",
						crossDomain: true,          
						cache:false, 

            success: function(data) {
							console.log(data);
							D.listing.push(data.results[0]);
							mC(--count);
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
							mC(--count);
            }
		 });
		});
		$('.page-header').html("Favourites List");
	}
	else {			//if there is nothing in the favourite list
		$('.page-header').html("Favourites List");
		$('#songlist').html('<h4>Nothing in the list.</h4>');
		loadBar(false);
	}
	
	*/
	
	//setTimeout(function() {
	//	refreshList();
	//}, 10000);

});
   
/*
$('#registerButton').on('click', function () {
	console.log($('#loginUserName')[0].value);
	$.post('/register',
				{
					username: $('#regUserName')[0].value,
					password: $('#regPassWord')[0].value,
					email: $('#regEmail')[0].value,
					fullname: $('#regFullName')[0].value
				},
				function (data, status) {
					alert("Data: " + data + "\nStatus: " + status);
				});
});
*/

//$("#modal_trigger").preventDefault();
$("#modal_trigger").on('click', function() {
	showModal('#modal',0.75,200);
});
	
$(".portfolio-link").click(function() {
	searchSong($(this).attr('href'));
});

	$(function(){
		
		$(".have_ac").click(function() {
			$(".user_login").show();
			$(".user_register").hide();
			$("#modal .header_title").text('Login');
		});
		
		$(".no_ac").click(function() {
			$(".user_login").hide();
			$(".user_register").show();
			$("#modal .header_title").text('Register');
		});
		
		$("#dia").click(function() {
			songDetail(100);
			//popDiag("this is a test");
			//$('.showDetail').css({'display':'block'});
			//$('#lean_overlay').show();
		});
		
		setTimeout(function() {
			//$("#dia").trigger('click');
		}, 1000);
		
	});
	
	
}());