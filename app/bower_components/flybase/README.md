Flybase.js
==========

This library wraps calls from the [Flybase.io API](http://flybase.io)

Usage
-----

```javascript

	var myApp = new Flybase('YOUR_API_KEY','YOUR-APP','YOUR-COLLECTION');

	//list documents
	myApp.get(function(data){
		console.log('List Documents : ', data);
	});

	//insert documents
	myApp.push({mytest : 'testing'}, function(data){
		console.log('Insert Documents : ', data);
	});

	//update document
	myApp.updateDocument('1234566', {name : 'myself'}, function(data){
		console.log('Insert Documents : ', data);
	});

	//delete document
	myApp.deleteDocument('502851432', function(data){
		console.log('Delete Document : ', data);
	});

```

## Querying

To get the documents in the specified collection. If no parameters are passed, it lists all of them. Otherwise, it lists the documents in the collection matching the specified parameters:

```
GET /apps/{app}/collections/{collection}
```

Example listing all documents in a given collection:

```
https://api.flybase.io/apps/my-app/collections/my-coll?apiKey=myAPIKey

Optional parameters

[q=<query>][&c=true][&f=<fields>][&fo=true][&s=<order>][&sk=<skip>][&l=<limit>]
```

### Optional parameters:

1. `q=<query>` - restrict results by the specified JSON query. Queries are structured similar to mongodb, this gives you more control.
2. `c=true` - return the result count for this query
3. `f=<set of fields>` - specify the set of fields to include or exclude in each document (1 - include; 0 - exclude)
4. `fo=true` - return a single document from the result set (same as findOne() using the mongo shell
5. `s=<sort order>` - specify the order in which to sort each specified field (1- ascending; -1 - descending)
6. `sk=<num results to skip>` - specify the number of results to skip in the result set; useful for paging
7. `l=<limit>` - specify the limit for the number of results (default is 1000)

### Examples using these parameters:

```
"q" example - return all documents with "active" field of true:
https://api.flybase.io/apps/my-app/collections/my-coll?q={"active": true}&apiKey=myAPIKey

"c" example - return the count of documents with "active" of true:
https://api.flybase.io/apps/my-app/collections/my-coll?q={"active": true}&c=true&apiKey=myAPIKey

"f" example (include) - return all documents but include only the "firstName" and "lastName" fields:
https://api.flybase.io/apps/my-app/collections/my-coll?f={"firstName": 1, "lastName": 1}&apiKey=myAPIKey

"f" example (exclude) - return all documents but exclude the "notes" field:
https://api.flybase.io/apps/my-app/collections/my-coll?f={"notes": 0}&apiKey=myAPIKey

"fo" example - return a single document matching "active" field of true:
https://api.flybase.io/apps/my-app/collections/my-coll?q={"active": true}&fo=true&apiKey=myAPIKey

"s" example - return all documents sorted by "priority" ascending and "difficulty" descending:
 https://api.flybase.io/apps/my-app/collections/my-coll?s={"priority": 1, "difficulty": -1}&apiKey=myAPIKey

"sk" and "l" example - sort by "name" ascending and return 10 documents after skipping 20
 https://api.flybase.io/apps/my-app/collections/my-coll?s={"name":1}&sk=20&l=10&apiKey=myAPIKey
```

Check out the `chatdemo` folder to see an example of a real-time chat page.