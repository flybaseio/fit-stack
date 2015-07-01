angular.module('MainCtrl', ['ngRoute'])
.controller('MainController', function($scope,$timeout,projects,Project) {
	$scope.projects = projects;
	$scope.tagline = 'To the moon and back!';	

	var Ref = Project.flybase();

	Ref.on('added', function( data ){
		$timeout(function() {
			$scope.projects.push( data.value() );
		});
	});
	Ref.on('changed', function( data ){
		$timeout(function() {
			var snapshot = data.value();
			for( i in $scope.projects ){
				var project = $scope.projects[ i ];
				if( project._id == snapshot._id ){
					$scope.projects[ i ] = snapshot;
				}
			}
		});
	});
	Ref.on('removed', function( data ){
		$timeout(function() {
			var snapshot = data.value();
			for( i in $scope.projects ){
				var project = $scope.projects[ i ];
				if( project._id == snapshot._id ){
					$scope.projects.splice(i, 1);
				}
			}
		});
	});
})
.controller('SingleCtrl', function($scope, $location, project) {
	$scope.project = project;
}).config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'home/home.html',
		controller: 'MainController',
		resolve:{
			projects:function(Project){
//				return Project.query({"tag":{"$not":"1"}},{"limit":10});
				return Project.all();
			}
		}
	}).when('/project/:id', {
		templateUrl: 'home/project.html?a=1',
		controller: 'SingleCtrl',
		resolve:{
			project:function(Project, $route){
				var p = Project.getById($route.current.params.id);
				return p;
			} 
		}
	});	
//	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({redirectTo: '/'});
}]);