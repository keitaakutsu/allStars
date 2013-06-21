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
		container.append(entry);
	};

	var updateMember = function (num) {
		var member = tag('#member');
		var message = '只今の参加人数: ' + num + '人';
		member.text(num);
		container.append(member);
	};

	var quizShow = function (state, data) {
		resetView();
		var name = (data.id)? '第' + data.id + '問': '練習問題';
		var content = tag('.quiz-show.box')
						.tag('h2.text-center').text(name).gat()
						.tag('h3.question').css(center).text(data.question).gat()
		content.css({
			position: 'relative',
			top: '50%',
			marginTop: -content.height()/2
		});

		modal.append(content);
		container.append(modal);
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

				var list = data.answerList;
				var question = data.question;
				var title = tag('h2.title').text(name + ': ' + question);
				header.append(title);

				var content = tag('#quiz')
								.tag('.top-container')
									.tag('.answer-box').data({id: 'a' + list[0].id})
										.tag('.in')
											.tag('img').attr({src: list[0].content}).gat()
										.gat()
									.gat()
									.tag('.answer-box').data({id: 'a' + list[1].id})
										.tag('.in')
											.tag('img').attr({src: list[1].content}).gat()
										.gat()
									.gat()
								.gat()
								.tag('.bottom-container')
									.tag('.answer-box').data({id: 'a' + list[2].id})
										.tag('.in')
											.tag('img').attr({src: list[2].content}).gat()
										.gat()
									.gat()
									.tag('.answer-box').data({id: 'a' + list[3].id})
										.tag('.in')
											.tag('img').attr({src: list[3].content}).gat()
										.gat()
									.gat()
								.gat()

				main.append(content);

			}

			var time = 3;
			var timer = tag('#timer').text(time);
			var timerId = setInterval(function() {
				if (time <= 0) {
					clearInterval(timerId);
					call();
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
			$('#timer').cls('timeup');
		// answer check
		} else if (state === 'check') {

			$('#a1').append(tag('.answer-count').text(String(data[1])));
			$('#a2').append(tag('.answer-count').text(String(data[2])));
			$('#a3').append(tag('.answer-count').text(String(data[3])));
			$('#a4').append(tag('.answer-count').text(String(data[4])));

		// show answer
		} else if (state === 'answer') {
			var answer = data.answer || 1;
			$('#a'+answer).cls('answer');
		}
	};

	var ranking = function (state, data) {
		resetView();
		var content = tag('#ranking');
		data = data || {};
		data.ranking = data.ranking || [];

		var ranking = data.ranking.length === 0 ?
		[{
			rank: 1,
			name: 'test',
			time: '11.1'
		},
		{
			rank: 2,
			name: 'test2',
			time: '11.1'
		},
		{
			rank: 3,
			name: 'test3',
			time: '11.1'
		},
		{
			rank: 4,
			name: 'test2',
			time: '11.1'
		},
		{
			rank: 5,
			name: 'test3',
			time: '11.1'
		},
		{
			rank: 6,
			name: 'test2',
			time: '11.1'
		},
		{
			rank: 7,
			name: 'test3',
			time: '11.1'
		},
		{
			rank: 8,
			name: 'test2',
			time: '11.1'
		},
		{
			rank: 9,
			name: 'test3',
			time: '11.1'
		},
		{
			rank: 10,
			name: 'test2',
			time: '11.1'
		},
		{
			rank: 11,
			name: 'test3',
			time: '11.1'
		},
		{
			rank: 12,
			name: 'test2',
			time: '11.1'
		},
		{
			rank: 13,
			name: 'test3',
			time: '11.1'
		}
		]
		: data.ranking;

		if (state === 'q') {
			var interval = 5000 / ranking.length;
			var cnt = ranking.length;

			setTimeout(function() {
				cnt-- ;
				if (cnt < 0) {
				} else {
					var user = ranking[cnt];
					var rank = user.rank <= 5 ? 'large' : '';
					content
						.prepend(
							tag('.ranking-box').cls(rank)
								.tag('.ranking-rank').text(user.rank).gat()
								.tag('.ranking-user').text(user.name).gat()
								.tag('.ranking-time').text(user.time).gat()
						);
					setTimeout(arguments.callee, interval);
				}
			}, interval);
		} else if (state === 'all') {
			var interval = 5000 / ranking.length;
			var cnt = ranking.length;

			setTimeout(function() {
				cnt-- ;
				if (cnt < 0) {
				} else {
					var user = ranking[cnt];
					var rank = user.rank <= 5 ? 'large' : '';
					content
						.prepend(
							tag('.ranking-box').cls(rank)
								.tag('.ranking-rank').text(user.rank).gat()
								.tag('.ranking-user').text(user.name).gat()
								.tag('.ranking-time').text(user.time).gat()
						);
					setTimeout(arguments.callee, interval);
				}
			}, interval);
		}

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
