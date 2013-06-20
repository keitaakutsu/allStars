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
	//var input = prompt('need password');
	var token = null;
	var lock = false;
	socket.emit('getMasterToken', null);
	socket.on('setMasterToken', function (_token) {
		//if (!_token) location.href = 'http://yahoo.co.jp';
		token = _token;
		socket.emit('getState');
	});

	// next Event
	document.onkeydown = function (e) {
		if (e.keyCode == 13 && !lock) {
			socket.emit('next', {token: token});
		}
	};

	socket.on('entry:start', function (data) {
		console.log('entry:start',data);
		sounds.entryBGM.loop = true;
		sounds.entryBGM.play();
		view.entry('start');
	});

	socket.on('entry:exit', function (data) {
		console.log('entry:exit', data);
		sounds.entryBGM.pause();
		sounds.period.play();
		view.entry('exit', data);
	});

	socket.on('q:show', function (data) {
		console.log('q:show', data);
		sounds.start.load();
		sounds.start.play();
		view.QuizShow('show', data);
	});
	socket.on('q:start', function (data) {
		console.log('q:start',data);
		sounds.thinking.load();
		sounds.thinking.play();
		console.log(socket);
		view.Quiz('start', data, function () {
			socket.emit('next', {token: token});
		});
	});
	socket.on('q:timeup', function (data) {
		console.log('q:timeup',data);
		sounds.thinking.pause();
		view.Quiz('timeup');
	});
	socket.on('q:check', function (data) {
		console.log('q:check',data);
		sounds.check.load();
		sounds.check.play();
		view.Quiz('check', data);
	});
	socket.on('q:answer', function (data) {
		console.log('q:answer',data);
		sounds.answer.load();
		sounds.answer.play();
		view.Quiz('answer', data);
	});
	socket.on('q:ranking', function (data) {
		console.log('q:ranking',data);
		sounds.result.load();
		sounds.result.play();
		view.Ranking(data);
	});
	socket.on('all:ranking', function (data) {
		console.log('all:ranking',data);
		sounds.result.load();
		sounds.result.play();
		view.Ranking(data);
	});
	socket.on('all:ending', function (data) {
		console.log('all:ending',data);
	});

	// add new user
	socket.on('register:member', function (data) {
		view.registered(data);
		sounds.login.load();
		sounds.login.play();
	});

});
