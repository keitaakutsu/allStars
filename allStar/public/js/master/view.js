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
						.tag('.answerLine.row').attr('id','a'+list[0].id).text(list[0].id+'. '+list[0].content).gat()
						.tag('.answerLine.row').attr('id','a'+list[1].id).text(list[1].id+'. '+list[1].content).gat()
						.tag('.answerLine.row').attr('id','a'+list[2].id).text(list[2].id+'. '+list[2].content).gat()
						.tag('.answerLine.row').attr('id','a'+list[3].id).text(list[3].id+'. '+list[3].content).gat()
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
			var a1 = $('#a1');
			var a2 = $('#a2');
			var a3 = $('#a3');
			var a4 = $('#a4');
			console.log(a1, a2, a3, a4);

			var a1c = $.tag('.answerCount').text(data[1]);
			var a2c = $.tag('.answerCount').text(data[2]);
			var a3c = $.tag('.answerCount').text(data[3]);
			var a4c = $.tag('.answerCount').text(data[4]);

			a1.append(a1c);
			a2.append(a2c);
			a3.append(a3c);
			a4.append(a4c);


		} else if (state === 'answer') {
			var answer = data.answer;
			$('#a'+answer).css({'background-color':'red'});
		}
	};

	var ranking = function (state, data) {
		resetView();
		var c = $.tag('#ranking.container');

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
