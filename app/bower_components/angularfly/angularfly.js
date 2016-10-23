angular.module('flybaseResourceHttp', [])
	.factory('$flybaseResourceHttp', ['FLYBASE_CONFIG', '$http', '$q', function (FLYBASE_CONFIG, $http, $q) {

	function DflybaseResourceFactory(collectionName) {

		var config = angular.extend({
			BASE_URL: 'https://api.flybase.io/databases/',
			PUSH_URL: 'https://push.flybase.io/',
		}, FLYBASE_CONFIG);

		var dbUrl = config.BASE_URL + config.DB_NAME;
		var pUrl = config.PUSH_URL;
		var collectionUrl = dbUrl + '/collections/' + collectionName;
		var defaultParams = {apiKey: config.API_KEY};

		var FlybaseRef = new Flybase(config.API_KEY, config.DB_NAME, collectionName);
		


		var resourceRespTransform = function (response) {
			return new Resource(response.data);
		};

		var resourcesArrayRespTransform = function (response) {
			return response.data.map(function(item){
				return new Resource(item);
			});
		};
		
		var preparyQueryParam = function (queryJson) {
			return angular.isObject(queryJson) && Object.keys(queryJson).length ? {q: JSON.stringify(queryJson)} : {};
		};

		var Resource = function (data) {
			angular.extend(this, data);
		};
		$http.defaults.headers.common['X-Flybase-API-Key'] = config.API_KEY;

		Resource.flybase = function(){
			return FlybaseRef;	
		};

		Resource.query = function (queryJson, options) {

			var prepareOptions = function (options) {

				var optionsMapping = {sort: 's', limit: 'l', fields: 'f', skip: 'sk'};
				var optionsTranslated = {};

				if (options && !angular.equals(options, {})) {
					angular.forEach(optionsMapping, function (targetOption, sourceOption) {
						if (angular.isDefined(options[sourceOption])) {
							if (angular.isObject(options[sourceOption])) {
								optionsTranslated[targetOption] = JSON.stringify(options[sourceOption]);
							} else {
								optionsTranslated[targetOption] = options[sourceOption];
							}
						}
					});
				}
				return optionsTranslated;
			};

			var requestParams = angular.extend({}, defaultParams, preparyQueryParam(queryJson), prepareOptions(options));
			return $http.get(collectionUrl, {params: requestParams}).then(resourcesArrayRespTransform);
		};

		Resource.all = function (options, successcb, errorcb) {
			return Resource.query({}, options || {});
		};

		Resource.count = function (queryJson) {
			return $http.get(collectionUrl, {
				params: angular.extend({}, defaultParams, preparyQueryParam(queryJson), {c: true})
			}).then(function(response){
				return response.data;
			});
		};

		Resource.getById = function (id) {
//			console.log( "------ " + id + " -------" );
			return $http.get(collectionUrl + '/' + id, {params: defaultParams}).then(resourceRespTransform);
		};

		Resource.getByObjectIds = function (ids) {
			var qin = [];
			angular.forEach(ids, function (id) {
				qin.push({$oid: id});
			});
			return Resource.query({_id: {$in: qin}});
		};

		//instance methods

		Resource.prototype.$id = function () {			
			if (this._id && this._id.$oid) {
				return this._id.$oid;
			} else if (this._id) {
				return this._id;
			}
		};

		Resource.prototype.$save = function () {
			return $http.post(collectionUrl, this, {params: defaultParams}).then(resourceRespTransform);
		};

		Resource.prototype.$update = function () {
			return  $http.put(collectionUrl + "/" + this.$id(), angular.extend({}, this, {_id: undefined}), {params: defaultParams})
				.then(resourceRespTransform);
		};

		Resource.prototype.$saveOrUpdate = function () {
			return this.$id() ? this.$update() : this.$save();
		};

		Resource.prototype.$remove = function () {
			return $http['delete'](collectionUrl + "/" + this.$id(), {params: defaultParams}).then(resourceRespTransform);
		};

		Resource.validate_key = function(){
			var url = pUrl + 'validate_key/' + config.API_KEY;
			return $http.get(url, {params: defaultParams});
		};

		//	Set notifications when event is returned...
		Resource.on = function( key, callback ){
			FlybaseRef.on( key, callback );
		};
		
		//	Send message to notification server...
		Resource.trigger = function(event, message){
			return FlybaseRef.trigger( event, message );
		};
		Resource.emit  = function(event, message) {
			return FlybaseRef.trigger( event, message );
		};

		return Resource;
	}

	return DflybaseResourceFactory;
}]);