require({
	baseUrl: '',
	paths: {
		lodash: 'js/lib/lodash',
		chikuwa: 'js/lib/chikuwa',
	},
});

define(['lodash', 'chikuwa'], function (_, $) {
	var socket = io.connect(location.origin);
	var id = $.storage('_AS_ID');
	if (id) {
		console.log('already registered at once');
		socket.emit('register', {id: id});
	} else {
		console.log('initial register');
		socket.emit('register', {name: 'name'});
	}

	socket.on('registered', function (user) {
		console.log(user);
		$.storage('_AS_ID', user.id);
	});

	socket.on('entry:start', function (data) {
		console.log('entry:start', data);
	});
	socket.on('entry:exit', function (data) {
		console.log('entryExit', data);
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



});
