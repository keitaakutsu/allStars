
/**
* user管理配列
*/
var users = [];
var correctUsersList = [];


/*
* 一人ひとりのユーザー
*/
exports.user = function(data){
	// facebookのID
	this.facebookId = data.facebookId;

	// connection Id
	this.connectionId = data.connectionId;

	// profileUrl
	this.profileUrl = data.profileUrl;

	// name 
	this.name = data.name;

	//answers
	this.answers = {};
};

exports.user.prototype = {
	score:0, //正解数
};


/**
* 一問一問のクイズ
*/
exports.quiz = function(data){

	//クイズID
	this.quizId = data.quizId;

	//問題文
	this.content = data.content;

	//答え
	this.answer = data.answer;

	this.counter = {
		0:0,
		1:0,
		2:0,
		3:0,
		4:0
	}
};

exports.quiz.prototype = {
};



//masterId
exports.masterId = 0;

//quizId
exports.quizId = null;

//quizの管理
exports.quizList = {};

exports.getUsers = function(){
	return users;
}


/**
* reset user list
*/
exports.reset = function(){
	users = [];
}

/**
* userの存在チェック
*/
exports.checkUser = function(facebookId){
	var result = false;
	for(var i = 0 ; i < users.length ; i++){
		if(users[i].facebookId == facebookId){
			result = true;
			break;
		}
	}
	return result;
}

/**
* userの追加
*/
exports.addUser = function(user){
	users.push(user);
};

/**
* userの追加
*/
exports.addCorrectUsersList = function(user){
	correctUsersList.push(user);
};

/**
* userの追加
*/
exports.resetCorrectUsersList = function(user){
	correctUsersList = [];
};

/**
* ユーザーの検索
*/
//type:0 connectionId, type:1, facebookId
exports.getUser = function(id, type){
	var result = null;
	for(var i = 0 ; i < users.length ; i++){
		if(type == 0){
			if(users[i].connectionId == id){
				result = users[i];
				break;
			}
		}else{
			if(users[i].facebookId == id){
				result = users[i];
				break;
			}
		}
	}
	return result;
};

exports.setEmptyAnswer = function(quizId){
	for(var i = 0 ; i < users.length ; i++){
		var ans = users[i].answers[quizId];
		if(!ans){
			users[i].answers[quizId] = {
				quizId:quizId,
				answer:4,
				time:null,
				flg:false
			};
		}
	}
}


exports.getResult = function(quizList, quizId){
	var result;
	countAnswer(quizList, quizId);

	result = {
		quizId:quizId,
		answer:quizList[quizId].answer,
		counter:quizList[quizId].counter,
		user:correctUsersList
	};

	return result;
}

function countAnswer(quizList, quizId){
	for(var i = 0 ; i < users.length ; i++){
		var ans = users[i].answers[quizId].answer;
		quizList[quizId].counter[ans]++;
	}
}

exports.getTotalResult = function(){
	var result = {};

	for(var i = 0 ; i < users.length ; i++){



		//回答数ごとに分類
		var userScore = getCorrectCount(users[i]);

		var userData = {
			name:users[i].name,
			profileUrl:users[i].profileUrl,
			count:userScore.count,
			time:userScore.time,
		};

		if(result[userScore.count]){
			result[userScore.count].push(userData);
		}else{
			result[userScore.count] = [];
			result[userScore.count].push(userData);
		}
	}
	
	var _result = [];
	//時間ごとにソート
	for(key in result){
		result[key].sort(
			function(a, b){
				if(a.time < b.time) return -1;
				if(a.time > b.time) return 1;
				return 0;
			}
		);
		_result = result[key].concat(_result);
	}

	return _result;
}

function getCorrectCount(user){
	var answers = user.answers;
	var count = 0;
	var time = 0;

	for(key in answers){
		if(answers[key].flg){
			count++;
			time += answers[key].time*1;
		}
	}
	return {time:(Math.floor(100*time))/100,count:count};
}





var timerStart = 0;

//quiz周り
exports.setTime = function(){
	timerStart = new Date();
}

exports.getTime = function(){
	var str = (Math.floor(((new Date()) - timerStart)/10)/100).toString().split('.');

	if(str[1]){
		str[1] = (str.length === 1) ? str[1]+'0' : str[1] ; 

	}else{
		str[1] = '00';
	}
	return str[0]+'.'+str[1];
}




















