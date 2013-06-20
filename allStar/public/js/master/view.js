define(['jquery', 'chikuwa', 'lodash'], function (_$, $, _) {
	var center = {
		'display':'-webkit-box',
		'-webkit-box-align': 'center',
		'-webkit-box-pack': 'center',
	};
	var tag = $.tag;
	var container = $('#container');
	var modal = tag('#modal');
	var header = tag('#header');
	var main = tag('#main');

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
		var content = tag('.box')
						.tag('h2.text-center').text(name).gat()
						.tag('h1.question.text-center').css(center).text(data.question).gat()

		main.append(content);
		container.append(main);
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

				var title = tag('h2.title').text(name + ': ' + question);
				header.append(title);
				var content = tag('#quiz')
								.tag('.answer-list')
									.tag('.answer-line').attr('id','a'+list[0].id).text(list[0].id+'. '+list[0].content).gat()
									.tag('.answer-line').attr('id','a'+list[1].id).text(list[1].id+'. '+list[1].content).gat()
									.tag('.answer-line').attr('id','a'+list[2].id).text(list[2].id+'. '+list[2].content).gat()
									.tag('.answer-line').attr('id','a'+list[3].id).text(list[3].id+'. '+list[3].content).gat()
								.gat();
				main.append(content);

			} else if (type === 'image') {

				var list = data.anserList;
				var question = data.question;

				var title = tag('hs.span10').text(name + ': ' + question);
				header.append(title);
				var content = tag('#quiz.box')
								.tag('.box.top')
									.tag('.answer-box').data({id: 'a' + list[0].id}).text(list[0].id + '. ' + list[0].content).gat()
									.tag('.answer-box').data({id: 'a' + list[1].id}).text(list[1].id + '. ' + list[1].content).gat()
								.gat()
								.tag('.box.bottom')
									.tag('.answer-box').data({id: 'a' + list[2].id}).text(list[2].id + '. ' + list[2].content).gat()
									.tag('.answer-box').data({id: 'a' + list[3].id}).text(list[3].id + '. ' + list[3].content).gat()
								.gat()

				main.append(content);

			}

			var time = 3;
			var timer = tag('#timer').text(time);
			var timerId = setInterval(function() {
				if (time <= 0) {
					clearInterval(timerId);
					//call();
					return;
				}
				time--;
				timer.text(String(time));
			}, 1000);

			header.append(timer);

			container.append(header);
			container.append(main);

		// time up
		} else if (state === 'timeup') {
			//toggle color
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
		var content = tag('#ranking');

		data = data || {};
		data.ranking || [];
		// data.ranking = data.ranking.length === 0 ? [{
		// 	rank: 1,
		// 	name: 'test',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 2,
		// 	name: 'test2',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 3,
		// 	name: 'test3',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 2,
		// 	name: 'test2',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 3,
		// 	name: 'test3',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 2,
		// 	name: 'test2',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 3,
		// 	name: 'test3',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 2,
		// 	name: 'test2',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 3,
		// 	name: 'test3',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 2,
		// 	name: 'test2',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 3,
		// 	name: 'test3',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 2,
		// 	name: 'test2',
		// 	time: '11.1'
		// },
		// {
		// 	rank: 3,
		// 	name: 'test3',
		// 	time: '11.1'
		// }
		// ] : data.ranking;

		var interval = 5000 / data.ranking.length;
		var cnt = 0;
		setTimeout(function() {
			if (data.ranking[cnt ++]) {
				var user = data.ranking[cnt];
				content
					.prepend(
						tag('.ranking-box')
							.tag('.ranking-rank').text(user.rank).gat()
							.tag('.ranking-user').text(user.name).gat()
							.tag('.ranking-time').text(user.time).gat()
					);
				setTimeout(arguments.callee, interval);
			} else {

			}
		}, interval);
		// _.each(data.ranking, function (user) {
		// 	setInterval()
		// 	content
		// 		.tag('.ranking-box')
		// 			.tag('.ranking-rank').text(user.rank).gat()
		// 			.tag('.ranking-user').text(user.name).gat()
		// 			.tag('.ranking-time').text(user.time).gat()
		// 		.gat();
		// });

		modal.append(content);
		container.append(modal);
	};

	var resetView = function() {
		container.empty();
		header.empty();
		main.empty();
		modal.empty();
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
