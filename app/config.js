'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp.config', [])
.constant('version', '1.0.1')
.constant('loginRedirectPath', '/login')
.constant('SERVER_CONFIG', {	//	for talking to local API
	url: '/api'
})
.constant('FLYBASE_CONFIG',{
	API_KEY:'YOUR-API-KEY', 
	DB_NAME:'YOUR-FLYBASE-APP'
})
// double check that the app has been configured before running it and blowing up space and time
.run(['FLYBASE_CONFIG', '$timeout', function(FLYBASE_CONFIG, $timeout) {
	if( FLYBASE_CONFIG.API_KEY.match('YOUR-API-KEY') ) {
		angular.element(document.body).html('<div class="container"><h1>Please configure <code>app/config.js</code> before running!</h1></div>');
		$timeout(function() {
			angular.element(document.body).removeClass('hide');
		}, 250);
	}
}]);