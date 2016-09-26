// modules =================================================
var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var flybase		   	= require('flybase');
var passport 		= require('passport');
var TokenGenerator 	= require('firebase-token-generator');
var compression = require('compression');
var serveStatic = require('serve-static');

// configuration ===========================================
	
// config files
var config = require('./config/site');
var flyConfig = require('./config/flybase');

var tokGen = new FirebaseTokenGenerator(config.secret);

var port = process.env.PORT || 8080; // set our port

if( flyConfig.api_key !== '' ){
	var Ref = flybase.init(flyConfig.app_name, "people", flyConfig.api_key );
}else{
	console.log("ಠ_ಠ - Please don't have an empty api_key");
}

// get all data/stuff of the body (POST) parameters
//	app.use(express.cookieParser(config.cookie_secret));
//	app.use(express.session({ secret: config.cookie_secret }));
app.use( bodyParser.json() ); // parse application/json 
app.use( bodyParser.json({ type: 'application/vnd.api+json' }) ); // parse application/vnd.api+json as json
app.use( bodyParser.urlencoded({ extended: true }) ); // parse application/x-www-form-urlencoded

app.use( methodOverride('X-HTTP-Method-Override') ); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use( express.static(__dirname + '/frontend') ); // set the static files location /frontend/img will be /img for users

function setCustomCacheControl(res, path) {
	if (serveStatic.mime.lookup(path) === 'text/html') {
		// Custom Cache-Control for HTML files
		res.setHeader('Cache-Control', 'public, max-age=0')
	}
}
app.use(compression());
app.use(serveStatic(__dirname + '/frontend', { 
	maxAge: '1d', 
	setHeaders: setCustomCacheControl,
	'index': ['index.html'],
	fallthrough: true
}));


// routes ==================================================
require('./app/routes')(app, config, flyConfig); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app