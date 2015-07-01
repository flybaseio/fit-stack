## Promise-aware [Flybase](https://flybase/) $resource-like adapter for [AngularJS](http://angularjs.org/)

### Introduction

This repository hosts a Flybase [$resource](http://docs.angularjs.org/api/ngResource.$resource)-like adapter for [AngularJS](http://angularjs.org/).

It is based on [$http](http://docs.angularjs.org/api/ng.$http) and is working with [promises](https://docs.angularjs.org/api/ng/service/$q).

This is a small wrapper around the AngularJS $http that makes setting up and working with Flybase easy. It has an interface very similar to $resource but works with promises.

It significantly reduces the amount of boilerplate code one needs to write when interacting with Flybase (especially around URLs handling, resource objects creation and identifiers handling).

### Examples

Coming soon.


## Downloading

In order to use the Flybase Angular Adapter in your project, you need to include the following files in your HTML:

```html
<!-- AngularJS -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min.js"></script>

<!-- Flybase -->
<script src="https://cdn.flybase.io/flybase.js"></script>

<!-- Flybase Angular -->
<script src="https://cdn.flybase.io/angularfly.js"></script>
```

Use the URL above to download the Angular Adapter from the Flybase CDN. You can also download them from the
[releases page of this GitHub repository](https://github.com/flybaseio/angularfly/releases).
[Flybase](https://www.flybase.io/docs/web/quickstart/) and
[Angular](https://angularjs.org/) can be downloaded directly from their respective websites.

### Usage instructions

Then, you need to configure 2 parameters:

* Flybase API key (`API_KEY`)
* database name (`DB_NAME`)

Configuration parameters needs to be specified in a constant `FLYBASE_CONFIG` on an application's module:

```JavaScript
	var app = angular.module('app', ['flybaseResource']);
	app.constant('FLYBASE_CONFIG',{API_KEY:'your key goes here', DB_NAME:'angularjs'});
```

Then, creating new resources is very, very easy and boils down to calling `$flybaseResource` with a Flybase collection name:

```JavaScript
	app.factory('Project', function ($flybaseResourceHttp) {
		return $flybaseResourceHttp('projects');
	});
```

As soon as the above is done you are ready to inject and use a freshly created resource in your services and controllers:

```JavaScript
	app.controller('AppController', function ($scope, Project) {
		Project.all().then(function(projects){
			$scope.projects = projects;
		});
	});
```

Inside the angular app, You can access the `Flybase` object by calling:

```JavaScript
	Project.flybase();
```

Where `Project` is the collection being called.

### Documentation

Since this $resource-like implementation is based on `$http` and returns a promise.

Each resource created with the `$flybaseResourceHttp` will be equipped with the following methods:

* on the class level:
    * `Resource.all([options])`
    * `Resource.query(criteriaObject,[options])`
    * `Resource.getById(idString)`
    * `Resource.getByIds(idsArray)`
    * `Resource.count(criteriaObject)`
    * `Resource.distinct(fieldName, criteriaObject)`
* on an instance level:
    * `resource.$id()`
    * `resource.$save()`
    * `resource.$update()`
    * `resource.$saveOrUpdate()`
    * `resource.$remove()`

Resource `all` and `query` supported options:

  * `sort`: ex.: `Resource.all({ sort: {priority: 1} });`
  * `limit`: ex.: `Resource.all({ limit: 10 });`
  * `fields`: `1` - includes a field, `0` - excludes a field, ex.: `Resource.all({ fields: {name: 1, notes: 0} });`
  * `skip`: ex.: `Resource.all({ skip: 10 });`
  
 You also have access to all the usual Flybase javascript commands through the `Flybase` object:
 
 ```JavaScript
	var ref = Project.flybase();
```
