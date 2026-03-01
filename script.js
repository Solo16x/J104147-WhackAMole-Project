const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-btn');
let score = 0;
let lastHole;
let timeUp = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) return randomHole(holes);
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(600, 1200);
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    
    mole.classList.add('up');
    
    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    timeUp = false;

    startBtn.disabled = true; 
    startBtn.style.opacity = "0.5";
    startBtn.textContent = "Game in Progress...";

    peep();
}

function whack(e) {
    if (!e.isTrusted) return; 
    
    const mole = this.querySelector('.mole');

    if (!mole.classList.contains('up')) return; 

    score++;
    mole.classList.remove('up'); 
    scoreDisplay.textContent = score;

    if (score === 10) {
        timeUp = true;
        
        startBtn.disabled = false;
        startBtn.style.opacity = "1";
        startBtn.textContent = "Start Game";
        
        alert("YOU DID IT! You counted to 10!");
    }
}

holes.forEach(hole => hole.addEventListener('click', whack));
startBtn.addEventListener('click', startGame);
