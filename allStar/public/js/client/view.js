define(['chikuwa', 'tofu'], function ($, tofu) {
	var tag = $.tag;
	var w = window;
	var container = $('#main');
	var emitter = tofu.init(tofu.EventEmitter);



	var top = function() {
		var entry = tag('div#entry')
						.tag('p').text('名前を入力してください。').gat()
						.tag('input', {type: 'text'}).gat();
		container.append(entry);
	}

	var resistered = function(data) {
	};

	var entry = function(state, data) {
		data = data || {};
		if (state === 'start') {
			var content = message.text('只今エントリー受付中です。');
		} else {
			var content = message.text('みんなのエントリーが\n完了しました。')
		}
	};

	var quiz = function (state, data) {
		data = data || {};
		var message = tag('div#message')
						.tag('div').cls('in').gat();

		switch (state) {
			case 'show':
				var content = message.text(data.id ? '第' + data.id + '問': '練習問題');
			break;
			case 'exit':
				var content = message.text('終了!');
			break;
			case 'start':
				var text = data.id ? '第'　+ data.id + '問' : '練習問題' ;
				var content = tag('div#quiz-show')
								.tag('p').cls('quiz').text(text).gat()
								.tag('div#btns')
									.tag('div#btn-top')
										.tag('div.btn').cls('btn-1').text(1).data({id: 1})
											.tap(select)
											.on('resize', resize)
										.gat()
										.tag('div.btn').cls('btn-2').text(2).data({id: 2})
											.tap(select)
											.on('resize', resize)
										.gat()
									.gat()
									.tag('div#btn-top')
										.tag('div.btn').cls('btn-3').text(3).data({id: 3})
											.tap(select)
											.on('resize', resize)
										.gat()
										.tag('div.btn').cls('btn-4').text(4).data({id: 4})
											.tap(select)
											.on('resize', resize)
										.gat()
									.gat()
								.gat();

				var selected = false;
				function select(e) {
					if (selected) return;

					var target = $(this);
					var answer = target.data('id');

					target.cls('selected');
					selected = true;
					emitter.emit('answer', answer);
				}

				var btnHeight = Math.abs(w.orientation) === 90 ? (w.innerHeight - 50) / 2 : (w.innerHeight - 50) / 4;
				function resize(e) {
					$(this).css({
						height: btnHeight,
						lineHeight: btnHeight
					});
				}

			break;
			case 'timeup':

			break;
			case 'check':

			break;
			case 'answer':
			break;
			case 'ranking':
			break;
			default:
			;
		}
		container.append(content);
		return emitter;
	};

	var all = function () {
		if (state === ranking) {

		} else {

		}
	};


	var resetView = container.empty();

	var view = {
		top: top,
		resistered: resistered,
		entry: entry,
		quiz: quiz,
		all: all,
		resetView: resetView
	};

	return view;
});
