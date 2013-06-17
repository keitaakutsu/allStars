var userList = [];

var register = function (user) {
	userList.push(user);
};


/**
 * User
 * */
var User = function (opts) {
	this.name = opts.name || 'no name';
	this.connectionId = opts.connectionId;
	this.changeState('connected');
};


User.prototype =  {
	changeState: function (state) {
		this.state = state;
	},
};












var createUser = function () {
	return new User();
}

exports = {
	createUser:  createUser,
	register: register,
};
