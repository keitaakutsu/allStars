require({
	baseUrl: '',
	paths: {
		lodash: 'js/lib/lodash',
		chikuwa: 'js/lib/chikuwa',
		sounds: 'js/master/sounds',
		view: 'js/master/view',
		jquery: 'js/lib/jq',
	},
});


define(['lodash', 'chikuwa', 'sounds', 'view'], function (_, $, sounds, view) {
	var socket = io.connect(location.origin);


	// need master recognition
	var input = prompt('need password');
	var token = null;
	var lock = false;
	socket.emit('getMasterToken', input);
	socket.on('setMasterToken', function (_token) {
		console.log(_token);
		if (!_token) location.href = 'http://yahoo.co.jp';
		token = _token;
		socket.emit('getState');
	});

	// next Event
	document.onkeydown = function (e) {
		if (e.keyCode == 13 && !lock) {
			console.log('next');
			socket.emit('next', {token: token});
		}
	};

	socket.on('entry:start', function (data) {
		console.log('entry:start', data);
		view.entry();
	});

	socket.on('entry:exit', function (data) {
		console.log('entryExit', data);
		view.entryExit();
	});

	socket.on('q:show', function (data) {
		console.log('q:show', data);
	});
	socket.on('q:start', function (data) {
		console.log('q:start', data);
	});
	socket.on('q:timeup', function (data) {
		console.log('q:timeup', data);
	});
	socket.on('q:check', function (data) {
		console.log('q:check', data);
	});
	socket.on('q:answer', function (data) {
		console.log('q:answer', data);
	});
	socket.on('q:ranking', function (data) {
		console.log('q:ranking', data);
	});
	socket.on('all:ranking', function (data) {
		console.log('ranking ' + data);
	});
	socket.on('all:ending', function (data) {
		console.log('ending', data);
	});

	// add new user
	socket.on('register-member', function (data) {
		view.registered(data);
	});

});
