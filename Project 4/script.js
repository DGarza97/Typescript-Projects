//chocolate
var quiz = [
    { q: "Who teaches this CSCI 3336 class?", opts: ["Emmet Tomai", "Andres Figueroa", "John Cena", "Gustavo Dietrich"], ans: "Andres Figueroa" },
    { q: "Which language does TypeScript need to be transpiled to before running code?", opts: ["Java", "Python", "JavaScript", "C++"], ans: "JavaScript" },
    { q: "What typing is TypeScript known for having?", opts: ["Static", "Dynamic", "Untyped", "Wrong"], ans: "Static" },
    { q: "What was the commented word hidden in the TypeScript file?", opts: ["Cookie", "Candy", "Chocolate", "Cinammon"], ans: "Chocolate" }
];
var timeEl = document.getElementById('t');
var qEl = document.querySelector('.q');
var optsEl = document.querySelector('.opts');
var resEl = document.querySelector('.rs');
var scrEl = document.getElementById('sc');
var restartEl = document.querySelector('.rst-btn');
var fbEl = document.querySelector('.fb');
var nextEl = document.querySelector('.next-btn');
var startScreen = document.querySelector('.start-screen');
var startBtn = document.querySelector('.start-btn');
var quizContainer = document.querySelector('.qz');
var idx = 0;
var scr = 0;
var time = 30;
var timer;
startBtn.addEventListener('click', function () {
    startScreen.style.display = 'none';
    quizContainer.style.display = 'flex';
    loadQ();
});
function loadQ() {
    if (idx >= quiz.length) {
        endQ();
        return;
    }
    clearInterval(timer);
    time = 30;
    timeEl.textContent = time.toString();
    fbEl.textContent = '';
    fbEl.className = 'fb';
    nextEl.style.display = 'none';
    var qData = quiz[idx];
    qEl.textContent = qData.q;
    optsEl.innerHTML = '';
    var _loop_1 = function (i) {
        var opt = qData.opts[i];
        var btn = document.createElement('button');
        btn.classList.add('opt');
        btn.textContent = (i + 1) + '. ' + opt;
        btn.onclick = function () { return checkA(opt, btn); };
        optsEl.appendChild(btn);
    };
    for (var i = 0; i < qData.opts.length; i++) {
        _loop_1(i);
    }
    startT();
}
function checkA(opt, btn) {
    clearInterval(timer);
    var correct = opt === quiz[idx].ans;
    if (correct) {
        scr++;
        fbEl.textContent = 'Correct!';
        fbEl.className = 'fb correct';
        btn.classList.add('correct');
    }
    else {
        fbEl.textContent = 'Wrong! Correct: ' + quiz[idx].ans;
        fbEl.className = 'fb wrong';
        btn.classList.add('wrong');
        for (var i = 0; i < optsEl.children.length; i++) {
            var child = optsEl.children[i];
            if (child.textContent && child.textContent.indexOf(quiz[idx].ans) !== -1) {
                child.classList.add('correct');
            }
        }
    }
    nextEl.style.display = 'block';
}
function startT() {
    timer = window.setInterval(function () {
        time--;
        timeEl.textContent = time.toString();
        if (time <= 0) {
            clearInterval(timer);
            fbEl.textContent = 'Time\'s up! Correct: ' + quiz[idx].ans;
            fbEl.className = 'fb wrong';
            for (var i = 0; i < optsEl.children.length; i++) {
                var child = optsEl.children[i];
                if (child.textContent && child.textContent.indexOf(quiz[idx].ans) !== -1) {
                    child.classList.add('correct');
                }
            }
            nextEl.style.display = 'block';
        }
    }, 1000);
}
nextEl.addEventListener('click', function () {
    idx++;
    nextEl.style.display = 'none';
    fbEl.textContent = '';
    fbEl.className = 'fb';
    loadQ();
});
function endQ() {
    clearInterval(timer);
    qEl.style.display = 'none';
    optsEl.style.display = 'none';
    fbEl.style.display = 'none';
    nextEl.style.display = 'none';
    resEl.style.display = 'block';
    scrEl.textContent = scr.toString();
    restartEl.style.display = 'block';
}
restartEl.addEventListener('click', function () {
    idx = 0;
    scr = 0;
    qEl.style.display = 'block';
    optsEl.style.display = 'block';
    fbEl.style.display = 'block';
    resEl.style.display = 'none';
    restartEl.style.display = 'none';
    loadQ();
});
