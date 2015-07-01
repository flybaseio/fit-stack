var app = angular.module('testApp', ['ngRoute', 'flybaseResourceHttp'], function($routeProvider) {

	$routeProvider.when('/list', {templateUrl:'list.html', controller:'TodoListCtrl', resolve:{
		projects:function(Project){
			return Project.all();
		}
	}})
	.when('/edit/:id', {templateUrl:'form.html', controller:'TodoFormCtrl', resolve:{
		project:function(Project, $route){
			var p = Project.getById($route.current.params.id);
console.log( p );
			return p;
		} 
	}})
	.when('/new', {templateUrl:'form.html', controller:'TodoFormCtrl', resolve:{
		project:function(Project){
			return new Project();
		}
	}})
	.otherwise({redirectTo:'/list'});
})
.constant('FLYBASE_CONFIG',{
	API_KEY:'YOUR-API-KEY', 
	DB_NAME:'angularjs'
})
.factory('Project', function ($flybaseResourceHttp) {
	return $flybaseResourceHttp('projects');
})
.controller('TodoListCtrl', function($scope, $location, projects) {
	$scope.projects = projects;
})
.controller('TodoFormCtrl', function($scope, $location, $window, project) {
	
	var projectCopy = angular.copy(project);

	$scope.project = project;

	$scope.save = function(){
		$scope.project.$saveOrUpdate().then(function(returnData){
			console.log( returnData );
			$window.location.assign('/');
		}, function(error) {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.remove = function() {
		$scope.project.$remove(function() {
			$location.path('/');
		}, function() {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.hasChanges = function(){
		return !angular.equals($scope.project, projectCopy);
	};
});