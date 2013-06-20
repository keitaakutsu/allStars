define(['jquery', 'chikuwa', 'lodash'], function (_$, $, _) {
	var center = {
		'display':'-webkit-box',
		'-webkit-box-align': 'center',
		'-webkit-box-pack': 'center',
	};
	var container = $('#main');
	var backContainer = $.tag('.back-container');
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
		resetView();
		var name = (data.id)? '第' + data.id + '問': '練習問題';
		var content = $.tag('#show.container')
			.tag('#header')
				.tag('h2.text-center').text(name).gat()
			.gat()
			.tag('h1.question.text-center').css(center).text(data.question).gat()
		container.append(content);
		container.append(backContainer);
	};

	var quiz = function (state, data, call) {
		var type;
		if (state === 'start') {
			resetView();
			var name = (data.id)? '第' + data.id + '問': '練習問題';
			type = data.type;
			if (type === 'text') {
				var list = data.answerList;
				var question = data.question;
				var content = $.tag('#quiz.container')
					.tag('#header.row')
						.tag('h2.span10').text(name + ': ' + question).gat()
					.gat()
					.tag('.answerList.row')
						.tag('.answerLine.row#a'+list[0].id).text(list[0].id+'. '+list[0].content).gat()
						.tag('.answerLine.row#a'+list[1].id).text(list[1].id+'. '+list[1].content).gat()
						.tag('.answerLine.row#a'+list[2].id).text(list[2].id+'. '+list[2].content).gat()
						.tag('.answerLine.row#a'+list[3].id).text(list[3].id+'. '+list[3].content).gat()
					.gat();
			} else if (type === 'image') {


			}

			container.append(content);
			container.append(backContainer);

			var timer = $.tag('#timer.span2').text(15);
			var time = 15;
			var timerId = setInterval(function () {
				if (time <= 0) {
					clearInterval(timerId);
					call();
					return;
				}
				time--;
				timer.text(String(time));
			}, 1000);
			$('#header').append(timer);
		} else if (state === 'timeup') {
			// toggle color


		} else if (state === 'check') {




		} else if (state === 'answer') {

		}
	};

	var ranking = function () {



	};

	var resetView = function() {
		container.empty();
	};


	var view = {
		entry: entry,
		updateMember: updateMember,
		QuizShow: quizShow,
		Quiz: quiz,
		Ranking: ranking
	};

	return view;
});
