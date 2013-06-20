var _ = require('lodash');
var question = require('./question').data;

// manage users
var userList = [];

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
			data = {
				id: id,
				question: q.question
			};
			break;
		case 'start':
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
			data = {
				id: id,
				1: 11,
				2: 12,
				3: 13,
				4: 14
			};
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
				ranking:[
					{rank:1, name:'aaa1', time: '1.354'},
					{rank:2, name:'aaa2', time: '2.354'},
					{rank:3, name:'aaa3', time: '3.354'},
					{rank:4, name:'aaa4', time: '4.354'},
					{rank:5, name:'aaa5', time: '5.354'},
				]
			};
			break;
	}
	return data;
}

function getAllData(state) {_
	var data;
	var states = state.split(':');
	switch (states[1]) {
		case 'ranking':
			break;
		case 'end':
			break;
		case 'ending':
			break;
	}
	return 'all';
}

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
		return (now - self.time);
	}
};


/**
 * User
 * */
var User = function (opts) {
	this.id = _.uniqueId('ASC_');
	this.connectionId = opts.connectionId;
	this.name = opts.name || 'no name';
	this.changeState('connected');
};


User.prototype =  {
	changeState: function (state) {
		this.state = state;
	},


};


