var _ = require('lodash');
var question = require('./question').data;

// manage users
var userList = [];
var correctAnswerList = [];
var answers = {
	1: 0,
	2: 0,
	3: 0,
	4: 0
}

exports.register = function (connectionId, data) {
	// get user from list
	var user = _.find(userList,{id: data.id});
	if (user) {
		// reconnected user
		user.connectionId = connectionId;
	} else {
		// new user
		user = new User({
			connectionId: connectionId,
			name: data.name,
		});
		userList.push(user);
	}
	console.log('userConnection******************');
	console.log(userList);
	return user;
};

exports.getData = function (state) {
	var date;
	var states = state.split(':');
	switch (states[0]) {
		case 'entry':
			data = userList.length;
			break;
		case 'q':
			data = getQData(state);
			break;
		case 'all':
			data = getAllData(state);
			break;
	}
	//var q = _.find(question, {id: id});
	return data;
};

function getQData(state) {
	var data;
	var states = state.split(':');
	var id = parseInt(states[2], 10);
	var q = _.find(question, {id: id});
	switch (states[1]) {
		case 'show':
			answers = {
				1: 0,
				2: 0,
				3: 0,
				4: 0
			}
			data = {
				id: id,
				question: q.question
			};
			break;
		case 'start':
			correctAnswerList = [];
			data = {
				id: id,
				question: q.question,
				type: q.type,
				answerList: q.answerList
			};
			break;
		case 'timeup':
			break;
		case 'check':
			answers.id = id;
			data = answers;
			break;
		case 'answer':
			data = {
				id: id,
				answer: q.answer
			}
			break;
		case 'ranking':
			data = {
				id: id,
				ranking: rankingSort(correctAnswerList)
			};
			break;
	}
	return data;
}
function rankingSort(list) {
	var result = _.sortBy(list, function (user) {
		return user.time;
	});
	_.each(result, function (user, index) {
		user.rank = index + 1;
	});
	return result;
}

function rankingSort(list) {
	var result = _.sortBy(list, function (user) {
		return user.time;
	});
	_.each(result, function (user, index) {
		user.rank = index + 1;
	});
	return result;
}



function allRankingSort(cluster) {
	var result = [];
	var _cluster = [];
	_.each(cluster, function (v, k) {
		_cluster[k] = _.sortBy(v, function (user) {
			return user.time;
		});
	});

	var __cluster = _.sortBy(_cluster, function (v, k) {
		return k;
	});

	_.each(__cluster, function (data) {
		result = result.concat(data);
	});

	return result;
}


function getAllRanking() {
	var cluster = {};
	_.each(userList, function (user) {
		var answer = user.answerList;
		var count = 0;
		var timeCount = 0;
		_.each(answer, function (ans) {
			if (ans.flg) {
				count++;
				timeCount += ans.time;
			}
		});
		if (!cluster[count]) {
			cluster[count] = [];
		}
		cluster.push({
			id: user.id	,
			name: user.name,
			time: timeCount,
			count: count,
		});
	});
	var result = allRankingSort(cluster);
	return result;
}

function getAllData(state) {_
	var data;
	var states = state.split(':');
	switch (states[1]) {
		case 'ranking':
			data = getAllRanking();
			break;
		case 'end':
			break;
		case 'ending':
			break;
	}
	return data;
}

exports.answer = function (data) {
	console.log(data);
	console.log('answer');
	var self = this;
	var state = self.state.get();
	var states = state.split(':');
	var questionId = parseInt(states[2]);

	var q = _.find(question, {id: questionId});
	var ans = q.answer;

	var user = _.find(userList, {id: data.id});
	if (!user) return;
	console.log('user validation');
	//var already = _.find(user.answerList, {id: questionId});
	//if (already) return;

	answers[data.answer]++;
	console.log('count Answer');
	var flg = false;
	if (data.answer == ans) {
		flg = true;
		correctAnswerList.push({
			name: user.name,
			id: user.id,
			time: data.time
		});
		console.log('push correct List');
	}
	user.answerList.push({
		id:	questionId,
		flg: flg,
		time: data.time
	});
};

exports.state = {
	state: 0,
	stateList: [],
	init: function () {
		var self = this;
		self.stateList.push('entry:start');
		self.stateList.push('entry:exit');

		_.each(question, function (q) {
			var id = q.id;
			self.stateList.push('q:show:' + q.id);
			self.stateList.push('q:start:' + q.id);
			self.stateList.push('q:timeup:' + q.id);
			self.stateList.push('q:check:' + q.id);
			self.stateList.push('q:answer:' + q.id);
			self.stateList.push('q:ranking:' + q.id);
		});

		self.stateList.push('all:end');
		self.stateList.push('all:ranking:50');
		self.stateList.push('all:ranking:20');
		self.stateList.push('all:ranking:5');
		self.stateList.push('all:ranking:4');
		self.stateList.push('all:ranking:3');
		self.stateList.push('all:ranking:2');
		self.stateList.push('all:ranking:1');
		self.stateList.push('all:ending');
		return self.stateList[0];
	},
	get: function () {
		var self = this;
		return self.stateList[self.state];
	},
	next: function () {
		var self = this;
		if ((self.state + 1) < self.stateList.length) {
			self.state++;
		}
		return self.stateList[self.state];
	}
};


exports.timer = {
	state: null,
	time: null,
	start: function () {
		var self = this;
		self.set(new Date());
		self.state = 'start';
	},
	stop: function () {
		self.state = 'stop';
	},
	set: function (time) {
		this.time = time;
	},
	get: function () {
		var self = this;
		var now = new Date();
		return (now - self.time) / 1000;
	}
};


/**
 * User
 * */
var User = function (opts) {
	this.id = _.uniqueId('ASC_');
	this.connectionId = opts.connectionId;
	this.name = opts.name || 'no name';
};


User.prototype =  {
	answerList: []
};


