define(['jquery', 'chikuwa'], function (_$, $) {
	var center = {
		'display':'-webkit-box',
		'-webkit-box-align': 'center',
		'-webkit-box-pack': 'center',
		'width': '100%',
		'height': '100%'
	};
	var container = $('#main');
	var entry = function (state, data) {
		var entry = $.tag('#entry').css(center);
		if (state === 'start') {
			var logo = $.tag('img').attr('src', 'img/logo.png');
			entry.append(logo);
		} else {
			container.empty();
		}
	};

	var updateMember = function (num) {
		var member = $('#member');
		member.text(num);
	};

	var quizShow = function (state, data) {
		var show = $.tag('#show').css(center);
	};

	var quiz = function (state, data) {
		//start
		//timeup
		//check
		//answer

	};

	var ranking = function () {



	};

	var resetView = container.empty();

	var view = {
		entry: entry,
		updateMember: updateMember,
		QuizShow: quizShow,
		Quiz: quiz,
		Ranking: ranking
	};

	return view;
});
