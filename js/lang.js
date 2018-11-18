function changeLang(lang){
	//if (lang.toLowerCase().indexOf("fr") >= 0){
		$.getJSON( "lang/fr.json")
		  .done(function( json ) {
			//console.log(json);			
			charge(json);
		  })
		  .fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
	/*}else{
		$.getJSON( "lang/en.json")
		  .done(function( json ) {
			console.log(json);			
			charge(data);
		  })
		  .fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
	}*/
	
}
function charge(data){
	clear();
	$('#titre').text(data.titre);
	/** INFOS **/
		$('#titreInfos').text(data.infos.titre);
		$('#soustitreInfos').text(data.infos.soustitre);
		$('#infosDetails').append("<li>"+data.infos.data[0].nom[0]+": "+data.infos.data[0].nom[1]+"</li>");
		$('#infosDetails').append("<li>"+data.infos.data[1].naissance[0]+": "+data.infos.data[1].naissance[1]+"</li>");
		$('#infosDetails').append("<li>"+data.infos.data[2].ville[0]+": "+data.infos.data[2].ville[1]+"</li>");
		$('#infosDetails').append("<li>"+data.infos.data[3].nationalite[0]+": "+data.infos.data[3].nationalite[1]+"</li>");
		$('#infosDetails').append("<li>"+data.infos.data[4].permis+"</li>");
		$('#infosDetails').append("<li>Email: <a href=\"mailto:"+data.infos.data[5].email+"\">"+data.infos.data[5].email+"</a></li>");
		
		$('#descriptif').append("<h3 class=\"text-uppercase\">"+data.infos.data[7].description[0]+"</h3>");
		$('#descriptif').append(data.infos.data[7].description[1]);
		
	/** PARCOURS **/
		$('#descriptif,#parcours').one('inview',function(event, isInView, visiblePartX, visiblePartY){
			if (!$('#titreParcours').is(':empty')){
				return;
			}
			
			$('#titreParcours').text(data.parcours.titre);
			$('#soustitreParcours').text(data.parcours.soustitre);
			
			for(var i=0;i<data.parcours.data.length;i++){
				var fond="";
				var type="";
				if(data.parcours.data[i].type=="entreprise"){
					fond="cd-picture";
					type='img/officeworker1.svg';
				}else{
					fond="cd-movie"
					type='img/cd-icon-location.svg';
				}
				var content ='<div class="cd-timeline-block">\
					<div class="cd-timeline-img '+fond+'">\
					<img src="'+type+'" alt="Picture">\
				</div>\
				<div class="cd-timeline-content">\
					<h2>'+data.parcours.data[i].nom+'</h2>\
					<p>'+data.parcours.data[i].intro+'</p>\
					<p>'+data.parcours.data[i].description+'</p>';
				if(data.parcours.data[i].lien != null){
					content+= '<a target="_blank" href="'+data.parcours.data[i].lien.url+'" class="cd-read-more">'+data.parcours.data[i].lien.nom+'</a>';
				}
				content += '<span class="cd-date">'+data.parcours.data[i].date+'</span>\
							</div>\
						</div>';
				$('#cd-timeline').append(content);
			}
			var $timeline_block = $('.cd-timeline-block');

			//hide timeline blocks which are outside the viewport
			$timeline_block.each(function(){
				if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
					$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
				}
			});
			$(window).scroll(function(){
				$timeline_block.each(function(){
					if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
						$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
					}
				});
			});
		});
		/** Connaissances **/
		$('#connaissances, #parcours').one('inview',function(event, isInView, visiblePartX, visiblePartY){
			if (!$('#titreConnaissances').is(':empty')){
				return;
			}
			$('#titreConnaissances').text(data.competences.titre);
			$('#soustitreConnaissances').text(data.competences.soustitre);
			
			/**$('#connaissances .container .row .col-md-6').after().append('<div class="col-md-6 text-justify">\
						<dl class="dl-horizontal">\
							<dt id="competencesOS"></dt>\
							<dt id="competencesIDE"></dt>\
							<dt id="competencesPlateforme"></dt>\
							<dt id="competencesCMS"></dt>\
							<dt id="competencesBureautique"></dt>\
							<dt id="competencesWebServer"></dt>\
						</dl>\
					</div>');**/
			
			$('#competencesOS').text(data.competences.data[0].nom);
			for(var i=0;i<data.competences.data[0].data.length;i++){
				$('#competencesOS').after('<dd>'+data.competences.data[0].data[i]+'</dd>');
				
			}
			$('#competencesIDE').text(data.competences.data[1].nom);
			for(var i=0;i<data.competences.data[1].data.length;i++){
				$('#competencesIDE').after('<dd>'+data.competences.data[1].data[i]+'</dd>');
				
			}
			$('#competencesPlateforme').text(data.competences.data[2].nom);
			for(var i=0;i<data.competences.data[2].data.length;i++){
				$('#competencesPlateforme').after('<dd>'+data.competences.data[2].data[i]+'</dd>');
				
			}
			$('#competencesCMS').text(data.competences.data[3].nom);
			for(var i=0;i<data.competences.data[3].data.length;i++){
				$('#competencesCMS').after('<dd>'+data.competences.data[3].data[i]+'</dd>');
				
			}
			$('#competencesBureautique').text(data.competences.data[4].nom);
			for(var i=0;i<data.competences.data[4].data.length;i++){
				$('#competencesBureautique').after('<dd>'+data.competences.data[4].data[i]+'</dd>');
				
			}
			$('#competencesWebServer').text(data.competences.data[5].nom);
			for(var i=0;i<data.competences.data[5].data.length;i++){
				$('#competencesWebServer').after('<dd>'+data.competences.data[5].data[i]+'</dd>');
				
			}
			
		});
		/** PROJETS **/
		$('#connaissances, #projets').one('inview',function(event, isInView, visiblePartX, visiblePartY){
			if (!$('#titreProjets').is(':empty')){
				return;
			}
			$('#titreProjets').text(data.projets.titre);
			$('#soustitreProjets').text(data.projets.soustitre);
			
			for(var i=0;i<data.projets.data.length;i++){
				var str='<div class="grid">\
					<figure class="effect-ming">\
					<img src="'+data.projets.data[i].img+'" alt="'+data.projets.data[i].nom+'" />\
					<figcaption>\
					<h2>\
					'+data.projets.data[i].titre+'\
					</h2>\
					<p>'+data.projets.data[i].description+'</p>\
					<a href="#projetModal" data-toggle="modal"\
					data-titre="'+data.projets.data[i].nom+'"\
					data-nature="'+data.projets.data[i].nature+'"\
					data-objectifs="'+data.projets.data[i].objectifs+'"\
					data-techno="'+data.projets.data[i].techno+'"\
					data-screen="'+data.projets.data[i].screen+'"';
					if(data.projets.data[i].lien)
						str+='data-link="'+data.projets.data[i].lien+'"';
					str+='>View more</a>\
					</figcaption>\
					</figure>\
			</div>';
				$('#projets .container').append(str);
			}
			
		});
		
}
function clear(){
	$('#titre').empty();
	/** INFOS **/
		$('#titreInfos').empty();
		$('#soustitreInfos').empty();
		$('#infosDetails').empty();
		
		$('#descriptif').empty();
		
	/** PARCOURS **/
		$('#titreParcours').empty();
		$('#soustitreParcours').empty();
		$('#cd-timeline').empty();
		
	/** Connaissances **/
		$('#titreConnaissances').empty();
		$('#soustitreConnaissances').empty();
		//$('#connaissances .container .row .col-md-6').after().empty();
		/**$('#competencesOS').empty();
		$('#competencesIDE').empty();
		$('#competencesPlateforme').empty();
		$('#competencesCMS').empty();
		$('#competencesBureautique').empty();
		$('#competencesWebServer').empty();**/
}