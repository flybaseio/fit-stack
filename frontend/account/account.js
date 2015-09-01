angular.module('UserCtrl', ['ngRoute', 'flybaseResourceHttp', 'loginMcFly'])
/* Controllers */
.controller('AccountCtrl', function($scope, $location, login, me) {
	$scope.showform = false;
	$scope.profile = {}; 
	
	if( !login.isLoggedIn() ){
		$scope.showform = false;
		$location.path('/login');
	}
	var token = login._getToken();
	$scope.profile = me;
/*
	login.getUser( token ).then( function( user ) {
		$scope.profile = user;
	}, function(err) {
		$scope.err = err;
	});
*/
	$scope.showform = true;

	$scope.logout = function() {
		login.logout();
		$location.path('/login');
	};
})
.controller('LogoutCtrl', function($scope, $q, $location, login) {
		login.logout();
		$location.path('/login');
//		$window.location.href = 'index.html';
})
.controller('LoginCtrl', function($scope, $q, $location, login) {
	$scope.email = null;
	$scope.pass = null;
	$scope.confirm = null;
	$scope.createMode = false;
	$scope.err = "";

	$scope.login = function(email, pass) {
		$scope.err = null;
		pass = pass.toSHA1();
		login.login(email, pass).then(function(/* user */) {
			$location.path('/account');
		}, function(err) {
			$scope.err = err;
		});
	};
		
	$scope.createAccount = function() {
		$scope.err = null;
		if( assertValidAccountProps() ) {
			var pass = $scope.pass;
			pass = pass.toSHA1();
			login.createAccount($scope.email, pass).then(function(/* user */) {
				$location.path('/account');
			}, function(err) {
				$scope.err = err;
			});
		}
	};
	
	function assertValidAccountProps() {
		if( !$scope.email ) {
			$scope.err = 'Please enter an email address';
		}else if( !$scope.pass || !$scope.confirm ) {
			$scope.err = 'Please enter a password';
		} else if( $scope.createMode && $scope.pass !== $scope.confirm ) {
			$scope.err = 'Passwords do not match';
		}
		return !$scope.err;
	}
	
	function errMessage(err) {
		return angular.isObject(err) && err.code? err.code : err + '';
	}
})
.controller('AccountFormCtrl', function($scope, $location, $window, me, User, Login) {
	$scope.showform = false;
	$scope.user = me;
	
	var login = new Login();
	if( !login.isLoggedIn() ){
		console.log("bye");
		$location.path('/login');
	}

	$scope.token = login._getToken();
	$scope.showform = true;

	$scope.userCopy = angular.copy( $scope.user );

	$scope.save = function(){
		$scope.user.$saveOrUpdate().then(function(returnData){
			$location.path('/account/edit');
		}, function(error) {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.remove = function() {
		$scope.user.$remove(function() {
			$location.path('/account/edit');
		}, function() {
			throw new Error('Sth went wrong...');
		});
	};

	$scope.hasChanges = function(){
		return !angular.equals($scope.user, $scope.userCopy);
	};
})
.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'account/login.html',
		controller: 'LoginCtrl',
		resolve:{
			login:function( Login ){
				return new Login();
			}
		}
	}).when('/account', {
		templateUrl: 'account/account.html',
		controller: 'AccountCtrl',
		resolve:{
			login:function( Login ){
				return new Login();
			},
			me:function(User, Login){
				var login = new Login();
				if( login.isLoggedIn() ){
					var token = login._getToken();
					var u = User.getById(token);
					return u;
				}
			}
		}
	}).when('/account/edit', {
		templateUrl: 'account/form.html',
		controller: 'AccountFormCtrl',
		resolve:{
			login:function( Login ){
				return new Login();
			},
			me:function(User, Login){
				var login = new Login();
				if( login.isLoggedIn() ){
					var token = login._getToken();
					var u = User.getById(token);
					return u;
				}
			} 
		}
	}).when('/logout', {
		templateUrl: 'account/account.html',
		controller: 'LogoutCtrl',
		resolve:{
			login:function( Login ){
				return new Login();
			}
		}
	});	
}]);