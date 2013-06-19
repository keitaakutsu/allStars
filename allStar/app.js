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
var state = AllStar.state.init();
console.log(AllStar.state.stateList);
var socket = io.listen(server);
var token = 'kgsihpthjsdfiwojwpea:ofjdsj';
// set Bug
//socket.set('log level', 1);
socket.on('connection', function (client) {
	var id = client.id;
	client.on('getState', function () {
		client.emit(state);
	});
	client.on('next', function (data) {
		if (data.token !== token) return;
		state = AllStar.state.next();
		//var data = AllStar.getData(state, data);
		var _state = state.split(':');
		state = (_state[2])? _state[0]+':'+_state[1]: state;
		socket.sockets.emit(state, _state[2]);
	});

	// check already registered
	client.on('register', function (data) {
		if (!data) return;
		var user = AllStar.register(id, data);
		client.emit('registered', user);
	});


	client.on('getMasterToken', function (password) {
		if (!password) return;
		var t = (password === 'unkodesu')? token: null;
		client.emit('setMasterToken', t);
	});


	// disconected
	client.on('disconnect', function () {

	});
});
