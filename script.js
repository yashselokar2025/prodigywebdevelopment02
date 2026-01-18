let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCounter = 1;
let isRunning = false;
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const obstacle = document.getElementById('obstacle');
const fishingRod = document.getElementById('fishingRod');
const rodLine = document.getElementById('rodLine');
const rodHook = document.getElementById('rodHook');
const fish = document.getElementById('fish');
const floodOverlay = document.getElementById('floodOverlay');
const waves = document.querySelectorAll('.wave');
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        lapBtn.style.display = 'inline-block';
        fishingRod.classList.add('casting');
        setTimeout(() => {
            rodLine.classList.add('cast');
            rodHook.classList.add('cast');
        }, 300);
        obstacle.classList.remove('show');
    }
}
function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        pauseBtn.style.display = 'none';
        startBtn.style.display = 'inline-block';
        lapBtn.style.display = 'none';
        obstacle.classList.add('show');
        rodLine.classList.remove('cast');
        rodHook.classList.remove('cast');
        fishingRod.classList.remove('casting');
    }
}
function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 1;
    display.textContent = '00:00:00';
    document.getElementById('laps').innerHTML = '';
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    lapBtn.style.display = 'none';
    floodOverlay.classList.add('active');
    setTimeout(() => {
        floodOverlay.classList.remove('active');
    }, 2000);
    rodLine.classList.remove('cast');
    rodHook.classList.remove('cast');
    fishingRod.classList.remove('casting');
    obstacle.classList.remove('show');
}
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapsContainer = document.getElementById('laps');
        const fishTypes = ['🐟', '🐠', '🐡', '🦈', '🐙'];
        const randomFish = fishTypes[Math.floor(Math.random() * fishTypes.length)];
        fish.textContent = randomFish;
        fish.style.left = '70%';
        fish.style.top = '60%';
        fish.classList.add('caught');
        waves.forEach(wave => {
            wave.classList.add('disturbed');
        });
        setTimeout(() => {
            fish.classList.remove('caught');
            waves.forEach(wave => {
                wave.classList.remove('disturbed');
            });
        }, 1500);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-time';
        lapElement.innerHTML = `
            <span><strong>${randomFish} Catch ${lapCounter}</strong></span>
            <span>${lapTime}</span>
        `;
        lapsContainer.insertBefore(lapElement, lapsContainer.firstChild);
        lapCounter++;
    }
}
function updateDisplay() {
    const currentTime = Date.now() - startTime;
    display.textContent = formatTime(currentTime);
}
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
function pad(num) {
    return num.toString().padStart(2, '0');
}
document.addEventListener('click', function(e) {
    createRipple(e.clientX, e.clientY);
    const effectType = Math.random();
    if (effectType < 0.4) {
        setTimeout(() => createRipple(e.clientX, e.clientY), 100);
        setTimeout(() => createRipple(e.clientX, e.clientY), 200);
    } else if (effectType < 0.7) {
        createSplash(e.clientX, e.clientY);
    } else {
        createBubbles(e.clientX, e.clientY);
    }
});
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'water-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1500);
}
function createSplash(x, y) {
    const splashSymbols = ['💦', '💧', '🌊'];
    const numDrops = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numDrops; i++) {
        const splash = document.createElement('div');
        splash.className = 'water-splash';
        splash.textContent = splashSymbols[Math.floor(Math.random() * splashSymbols.length)];
        splash.style.left = x + (Math.random() - 0.5) * 40 + 'px';
        splash.style.top = y + (Math.random() - 0.5) * 40 + 'px';
        document.body.appendChild(splash);
        
        setTimeout(() => splash.remove(), 1000);
    }
}
function createBubbles(x, y) {
    const numBubbles = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = 10 + Math.random() * 20;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = x + (Math.random() - 0.5) * 60 + 'px';
        bubble.style.top = y + (Math.random() - 0.5) * 60 + 'px';
        bubble.style.animationDelay = (Math.random() * 0.3) + 's';
        document.body.appendChild(bubble); 
        setTimeout(() => bubble.remove(), 2000);
    }
}