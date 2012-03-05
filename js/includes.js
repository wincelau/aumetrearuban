(function($)
{
	/**
	 * Gère l'inclusion de fichier JS
	 * $.fn.include(chemin, fichier, {condition: false, operateur: '', version: ''});
	 ******************************************/
	$.fn.includeJS = function(chemin, fichier, opt)
	{
		var options =
		{
			condition: false,
			operateur: '',
			version: ''
		};

		if(opt) options = $.extend(options, opt);

		if(options.condition)
		{
			document.write('\n\t<!--[if '+ options.operateur +' '+ options.version +']><script type="text/javascript" src="' + chemin + fichier + '"></scr' + 'ipt><![endif]-->');
		}
		else
		{
			document.write('\n\t<script type="text/javascript" src="' + chemin + fichier + '"></scr' + 'ipt>');
		}
	};

	/**
	 * Inclusions
	 ******************************************/
	$.fn.includeJS(jsPath, 'plugins/DD_belatedPNG.js', {condition: true, operateur: 'lte', version: 'IE 6'});
	$.fn.includeJS(jsPath, 'affichage.js');
	$.fn.includeJS(jsPath, 'global.js');

})(jQuery);
