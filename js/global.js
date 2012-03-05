/**
 * Initialisation
 ******************************************/
(function($)
{
	$(document).ready( function()
	{
		$.fn.videInputFocus();
		$('img.rollover').survolImg();

                $('header nav#nav_main').find('nav.nav_sub').each(function() {
                    var lien = $(this).prev();
                    //$(this).find('a.lien_main').click(function() {return false;});
                    if (lien.hasClass('active')) {
                        $(this).offset({top: lien.position().top, left: lien.position().left})
                        $(this).addClass('positioned');
                        $(this).show();
                    }
                });
                $('header nav#nav_main > a.lien_main').mouseover(function () {
                    if($(this).next().hasClass('nav_sub') && !$(this).hasClass('active')) {
                        var menu = $(this).next();
                        if (!menu.hasClass('positioned')) {
                            menu.offset({top: $(this).position().top, left: $(this).position().left});
                        }
                        menu.addClass('positioned');
                        menu.show();
                    };
                });
                $('header nav#nav_main nav.nav_sub').mouseleave(function () {
                    if (!$(this).prev().hasClass('active')) {
                        $(this).hide();
                    }
                });
                $('.gallery nav a').click(function () {
                    clearInterval(auto_gallery);
                    $('.gallery').galleryIndex($(this).index(), 600);
                    return false;
                });
                $('a.email').each(function () {
                    $(this).text($(this).text().replace("[at]", "@"));
                    $(this).attr('href', $(this).attr('href').replace("[at]", "@"));
                });
                var auto_gallery = setInterval("$('.gallery').galleryNext()", 3600);
        });

        $.fn.galleryIndex = function(index, vitesse) {
            var gallery = $(this);
            var nav = gallery.find('nav');
            var miniature = nav.find('a').eq(index);
            if (miniature.hasClass('inactive')) {
                nav.find('a.active').removeClass('active').addClass('inactive');
                miniature.removeClass('inactive').addClass('active');
                gallery.find('.gallery-image img').eq(index).fadeIn(vitesse,
                    function () {
                        gallery.find('.gallery-image img.active').hide().removeClass('active').addClass('inactive');
                        gallery.find('.gallery-image img').eq(index).removeClass('inactive').addClass('active');
                    });
                gallery.find('.gallery-image img.active').fadeOut(vitesse);
            }
        }

        $.fn.galleryNext = function() {
            var index = $(this).find('nav a.active').index() + 1;
            var nb = $(this).find('nav a').length;
            if (index >= nb) {
                index = 0;
            }
            $(this).galleryIndex(index, 1200);
        }
	
	/**
	 * Gère le remplacement d'image au survol
	 * $(s).survolImg({suffixe: '_on'});
	 ******************************************/
	$.fn.survolImg = function(opt)
	{
		var images = $(this);
		var options = {suffixe: '_on'};
		if(opt) options = $.extend(options, opt);
		
		images.prechargeSurvolImg(options.suffixe);
		
		images.hover
		(
			function () {$(this).attr( 'src', survolCheminImg('survol', $(this).attr('src'), options.suffixe) );}, 
			function () {$(this).attr( 'src', survolCheminImg('', $(this).attr('src'), options.suffixe) );}
		);
	};
	 
	$.fn.prechargeSurvolImg = function(suffixe)
	{
		var images = $(this);
		
		$(window).bind('load', function()
		{
			images.each( function()
			{
				$('<img>').attr( 'src', survolCheminImg('survol', $(this).attr('src'), suffixe) );
			});
		});
	}
	
	var survolCheminImg = function(etat, src, suffixe)
	{
		if(etat == 'survol')
			return src.substring(0, src.search(/(\.[a-z]+)$/) ) + suffixe + src.match(/(\.[a-z]+)$/)[0]; 
		else
			return src.replace(suffixe+'.', '.');	
	}
	
	/**
	 * Vide la valeur des champs input au focus
	 * $(s).videInputFocus({classe: 'input_focus'});
	 ******************************************/
	$.fn.videInputFocus = function(opt)
	{	
		var options = {classe: 'input_focus'};
		if(opt) options = $.extend(options, opt);
	
		var input = $('input.'+options.classe+'[value!=""]');
		
		input.each( function()
		{
			$(this).focus( function() {if(this.value == this.defaultValue) this.value='';});	
			$(this).blur( function() {if(this.value == '') this.value=this.defaultValue;});
		});
	};
	
	/**
	 * Rollover d'un élément
	 * $(s).survolElem
		({
			classe: 'hover',
			ie6: false
		});
	 ******************************************/
	$.fn.survolElem = function(opt)
	{
		var elem = $(this);
		
		var options =
		{
			classe: 'hover',
			ie6: false
		};
		
		if(opt) options = $.extend(options, opt);
		
		if(options.ie6 && !($.browser.msie && parseInt($.browser.version) == 6)) return false;
		
		elem.hover
		(
			function () {$(this).addClass(options.classe);}, 
			function () {$(this).removeClass(options.classe);}
		);
	};
	
	/**
	 * Blocs de même hauteur
	 * $(s).hauteurEgale();
	 ******************************************/
	$.fn.hauteurEgale = function()
	{
		var blocs = $(this);
		var hauteurMax = 0;
		
		blocs.height('auto');
		blocs.each(function()
		{
			var hauteur = $(this).height();
			if(hauteur > hauteurMax) hauteurMax = hauteur;
		});
		blocs.height(hauteurMax);
	};
	
	/**
	 * Blocs de même largeur
	 * $(s).largeurEgale();
	 ******************************************/
	$.fn.largeurEgale = function()
	{
		var blocs = $(this);
		var largeurMax = 0;
		
		blocs.each(function()
		{
			var largeur = $(this).width();
			if(largeur > largeurMax) largeurMax = largeur;
		});
		blocs.width(largeurMax);
	};
	
	
	/**
	 * Affiche / Masque plus de texte
	 * $(s).voirPlus
		({
			contenu: '.plus',
			lien: '.voir_plus',
			lien_ouvert: '.voir_plus_on',
			vitesse: '',
			callback: function() {}
		});
	 ******************************************/
	$.fn.voirPlus = function(opt) 
	{
		var blocs = $(this);
		
		var options =
		{
			contenu: '.plus',
			lien: '.voir_plus',
			lien_ouvert: '.voir_plus_on',
			vitesse: '',
			callback: function() {}
		};
		
		if(opt) options = $.extend(options, opt);
		
		blocs.each(function()
		{
			var bloc = $(this);
			var contenu = bloc.find('.'+options.contenu);
			var lien = bloc.find('a.'+options.lien);
	
			contenu.hide();
			
			lien.click(function()
			{
				contenu.slideToggle(options.vitesse, function(){options.callback();});
				lien.toggleClass(options.lien_ouvert);
				return false;
			});
		});
	}
	
	
	/**
	 * Var dump
	 ******************************************/
	function varDump(arr,level)
	{
		var dumped_text = "";
		if(!level) level = 0;
		
		//The padding given at the beginning of the line.
		var level_padding = "";
		for(var j=0;j<level+1;j++) level_padding += "    ";
		
		if(typeof(arr) == 'object') { //Array/Hashes/Objects 
			for(var item in arr) {
				var value = arr[item];
				
				if(typeof(value) == 'object') { //If it is an array,
					dumped_text += level_padding + "'" + item + "' ...\n";
					dumped_text += varDump(value,level+1);
				} else {
					dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
				}
			}
		} else { //Stings/Chars/Numbers etc.
			dumped_text = "===> "+arr+" <=== ("+typeof(arr)+")";
		}
		console.log(dumped_text);
	};
	
})(jQuery);
