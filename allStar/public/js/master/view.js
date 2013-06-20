define(['jquery', 'chikuwa', 'lodash'], function (_$, $, _) {
	var center = {
		'display':'-webkit-box',
		'-webkit-box-align': 'center',
		'-webkit-box-pack': 'center',
	};
	var tag = $.tag;
	var backContainer = tag('#back-container');
	var container = $('#main');

	var entry = function (state, data) {
		var entry = tag('#entry').css(center);
		if (state === 'start') {
			var logo = tag('img').attr('src', 'img/logo.png');
			entry.append(logo);
		} else {
			resetView();
		}
	};

	var updateMember = function (num) {
		var member = $('#member');
		member.text(num);
	};

	var quizShow = function (state, data) {
		resetView();
		var name = (data.id)? '第' + data.id + '問': '練習問題';
		var content = tag('.container')
			.tag('#header')
				.tag('h2.text-center').text(name).gat()
			.gat()
			.tag('h1.question.text-center').css(center).text(data.question).gat()

		container.append(content);
		container.append(backContainer);
	};

	var quiz = function (state, data, call) {
		data = data || {};
		var type = data.type || null;

		// quiz start
		if (state === 'start') {
			resetView();
			var name = data.id ? '第' + data.id + '問': '練習問題';

			if (type === 'text') {

				var list = data.answerList;
				var question = data.question;
				var content = tag('#quiz.container')
								.tag('#header.row')
									.tag('h2.span10').text(name + ': ' + question).gat()
								.gat()
								.tag('.answerList.row')
									.tag('.answer-line.row').attr('id','a'+list[0].id).text(list[0].id+'. '+list[0].content).gat()
									.tag('.answer-line.row').attr('id','a'+list[1].id).text(list[1].id+'. '+list[1].content).gat()
									.tag('.answer-line.row').attr('id','a'+list[2].id).text(list[2].id+'. '+list[2].content).gat()
									.tag('.answer-line.row').attr('id','a'+list[3].id).text(list[3].id+'. '+list[3].content).gat()
								.gat();

			} else if (type === 'image') {



			}

			var timer = tag('#timer.span2').text(15);
			var time = 15;
			var timerId = setInterval(function() {
				if (time <= 0) {
					clearInterval(timerId);
					call();
					return;
				}
				time--;
				timer.text(String(time));
			}, 1000);

			container.append(content);
			container.append(backContainer);
			$('#header').append(timer);

		// time up
		} else if (state === 'timeup') {

		// answer check
		} else if (state === 'check') {

			$('#a1').append(tag('.answer-count').text(String(data[1])));
			$('#a2').append(tag('.answer-count').text(String(data[2])));
			$('#a3').append(tag('.answer-count').text(String(data[3])));
			$('#a4').append(tag('.answer-count').text(String(data[4])));

		// show answer
		} else if (state === 'answer') {
			var answer = data.answer || 1;
			$('#a'+answer).cls('answer')
		}
	};

	var ranking = function (state, data) {
		resetView();
		var c = tag('#ranking.container');

		_.each(data.ranking, function (user) {
			c.tag('.ranking-user.row').text(user.rank +' '+user.name+' '+user.time).gat();
		});

		container.append(c);

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
