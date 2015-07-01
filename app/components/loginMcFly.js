'use strict';

angular.module('loginMcFly', [])
.factory('$loginMcFly', ['FLYBASE_CONFIG', '$http', '$q', '$localstorage', '$rootScope', function (FLYBASE_CONFIG, $http, $q, $localstorage, $rootScope) {
	return function() {
		var loginRef = new Flybase(FLYBASE_CONFIG.API_KEY, FLYBASE_CONFIG.DB_NAME, "_users");
		$rootScope._loggedIn = "";
		
		var Resource = function () {
			this.flybaseRef = loginRef;
			this._user = {};
			$rootScope._loggedIn = "";
			var _this = this;
			if( this.isLoggedIn() ){
				this.getUser( _this._getToken(), function( user ){
					_this._user = user;
				});
			}
			return true;
		};

		Resource.prototype.watch = function(callback, deep) {
			var _this = this;
			$rootScope.$watch('_loggedIn', function(newVal, oldVal){
				callback( newVal );
			});				
		};


		Resource.prototype.createAccount = function(email,pass){
			var _this = this;
			return $q(function(resolve, reject) {
				_this.createUser(email, pass, function(error, userData) {
					if (error) {
						reject( error );
						$scope.err = error;
					} else {
						resolve( userData );
					}
				});
			});
		};
		
		Resource.prototype.createUser = function( email, password, callback, options ){
			var _this = this;
			this.flybaseRef.where({'email':email}).limit(1).once('value', function( data ){
				var error = null;
				if( data.count() > 0 ){
					error = "user exists";
					callback( error );
				}else{
					var user = { 'email': email, 'password': password };
					_this.flybaseRef.push( user, function(data){
						console.log('Insert Documents : ', data);
						callback( error );
					});
				}
			});
			return true;
		};
		
		Resource.prototype.login = function(email,pass){
			var _this = this;
			return $q(function(resolve, reject) {
				_this._login(email, pass, function(error, userData) {
					if (error) {
						reject( error );
						$scope.err = error;
					} else {
						resolve( userData );
					}
				});
			});
		};
		
		Resource.prototype._login = function( email, password, callback, options ){
			var _this = this;
			this.flybaseRef.where({'email':email,'password':password}).limit(1).once('value', function( data ){
				var error = null;
				if( data.count() > 0 ){
					var user = data.first().value();
					_this._setToken( user._id );
					callback("",user );
				}else{
					callback("No user found");
				}
			});
			return true;
		};
		

		Resource.prototype.getUser = function (uid ){
			var _this = this;
			return $q(function(resolve, reject) {
				_this.flybaseRef.where({'_id':uid}).limit(1).once('value', function(userData) {
					if( userData.count() ){
						resolve( userData.first().value() );
					}else{
						reject( "not logged in" );
					}
				});
			});
		};
				
		Resource.prototype.logout = function(){
			this._user = {};
			this._setToken("");
			$rootScope._loggedIn = "";
			$localstorage.remove("dmLtoken");			
		};
		
		Resource.prototype.isLoggedIn = function() {
			if ( this._getToken() ){
				var _this = this;
				$rootScope._loggedIn = this._getToken();
				this.getUser( this._getToken() ).then( function( user ) {
					_this._user = user;
				}, function(err) {
					//	error...
				});
				return true;
			}
			$rootScope._loggedIn = "";			
			return false;	
		};
		
		Resource.prototype.changeEmail = function( oldEmail, newEmail, password, callback ){
			console.log( "Starting connection" );
			return true;
		};
		
		Resource.prototype.changePassword = function( email, oldPassword, newPassword, callback ){
			console.log( "Starting connection" );
			return true;
		};
		
		Resource.prototype.resetPassword = function( email, callback ){
			console.log( "Starting connection" );
			return true;
		};
		
		Resource.prototype.removeUser = function( email, password, callback ){	
			console.log( "Starting connection" );
			return true;
		};
		
		/*
			clone is a handy function that takes a passed object and creates a copy of it, any changes made to the new copy 
			do not reflect in the original object.
		*/
		Resource.prototype._clone = function( obj ){
			return Object.create( obj );
		};
		
		Resource.prototype._getToken = function(){
			var token = $localstorage.get("dmLtoken");
			if( token !== null ){
				return token;
			}
			return false;
		};
		
		Resource.prototype._setToken = function( token ){
			if( token == "" ){
				$localstorage.remove("dmLtoken");
			}else{
				$localstorage.set("dmLtoken", token);
			}
		};

		Resource.prototype.hashCode = function( string ){
			if (Array.prototype.reduce){
				return string.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
			} 
			var hash = 0;
			if (string.length === 0) return hash;
			for (var i = 0; i < string.length; i++) {
				var character  = string.charCodeAt(i);
				hash  = ((hash<<5)-hash)+character;
				hash = hash & hash; // Convert to 32bit integer
			}
			return hash;
		};
	
		Resource.prototype.flybase = function(){
			return this.flybaseRef;
		};
		return Resource;
	};
}]);