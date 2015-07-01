/*
	APIService is the service used to talk to the local node.js API. This is for any local server-side things you want to do like send email, SMS, etc.	
*/
angular.module('APIService', []).factory('LocalApi', ['$http', '$q', 'SERVER_CONFIG', function($http, $q, SERVER_CONFIG) {
	var media;
	var o = {
		queue: []
	};

	o.init = function() {
		if (o.queue.length === 0) {
			return o.getNextSongs();
		} else {
			return o.playCurrentSong();
		}
	}	
	
	o.getNextSongs = function() {
		return $http({
			method: 'GET',
			url: SERVER_CONFIG.url + '/recommendations'
		}).success(function(data){
			o.queue = o.queue.concat(data);
		});
	}
	
	o.nextSong = function() {
		o.queue.shift();
		o.haltAudio();
		if (o.queue.length <= 3) {
			o.getNextSongs();
		}
	}	

	o.playCurrentSong = function() {
		var defer = $q.defer();
		media = new Audio(o.queue[0].preview_url);
		media.addEventListener("loadeddata", function() {
			defer.resolve();
		});
		
//		media.play();
		return defer.promise;
	}
	
	o.haltAudio = function() {
//		if (media) media.pause();
	}	
	
	return o;
}]);