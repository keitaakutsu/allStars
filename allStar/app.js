/**
 * express server setting
 **/
var express = require('express')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')
  , routes = require('./routes');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/client', routes.client);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/* *
 * application socket io
 * */

var AllStar = require('./src/allStar');

var socket = io.listen(server);
socket.on('connection', function (client) {

	client.on('register', function (data) {



	});




});


	  // listen for new web clients:
	  // server.listen(8080);
