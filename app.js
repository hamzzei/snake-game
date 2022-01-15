const scoreEl = document.getElementById("scoreEl");
const hiScoreEl = document.getElementById("hiScoreEl");
const finalScoreEl = document.getElementById("finalScoreEl");
const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const modelContainer = document.getElementById("model-container");
const gameOverMessage = document.getElementById("gameOverMessage");
const body = document.querySelector("body");
let gameAreaBlocks = [];
let snake = [2, 1, 0];
const width = 10;
let direction = 1;
let speed = 600;
let gameScore = 0;
let hiScore = 0;
const hiScoreFromLocalStorage = JSON.parse(localStorage.getItem("hiScore"))
let timerId;
const rainbowColors = [
  "apple-lightsalmon",
  "apple-lightpink",
  "apple-lightgoldenrodyellow",
  "apple-lightseagreen",
  "apple-lightskyblue",
  "apple-aqua",
  "apple-salmon",
  "apple-orangered"
]

let appleColor;
let isAlive = false;

if (hiScoreFromLocalStorage) {
  hiScore = hiScoreFromLocalStorage;
  hiScoreEl.textContent = hiScore;
}

function randomColor() {

    const color = Math.floor(Math.random() * rainbowColors.length)
    appleColor = rainbowColors[color]

}


  for (let i = 0; i < 100; i++) {
    let block = document.createElement("div");
    block.classList.add("block");
    gameArea.appendChild(block);
    gameAreaBlocks.push(block);
  }


snake.forEach((index) => gameAreaBlocks[index].classList.add("snake"));

function move() {
  if (gameAreaBlocks[snake[0]].classList.contains(appleColor)) {
    gameAreaBlocks[snake[0]].classList.remove(appleColor);
    gameScore++;
    scoreEl.textContent = gameScore;

    clearInterval(timerId);
    speed *= 0.9;
    timerId = setInterval(move, speed);

    snake.unshift(snake[0] + direction);
    snake.forEach((index) => gameAreaBlocks[index].classList.add("snake"));

    addApple();
  }

  if (
    (snake[0] % 10 === 9 && direction === 1) ||
    (snake[0] % 10 === 0 && direction === -1) ||
    (snake[0] - width < 0 && direction === -width) ||
    (snake[0] + width > width * width && direction === width) ||
    gameAreaBlocks[snake[0] + direction].classList.contains("snake")
  ) {
    isAlive = false;
    modelContainer.classList.add("active")
    body.classList.remove("no-scroll")
    finalScoreEl.textContent = gameScore;
    if (gameScore > hiScore) {
      hiScore = gameScore;
      gameOverMessage.textContent = "New Hi-Score! 🥳"
      localStorage.setItem("hiScore", JSON.stringify(gameScore))
      hiScoreEl.textContent = gameScore
    }
    return clearInterval(timerId);
  }

  document.addEventListener("keyup", function (event) {
    if (event.key === "Right" || event.key === "ArrowRight") {
      direction = 1;
    } else if (event.key === "Down" || event.key === "ArrowDown") {
      direction = width;
    } else if (event.key === "Left" || event.key === "ArrowLeft") {
      direction = -1;
    } else if (event.key === "Up" || event.key === "ArrowUp") {
      direction = -width;
    }
  });

  const tail = snake.pop();
  snake.unshift(snake[0] + direction);

  gameAreaBlocks[snake[0]].classList.add("snake");
  gameAreaBlocks[tail].classList.remove("snake");
}

function addApple() {
  
  const apple = Math.floor(Math.random() * (width * width));

  if (gameAreaBlocks[apple].classList.contains("snake")) {
    addApple();
  } else {
    randomColor()
    gameAreaBlocks[apple].classList.add(appleColor);
  }
}

startBtn.addEventListener("click", startRestart);
restartBtn.addEventListener("click", startRestart);

function startRestart() {
  clearInterval(timerId)

  for(let i = 0; i < width*width; i++) {
    if (gameAreaBlocks[i].classList.contains(appleColor)) {
          gameAreaBlocks[i].classList.remove(appleColor)  
      }
    if (gameAreaBlocks[i].classList.contains("snake")) {
          gameAreaBlocks[i].classList.remove("snake")
      }
  }
  
    direction = 1;
    speed = 1000;
    gameScore = 0;
    finalScoreEl.textContent = 0;
    scoreEl.textContent = gameScore;
    timerId = setInterval(move, speed);
    modelContainer.classList.remove("active")
    gameOverMessage.textContent = "Game Over! 💀"
    body.classList.add("no-scroll")
  
    snake = [2,1,0]
    snake.forEach(index => gameAreaBlocks[index].classList.add("snake"))
    addApple()
    isAlive = true;
}
