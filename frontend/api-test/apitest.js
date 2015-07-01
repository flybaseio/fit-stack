angular.module('APITestCtrl', ['ngRoute']).controller('APITestController', function($scope,SERVER_CONFIG,$http,LocalApi) {
	LocalApi.init().then(function(){
		$scope.currentSong = LocalApi.queue[0];
		$scope.tagline = $scope.currentSong.preview_url;
	}).then(function(){
		$scope.currentSong.loaded = true;
	});

})
.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/api-test', {
		templateUrl: 'api-test/apitest.html',
		controller: 'APITestController'
	});	
}]);