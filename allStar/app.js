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
var socket = io.listen(server);
var token = 'kgsihpthjsdfiwojwpea:ofjdsj';
// set Bug
//socket.set('log level', 1);
socket.on('connection', function (client) {
	var id = client.id;
	client.on('getState', function () {
		state = AllStar.state.next();
		var data = AllStar.getData(state);
		client.emit(state, data);
	});
	client.on('next', function (data) {
		//if (data.token !== token) return;
		state = AllStar.state.next();
		var data = AllStar.getData(state);
		var _state = state.split(':');
		if (_state[1] === 'start') {
			AllStar.timer.start();
		}

		state = (_state[2])? _state[0]+':'+_state[1]: state;
		socket.sockets.emit(state, data);
	});

	// check already registered
	client.on('register', function (data) {
		if (!data) return;
		var user = AllStar.register(id, data);
		client.emit('registered', user);
	});


	client.on('getMasterToken', function (password) {
		//if (!password) return;
		var t = (password === 'unkodesu')? token: null;
		client.emit('setMasterToken', t);
	});

	// answer
	client.on('q:answer', function (data) {
		var time = AllStar.timer.get();
		var id = data.id;
		var ans = data.answer;
	});


	// disconected
	client.on('disconnect', function () {

	});
});
