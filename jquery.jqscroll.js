/*
 _        _         _            
| \      (_)       | |           
| |       _  ____  | |  _   ___  
| |      | ||  _ \ | |_/ ) / _ \ 
| |_____ | || | | ||  _ ( | (_) |
\_______)|_||_| |_||_| \_) \___/ 
                                      
*/

/*!
 * jqScroll v1.2 - jQuery Plugin for Infinite Scrolling 
 * http://blog.ddmweb.it/
 *
 * Copyright 2013-2014, Davide Di Modica
 * http://ddmweb.it/
 * Dual licensed under the MIT and GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * @author Davide Di Modica
 * @requires jQuery v1.4.3+
 */

//plugin infinite scroll super!!!
//
window.jqScroll = {};
window.jqScroll.opts = {};
(function($){

	$.fn.jqScroll = function(options) {
		var opts = $.extend($.fn.jqScroll.defaults, options);  
		var target = opts.scrollTarget;
		if (target == null){
			target = $(window); 
		}
		opts.scrollTarget = target;

		window.jqScroll.opts = opts;

		return this.each(function() {
			$.fn.jqScroll.init($(this), opts);
		});
	};

	$.fn.jqScrollStopScroll = function(){
		return this.each(function() {
			$(this).attr('jqScroll', 'disabled');
		});
	};

	$.fn.jqScrollRestartScroll = function(){
		return this.each(function() {
			$(this).attr('jqScroll', 'enabled');
			$.fn.jqScroll.init($(this), window.jqScroll.opts);
		});
	};

	// code for fade in element by element
	$.fn.jqScrollfadeInWithDelay = function(){
		var delay = 0;
		return this.each(function(){
			$(this).delay(delay).animate({opacity:1}, 400);
			delay += 200;
		});
	};

	$.fn.jqScroll.loadContent = function(obj, opts){
		if ($(obj).attr('jqScroll') == 'enabled'){
			var target = opts.scrollTarget;
			var mayLoadContent = $(target).scrollTop()+opts.heightOffset >= $(document).height() - $(target).height();
			if (mayLoadContent){
				if (opts.beforeLoad != null){
					opts.beforeLoad(); 
				}
				$(obj).children().attr('rel', 'loaded');


				if (opts.loading != null){
					opts.loading();
					var objectsRendered = $(obj).children('[rel!=loaded]');
					if (opts.afterLoad != null){
						opts.afterLoad(objectsRendered);	
					}
				}else{
					$.ajax({
						type: opts.typeRequest,
						url: opts.contentPage,
						data: opts.contentData,
						dataType: opts.dataType,
						success: function(data){
							if (opts.ajaxCallback != null){
								opts.ajaxCallback(data);	
							}else{
								$(obj).append(data); 							
							}
							var objectsRendered = $(obj).children('[rel!=loaded]');

							if (opts.afterLoad != null){
								opts.afterLoad(objectsRendered);	
							}
						}
					});				
				}

				while($(target).scrollTop()+opts.heightOffset > $(document).height() - $(target).height() && $(obj).attr('jqScroll') == 'enabled'){
					$.fn.jqScroll.loadContent(obj, opts);
				}
			}
		}
	};

	$.fn.jqScroll.init = function(obj, opts){
		console.log(opts);
		var target = opts.scrollTarget;
		$(obj).attr('jqScroll', 'enabled');

		$(target).scroll(function(event){
			if ($(obj).attr('jqScroll') == 'enabled'){
				console.log('scroll');	
				$.fn.jqScroll.loadContent(obj, opts);	
			}
			else {
				event.stopPropagation();	
			}
		});

		//while($(target).scrollTop()+opts.heightOffset > $(document).height() - $(target).height()){
			$.fn.jqScroll.loadContent(obj, opts);
		//}
	};

	$.fn.jqScroll.defaults = {
		'contentPage' : null,
		'contentData' : {},
		'typeRequest': null,
		'dataType': null,
		'beforeLoad': null,
		'loading': null,
		'afterLoad': null,
		'ajaxCallback': null,
		'scrollTarget': null,
		'heightOffset': 0		  
	};	
})( jQuery );