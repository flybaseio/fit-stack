angular.module('TodoCtrl', ['ngRoute', 'flybaseResourceHttp', 'loginMcFly','angular-medium-editor'])
/* Controllers */
.controller('TodoListCtrl', function($scope, $rootScope, $timeout, $location, $route, projects,login,Project) {
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}
	$scope.projects = projects;
	var projectsCopy = angular.copy( $scope.projects );
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
.controller('TodoViewCtrl', function($scope, $location, project,Login) {
	var login = new Login();
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}
	$scope.project = project;
})
.controller('TodoFormCtrl', function($scope, $location, $window, project,Login) {
	var login = new Login();
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}
	var projectCopy = angular.copy(project);

	$scope.project = project;

	$scope.save = function(){
		$scope.project.$saveOrUpdate().then(function(returnData){
			$location.path('/projects');
		}, function(error) {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.remove = function() {
		$scope.project.$remove(function() {
			$location.path('/projects');
		}, function() {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.hasChanges = function(){
		return !angular.equals($scope.project, projectCopy);
	};
})
.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/projects', {
		templateUrl: 'projects/list.html?a=1',
		controller: 'TodoListCtrl',
		resolve:{
			projects:function(Project){
				return Project.all();
			},
			login:function( Login ){
				return new Login();
			}
		}
	}).when('/projects/edit/:id', {
		templateUrl: 'projects/form.html?a=1',
		controller: 'TodoFormCtrl',
		resolve:{
			project:function(Project, $route){
				var p = Project.getById($route.current.params.id);
				return p;
			} 
		}
	}).when('/projects/view/:id', {
		templateUrl: 'projects/view.html?a=1',
		controller: 'TodoViewCtrl',
		resolve:{
			project:function(Project, $route){
				var p = Project.getById($route.current.params.id);
				return p;
			} 
		}
	}).when('/projects/new', {
		templateUrl: 'projects/form.html?a=1',
		controller:'TodoFormCtrl', 
		resolve:{
			project:function(Project){
				return new Project();
			}
		}
	});	
}]);