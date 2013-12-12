var _ = require('lodash');


var re = _.sortBy([
		{id: 1, time: 1.35},
		{id: 2, time: 3.35},
		{id: 3, time: 2.35},
		{id: 4, time: 5.35},
		{id: 5, time: 4.35},
], function (user) {
	return user.time;
});

console.log(re);
