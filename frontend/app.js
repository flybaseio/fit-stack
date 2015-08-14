'use strict';

( function (self) {
	if ( (typeof console !== 'undefined') && (typeof console.warn === 'function') ){
		var warn = window.console.warn;
		self['ಠ_ಠ'] = Function.prototype.bind.call(warn, console);
		window.console.warn = undefined;
	} else{
		self['ಠ_ಠ'] = function () {}
	}
}( typeof window !== 'undefined'? window : typeof global !== 'undefined' ? global : self ) );

// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'myApp.config',
	'APIService',
	'myApp.models',
	"UserCtrl",
	'MainCtrl', 
	'TodoCtrl', 
	'APITestCtrl', 
	'myApp.directives'
]);

String.prototype.toHex = function() {
    var buffer = forge.util.createBuffer(this.toString());
    return buffer.toHex();
}

String.prototype.toSHA1 = function() {
    var md = forge.md.sha1.create();
    md.update(this);
    return md.digest().toHex();
}