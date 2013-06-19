define(['jquery'], function ($) {
	var container = $('#main');


	var entry = function () {
		container.text('entry');
	};

	var entryExit = function () {
		container.text('entry:exit');
	};

	var view = {
		entry: entry,
		entryExit: entryExit,
	};

	return view;
});
