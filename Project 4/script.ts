interface QData {
    q: string;
    opts: string[];
    ans: string;
}

//chocolate
const quiz: QData[] = [
    { q: "Who teaches this CSCI 3336 class?", opts: ["Emmet Tomai", "Andres Figueroa", "John Cena", "Gustavo Dietrich"], ans: "Andres Figueroa" },
    { q: "Which language does TypeScript need to be transpiled to before running code?", opts: ["Java", "Python", "JavaScript", "C++"], ans: "JavaScript" },
    { q: "What typing is TypeScript known for having?", opts: ["Static", "Dynamic", "Untyped", "Wrong"], ans: "Static" },
    { q: "What was the commented word hidden in the TypeScript file?", opts: ["Cookie", "Candy", "Chocolate", "Cinammon"], ans: "Chocolate" }
];

const timeEl = document.getElementById('t')!; 
const qEl = document.querySelector('.q')! as HTMLElement;
const optsEl = document.querySelector('.opts')! as HTMLElement;
const resEl = document.querySelector('.rs')! as HTMLElement;
const scrEl = document.getElementById('sc')!; 
const restartEl = document.querySelector('.rst-btn')! as HTMLButtonElement;
const fbEl = document.querySelector('.fb')! as HTMLElement;
const nextEl = document.querySelector('.next-btn')! as HTMLButtonElement;

const startScreen = document.querySelector('.start-screen')! as HTMLElement;
const startBtn = document.querySelector('.start-btn')! as HTMLButtonElement;
const quizContainer = document.querySelector('.qz')! as HTMLElement;

let idx = 0;
let scr = 0;
let time = 30;
let timer: number;


startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    quizContainer.style.display = 'flex';
    loadQ();
});

function loadQ(): void {
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

    const qData = quiz[idx]!;

    qEl.textContent = qData.q;
    optsEl.innerHTML = '';

    for (let i = 0; i < qData.opts.length; i++) {
        const opt = qData.opts[i];
        const btn = document.createElement('button');
        btn.classList.add('opt');
        btn.textContent = (i + 1) + '. ' + opt;
        btn.onclick = () => checkA(opt, btn);
        optsEl.appendChild(btn);
    }

    startT();
}

function checkA(opt: string, btn: HTMLButtonElement): void {
    clearInterval(timer);

    const correct = opt === quiz[idx]!.ans;

    if (correct) {
        scr++;
        fbEl.textContent = 'Correct!';
        fbEl.className = 'fb correct';
        btn.classList.add('correct');
    } else {
        fbEl.textContent = 'Wrong! Correct: ' + quiz[idx]!.ans;
        fbEl.className = 'fb wrong';
        btn.classList.add('wrong');

        for (let i = 0; i < optsEl.children.length; i++) {
            const child = optsEl.children[i] as HTMLButtonElement;
            if (child.textContent && child.textContent.indexOf(quiz[idx]!.ans) !== -1) {
                child.classList.add('correct');
            }
        }
    }

    nextEl.style.display = 'block';
}

function startT(): void {
    timer = window.setInterval(() => {
        time--;
        timeEl.textContent = time.toString();
        if (time <= 0) {
            clearInterval(timer);
            fbEl.textContent = 'Time\'s up! Correct: ' + quiz[idx]!.ans;
            fbEl.className = 'fb wrong';

            for (let i = 0; i < optsEl.children.length; i++) {
                const child = optsEl.children[i] as HTMLButtonElement;
                if (child.textContent && child.textContent.indexOf(quiz[idx]!.ans) !== -1) {
                    child.classList.add('correct');
                }
            }

            nextEl.style.display = 'block';
        }
    }, 1000);
}

nextEl.addEventListener('click', () => {
    idx++;
    nextEl.style.display = 'none';
    fbEl.textContent = '';
    fbEl.className = 'fb';
    loadQ();
});

function endQ(): void {
    clearInterval(timer);
    qEl.style.display = 'none';
    optsEl.style.display = 'none';
    fbEl.style.display = 'none';
    nextEl.style.display = 'none';
    resEl.style.display = 'block';
    scrEl.textContent = scr.toString();
    restartEl.style.display = 'block';
}

restartEl.addEventListener('click', () => {
    idx = 0;
    scr = 0;

    qEl.style.display = 'block';
    optsEl.style.display = 'block';
    fbEl.style.display = 'block';
    resEl.style.display = 'none';
    restartEl.style.display = 'none';

    loadQ();
});
