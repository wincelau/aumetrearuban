/**
 * Initialisation
 ******************************************/
$(document).ready( function()
{
	try
	{
		/**
		 * Typographie
		 ******************************************/
		/*if(typeof Cufon.replace == 'function')
		{
			Cufon.replace('h1');
		}*/
	}
	catch(e) {}
	
	// Corectifs IE
	if($.browser.msie)
	{
		try
		{
			/**
			 * Coins arrondis
			 ******************************************/
			/*if(typeof DD_roundies.addRule == 'function')
				DD_roundies.addRule('.bloc_arrondi', '3px');*/
			
			/**
			 * PNG fix
			 ******************************************/
			if(typeof DD_belatedPNG.fix == 'function' && parseInt($.browser.version) <= 6)
				DD_belatedPNG.fix('.pngfix');
		}
		catch(e) {}
	}
});