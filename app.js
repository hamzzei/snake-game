const scoreEl = document.getElementById("scoreEl");
const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");
let gameAreaBlocks = [];
let snake = [2, 1, 0];
const width = 10;
let direction = 1;
let speed = 600;
let gameScore = 0;
let timerId;
const rainbowColors = [
  "apple-lightsalmon",
  "apple-lightpink",
  "apple-lightgoldenrodyellow",
  "apple-lightseagreen",
  "apple-lightskyblue",
  "apple-aqua",
  "apple-salmon",
  "apple-orangered"]

let appleColor;

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

startBtn.addEventListener("click", function() {
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
  scoreEl.textContent = gameScore;
  timerId = setInterval(move, speed);

  snake = [2,1,0]
  snake.forEach(index => gameAreaBlocks[index].classList.add("snake"))
  addApple()
});
