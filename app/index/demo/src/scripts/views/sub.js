'use strict';

export default function(){
	let element = document.createElement('h2');
	let myDate = new Date();
	element.innerHTML = "Hello h2 world，this is my frist project, Scripts livereload time:" + myDate.getTime();
	return element;
}