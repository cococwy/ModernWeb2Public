function autoLogin() {
	
		      $.ajax({
            type: 'POST',
            //url: 'https://itunes.apple.com/search?term=beyond&country=hk',
            url: '/auto',
            //data:{todo:"jsonp"},
						//data:{username:D.uName, password:D.uPass, rm:rm},
						dataType: "json",
						//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						//crossDomain: true,          
						cache:false, 
					
            complete: function(data, status) {
							if (data.status == 200) {
									console.log(data);
									//alert(data);
									D.uFav = data.responseJSON.favourites;
									D.uFullName = data.responseJSON.fullname;
									D.uName = data.responseJSON.username;
									D.uPass = data.responseJSON.password;
									console.log(D.uFav);
									
							}
						}
				});
}

function loadBar(status) {
	
	if (status) {
			$("#loadgif").css({
				"display": "block",
				"position": "fixed",
				"opacity": 1,
				"z-index": 11000
			});
	
			$("#lean_overlay").css({
				"display": "block",
				"opacity": 0.75,
				"z-index": 10999
			}).unbind();
	}
	else {
			$("#loadgif").css({
				"display": "none"
			});
							
			$("#lean_overlay").css({
				"display": "none",
			});
	}
}
	
function showModal(modal_id, overlay, top) {
		$("#lean_overlay").click(function () {
				close_modal(modal_id)
		});
		$('#modal .modal_close').click(function () {
				close_modal(modal_id)
		});

		var modal_height = $(modal_id).outerHeight();
		var modal_width = $(modal_id).outerWidth();

		$("#lean_overlay").css({
				"display": "block",
				opacity: 0
		});
	
		$(".user_login").show();
		$(".user_register").hide();

		$("#lean_overlay").fadeTo(200, overlay);

		$(modal_id).css({
				"display": "block",
				"position": "fixed",
				"opacity": 0,
				"z-index": 11000,
				"left": 50 + "%",
				"margin-left": -(modal_width / 2) + "px",
				"top": top + "px"
		});

		$(modal_id).fadeTo(200, 1);
}

function userManagement(openit) {
	if (openit) {
		$('#logout_btn').click(function() {
			logoutUser();
		});
		
		$('#user_management .modal_close').click(function() {
			userManagement(false);
		});
		
		$("#lean_overlay").css({
				"display": "block",
				opacity: 0
		}).fadeTo(200, 0.75).click(function() {
			userManagement(false);
		});

		$('#user_management').css({
				"display": "block",
				"position": "fixed",
				"opacity": 0,
				"z-index": 11000,
				"left": 50 + "%",
				"margin-left": "-150px",
				"top": "200px"
		}).fadeTo(200, 1);
		
	} else {
		$("#lean_overlay").hide();
		$("#user_management").hide();
	}
}

function logoutUser() {
	D.uName = '';
	D.uPass = '';
	D.uFullName = '';
	D.uFav = [];
	$('#loginUserName')[0].value = '';
	$('#loginPassWord')[0].value = '';
	$('#modal_trigger').html('Login <i class="fa fa-user-circle"></i>').css({"color":"#FFF"}).unbind('click');
	$('#modal_trigger').click(function() {
		showModal('#modal',0.75,200);
	});
	userManagement(false);
	
	D.status = 'fp';
	$('.front, #portfolio').show();
	$('.List').hide();
	$('body').scrollTop(0);
	
	refreshList();
	popDiag('Log out from the system.');
}
	
 function close_modal(modal_id) {
		$("#lean_overlay").fadeOut(200);
		$(modal_id).css({
				"display": "none"
		})
}
	
	function refreshList() {
		
		let tmp = '',
				an = 0,
				lk = '';
		
				$.each(D.listing, function(index, d) {
					
						let tid = d.trackId;
						let artworkURL = d.artworkUrl100.replace("100x100", "200x200");
						let a = D.uFav.indexOf(tid);
						if (a == -1) an = 0;
								else an = 1;
						if (D.status == 'top') lk = "<label>Likes: " + d.likes + "</label>";
					
						tmp += '<div class="row"><div class="col-md-3"><img class="img-responsive" src="' +
								artworkURL + '"></div><div class="col-md-9"><h3>' +
								d.trackName + '</h3><h4>' + d.artistName +
								'</h4><h5>' + lk + '</h5><a class="btn ' + D.favBtn[an] + '" tag="' + tid +
								'">' + D.favTxt[an] + '</a><a class="btn btn_detail" tag="' + index +
								'">View Detail</a></div></div><hr>';

				});
		
				loadBar(false);
		
				if (D.status != 'fp') {
						$('.front, #portfolio').hide();
						$('.List').show();
				}

        $("#songlist").html(tmp);
		
				if (!D.listing.length) $("#songlist").html('<h4>Nothing found.</h4>');
		
				//$('body').scrollTop(0);
		
		if (D.uFullName) {
		
				$('.btn_fav').click(function() {
					addFav(Number($(this).attr("tag")));
				});  
		
				$('.btn_rmv').click(function() {
					rmFav(Number($(this).attr("tag")));
				}); 
		}
		
		else {
			
				$('.btn_fav').click(function() {
					popDiag('This function is only for registered users. Please login to do this.');
				});  
		
				$('.btn_rmv').click(function() {
					popDiag('This function is only for registered users. Please login to do this.');
				}); 
			
		}
		
				$('.btn_detail').click(function() {
					//alert('hi');
					//alert('deatil' + $(this).attr("tag"));
					songDetail($(this).attr("tag"));
				});  
	}
	

 function addFav(add) {
	
	//var aaa = {username:user, password:pass, add:add};
	//console.log(aaa);
		console.log('Add:' + add);
	
	      $.ajax({
            type: 'PUT',
            //url: 'https://itunes.apple.com/search?term=beyond&country=hk',
            url: '/',
            //data:{todo:"jsonp"},
						data:{username:D.uName, password:D.uPass, add:add},
						dataType: "json",
						//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						//crossDomain: true,          
						cache:false, 
					
						/*success: function(data) {
							console.log(data);
							D.uFav = data.favourites;
							refreshList();
						}*/

            complete: function(data, status) {
							if (data.status == 200) {
									console.log(data);
									//alert(data);
									D.uFav = data.responseJSON.favourites;
									console.log(D.uFav);
									refreshList();
							}
						}
				});
}

function rmFav(rm) {
	
		console.log('Remove:' + rm);
	
	      $.ajax({
            type: 'DELETE',
            //url: 'https://itunes.apple.com/search?term=beyond&country=hk',
            url: '/',
            //data:{todo:"jsonp"},
						data:{username:D.uName, password:D.uPass, rm:rm},
						dataType: "json",
						//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						//crossDomain: true,          
						cache:false, 
					
            complete: function(data, status) {
							if (data.status == 200) {
									console.log(data);
									//alert(data);
									D.uFav = data.responseJSON.favourites;
									console.log(D.uFav);
									refreshList();
							}
						}
				});
}


function songDetail(id) {
	if (id) {
		$('.showDetail').css({'display':'block'});
		$('#lean_overlay').show();
		$('#lyricArea').text('\n\n\n\n\n\t\t\t\t\t\tLoading Lyrics...');
		loadLyric(id);
		
		$('.showDetail .close').click(function() {
			songDetail(false);
		});
		
		$('#lean_overlay').click(function() {
			songDetail(false);
		});
		
		let song = D.listing[id];
		console.log(song);
		$('#songname').text(song.trackName);
		$('#artistName').text(song.artistName);
		$('#collectionName').text(song.collectionName);
		
		let artworkURL = song.artworkUrl100.replace("100x100", "240x240");
		$('#songImg').attr('src',artworkURL);
		//$('#songSrc').attr('src',song.previewUrl);
		$('.audiodiv').html('<audio controls><source src="' + song.previewUrl +
											 '" type="audio/mp4">Your browser does not support the audio element.</audio>');
	}
	else {
		$('.showDetail').css({'display':'none'});
		$('#lean_overlay').hide();
		$('.audiodiv audio')[0].pause();
	}
}

function loadLyric(id) {
	let sName = D.listing[id].trackName;
	$.get('/lyric', {'q':sName}, function(body) {
		if (body == "Cannot find lyrics.") body = '\n\n\n\n\n\t\t\t\t\tSorry, this lyric is not found.';
		$('#lyricArea').text(body);
	});
}


function popDiag(message) {
	
	$('#dialogueBox label').text(message).css({"color":"#F33"});
	
	$('#dialogueBox').css({
				"display": "block",
				"position": "fixed",
				"opacity": 1,
				"z-index": 12000,
				"left": 50 + "%",
				"margin-left": "-150px",
				"top": "300px"
	});
	
	$('#lean_overlay').css({
				"display": "block",
				"opacity": 0.75
	});
	
	$('#lean_overlay').unbind('click');
	
	$(".dialogue_close, .ok_btn").click(function() {
		$("#dialogueBox").hide();
		$("#lean_overlay").hide();
	});
	
}