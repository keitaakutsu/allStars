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

exports.getQuestion = function (id) {
	var q = _.find(question, {id: id});
	return q;
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


