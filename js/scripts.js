$(document).ready(function(){
	// Cache selectors

	changeLang(navigator.language);

	$( "#changeFR" ).click(function() {
		changeLang("fr");
	});
	$( "#changeENG" ).click(function() {
		alert("Bientôt !");
		//changeLang("eng");
	});

	var lastId,
	topMenu = $(".scrollMenu"),
	// Décalage du scroll s'il y a un menu
//	topMenuHeight = topMenu.outerHeight(),
	topMenuHeight = 0,
	// All list items
	menuItems = topMenu.find("a"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function(){
		var item = $($(this).attr("href"));
		if (item.length) { return item; }
	});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({
			scrollTop: offsetTop+1
		}, 700); // <= vitesse de scroll
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
		var position = $(document).scrollTop();
		var headerHeight = $('#infos').outerHeight();

		// A quelle position le menu se déroule
		if (position >= headerHeight/2){
			$('#top-menu').addClass('minified');
		} else {
			$('#top-menu').removeClass('minified');
		}

		// Get container scroll position
		var fromTop = $(this).scrollTop()+topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop)
				return this;
		});
		// Get the id of the current element
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";

		if (id != "" && lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
			.parent().removeClass("active")
			.end().filter("[href=#"+id+"]").parent().addClass("active");
		}

	});
	//****//
	//var backgrounds = ["lune.jpg","usa.jpg","NASA-PIA2406h.jpg","pia18908-main.jpg"];
	//var bg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	//$("#home").css({'background': "url(img/"+bg+") center center no-repeat fixed"});
	//****//

	//****//
	$('#home').parallax("45%", 1.5,true);
//	$('#contact').parallax("center", 0.2,true);
	//****//
	/****/
	$('#connaissances').one('inview',function(event, isInView, visiblePartX, visiblePartY){
		if (isInView) {
			$('.devLang').each(function( index ) {
				var id = $(this).attr('id');
				for(var i=0;i<$(this).data('lvl');i++){
					$(this).find("p").append("<img src=\"img/devlang/"+id+".png\" />")
				}

				for(var i=$(this).data('lvl');i<5;i++){
					$(this).find("p").append("<img src=\"img/devlang/"+id+"-nb.png\" />")
				}
			});
		}else {
			// l'élément n'est pas visible
			// on fait quoi maintenant ?
		}
	});
	/****/
	// Fermeture de la barre de nav quand on clique sur un lien
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('.nav a').on('click', function(){
			$(".navbar-toggle").click()
		});
	}


	$('#ytPlay').not('#lienVersInfos').on('click', function(){
		$('#home #pattern').remove();
		$('#home .container').remove();
		$("#CVVideo")[0].src += "?autoplay=1";
	});

	$('#projetModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);

		var modal = $(this);
		modal.find('#titre').empty();
		modal.find('#infos').empty();

		modal.find('#titre').text(button.data('titre'));
		modal.find('#infos').append('<dt>Type du projet</dt>');
		modal.find('#infos').append('<dd>'+button.data('nature')+'</dd>');
		modal.find('#infos').append('<dt>Objectifs</dt>');
		modal.find('#infos').append('<dd>'+button.data('objectifs')+'</dd>');
		modal.find('#infos').append('<dt>Technologies</dt>');
		modal.find('#infos').append('<dd>'+button.data('techno')+'</dd>');

		modal.find('#infos').append('<dt>Captures d\'écran</dt>');
		var screens = button.data('screen').split(";");
		var content = '<dd style="height: 105px;">';
		for(var i=0;i<screens.length;i++){
			content += '<a href="#projetScreen" data-toggle="modal" data-link="img/projets/screens/'+screens[i]+'"><img class="screensProjet" src="img/projets/screens/'+screens[i]+'"></a>';
		}
		modal.find('#infos').append(content);

		if(button.data('link') != null){
			var link = button.data('link').split(";");
			var data = "<dd>";
			for(var i=0;i<link.length;i=i+2){
				console.log(i +"-"+ link.length)
				data = data+'<a href="'+link[1+i]+'" style="margin-right: 10px;" class="btn btn-info" role="button" target="_blank">'+link[0+i]+'</a>'
			}
			console.log(data)
			modal.find('#infos').append(data+"</dd>")
		}
	});

	$('#projetScreen').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);

		var modal = $(this);

		modal.find('#screenProjectModal').attr("src",button.data('link'));

	});

});
