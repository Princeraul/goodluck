'use strict';

(function($){
	let shade = 'red';
	$.fn.greenify = function(){
		this.css('color', shade);
		return this;
	};
}(jQuery));
