var db = new PouchDB('phase');
var high = [{
		name : "null",
		score : 0
	}
];

db.info(function (err, info) {
    db.changes({
        since : info.update_seq,
        live : true,
        onChange : showTodos
    });
});


function addTodo(text, score) {
    console.log('addtodo');
	var todo = {
		_id : new Date().toISOString(),
		name : text,
		score : score
	};
	db.put(todo, function callback(err, result) {
		if (!err) {
			console.log('saved a score');
		}
		console.log(err + result);
	});
}

var score;
$('#submit').on('click', Foundation.utils.debounce(function (e) {
    $('#submit').addClass('disabled');

    name = $('#name').val();
		addTodo(name, score);
    console.log('submit');

	}, 300, true));

function death() {
	score = randScore();
	$("#scoreBox").text(score);
	$("#score2").text(score);
	$("#goldBox").text(randScore());
	$("#xpBox").text(randScore());
	$('#scoreModal').foundation('reveal', 'open');
	showTodos();
}
function randScore() {
	return Math.floor(Math.random() * 200);
}

function showTodos() {
	db.allDocs({
		include_docs : true,
		descending : true
	}, function (err, doc) {
		redrawTodosUI(doc.rows);
	});

    console.log('showtodos');
}
function redrawTodosUI(todos) {
	high = [{name:'null',score:0},{name:'null',score:0},{name:'null',score:0},{name:'null',score:0},{name:'null',score:0},{name:'null',score:0},{name:'null',score:0}];

	ul.innerHTML = "";
	temp = 0;
	todos.forEach(function (todo) {
		createTodoListItem(todo.doc, temp);
	});
    sortHighscores();
}

var temp;
var ul = document.getElementById('todo-list');

function createTodoListItem(todo) {

	high[high.length] = {
		score : parseInt(todo.score),
		name : todo.name
	};

	if (temp < 5) {
		var name = document.createElement('td');
		name.appendChild(document.createTextNode(todo.name));
		var score = document.createElement('td');
		score.appendChild(document.createTextNode(todo.score));
		var divDisplay = document.createElement('tr');
		divDisplay.className = 'view';
		divDisplay.appendChild(name);
		divDisplay.appendChild(score);
		var li = document.createElement('tr');
		li.id = 'li_' + todo._id;
		li.appendChild(divDisplay);
		ul.appendChild(divDisplay);
		temp++;
	}

}

var s;
function sortHighscores() {
	sort = high.sort(function (a, b) {
		return b.score - a.score
	});
	var a = document.getElementById('highscores');
	a.innerHTML = "";
	for (var i = 0; i < 5; i++) {
		//  s += high[i][0] + ',' + high[i][1] + '\n';
		var name = document.createElement('td');
		name.appendChild(document.createTextNode(sort[i].name));
		var score = document.createElement('td');
		score.appendChild(document.createTextNode(sort[i].score));
		var divDisplay = document.createElement('tr');
		divDisplay.className = 'view';
		divDisplay.appendChild(name);
		divDisplay.appendChild(score);
		a.appendChild(divDisplay);
	}

}
