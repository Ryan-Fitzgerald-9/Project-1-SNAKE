// Define variables (snake, dot, scoreboard...)
const gameBoard = document.querySelector('#game-area')
const ctx = gameBoard.getContext("2d")
const scoreCurrent = document.querySelector('#current-score')
const scoreHigh = document.querySelector('#high-score')
const startBtn = document.querySelector('#start-button')
const resetBtn = document.querySelector('#restart-button')
const gameArena = document.getElementById("container")
const highScoreValue = document.querySelector("#high-score")

const gameOverSound = document.getElementById("gameOverSound")
const gameMusic = document.getElementById("backgroundMusic")

const gameWidth = gameBoard.width
const gameHeight = gameBoard.height

const gameBackground = "black"
const snakeColor = "#04d9ff"
const foodColor = '#fe019a'

const snakeUnitSize = 20
const foodUnitSize = 20

const speedLevels = [
    { scoreThreshold: 0, speed: 12 },
    { scoreThreshold: 5, speed: 16 },
    { scoreThreshold: 15, speed: 20 },
    { scoreThreshold: 25, speed: 25 },
    { scoreThreshold: 35, speed: 30 },
]

let speed = 12

let running = false

let xMovement = snakeUnitSize
let yMovement = 0

let score = 0
let highScore = 0

let snake = [
    {x: snakeUnitSize * 3, y: 0},
    {x: snakeUnitSize * 2, y: 0},
    {x: snakeUnitSize, y: 0},
    {x: 0, y: 0}
]

// FUNCTIONS
const playGameMusic = () => {
    gameMusic.loop = true
    gameMusic.play()
}

const pauseGameMusic = () => {
    gameMusic.pause()
}

const playGameOverSound = () => {
    gameOverSound.play()
}

gameMusic.volume = 0.4
gameOverSound.volume = 0.9

const updateHighScore = () => {
    if (score > highScore)
    highScore = score
    highScoreValue.textContent = `Best: ${highScore}`
}
const clearBoard = () => {
    ctx.fillStyle = gameBackground
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}
// Draws each snake unit, fills neon green
const drawSnake = () => {
    ctx.fillStyle = snakeColor
    snake.forEach(snakeBlock => {
        ctx.fillRect(snakeBlock.x, snakeBlock.y, snakeUnitSize, snakeUnitSize)
    })
}
// Moves snake, adds a new block when snake head and food meet
const moveSnake = () => {
    const snakeHead = {x: snake[0].x + xMovement,
                       y: snake[0].y + yMovement }

    snake.unshift(snakeHead)
    
    if(snake[0].x == foodX && snake[0].y == foodY) {
        score += 1
        scoreCurrent.innerHTML = `Score: ${score}`
        createFood()
    } 
    else {
        snake.pop()
    }
}
// Places food at random location within the canvas
const createFood = () => {
    const randFoodLoc = (min, max) => {
        let randNum = Math.round((Math.random() * (max - min) + min) / foodUnitSize) * foodUnitSize
        return randNum
    }
    foodX = randFoodLoc(0, gameWidth - foodUnitSize)
    foodY = randFoodLoc(0, gameHeight - foodUnitSize)
}

// Generates a block of neon red food
const drawFood = () => {
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX, foodY, foodUnitSize, foodUnitSize)
}
// Using arrow keys to change direction of the snake
const changeDirection = (event) => {
    const pressedKey = event.keyCode
    // Used console.log to identify arrow #s
    let upArrow = 38
    let downArrow = 40
    let leftArrow = 37
    let rightArrow = 39

    const movingUp = (yMovement == -snakeUnitSize)
    const movingDown = (yMovement == snakeUnitSize)
    const movingLeft = (xMovement == -snakeUnitSize)
    const movingRight = (xMovement == snakeUnitSize)

    // Movement according to game rules
    switch(true) {
        //UP
        case(pressedKey == upArrow && !movingDown):
            xMovement = 0
            yMovement = -snakeUnitSize
            break
        //DOWN
        case(pressedKey == downArrow && !movingUp):
            xMovement = 0
            yMovement = snakeUnitSize
            break
        //LEFT
        case(pressedKey == leftArrow && !movingRight):
            xMovement = -snakeUnitSize
            yMovement = 0
            break
        //RIGHT
        case(pressedKey == rightArrow && !movingLeft):
            xMovement = snakeUnitSize
            yMovement = 0
            break     
    }  
}
// Game over logic => snake running into wall or itself
const checkGameOver = () => {
        switch (true) {
          case snake[0].x < 0:
          case snake[0].x >= gameWidth:
          case snake[0].y < 0:
          case snake[0].y >= gameHeight:
            running = false
            break
        }
    // Snake head running into its body      
    for(let i = 1; i < snake.length; i+= 1) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false
        }
    }
}

// Displays GAME OVER! in the center of the canvas
const displayGameOver = () => {
    ctx.font = "75px Verdana"
    let gradientGameOver = ctx.createLinearGradient(0, 0, gameBoard.width, 0)
    gradientGameOver.addColorStop("1.0", "#04d9ff")
    gradientGameOver.addColorStop("0", "#fe019a")
    ctx.fillStyle = gradientGameOver
    ctx.textAlign = "center"
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2)
    running = false
    pauseGameMusic()
    playGameOverSound()
}
// Updates speed based on speedLevels breakdown
const updateSpeed = () => {
    for (const level of speedLevels) {
        if (score >= level.scoreThreshold) {
            speed = level.speed
        } else {
            break
        }
    }
}

// Draws the game in each frame, determines refresh rate
let lastUpdateTime = 0

const drawBoard = (timestamp) => {
    const gameTime = timestamp - lastUpdateTime

    if(gameTime >= 1000 / speed) {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            updateSpeed()
            lastUpdateTime = timestamp
    }

    if (running) {
        requestAnimationFrame(drawBoard)
    }
    else {
        displayGameOver()
        updateHighScore()
    }
}

const startGame = () => {
    running = true
    speed = 12
    scoreCurrent.innerHTML = `Score: ${score}`
    playGameMusic()
    createFood()
    drawFood()
    lastUpdateTime = performance.now()
    drawBoard(performance.now())
}

const resetGame = () => {
    xMovement = snakeUnitSize
    yMovement = 0
    score = 0
    snake = [
    {x: snakeUnitSize * 3, y: 0},
    {x: snakeUnitSize * 2, y: 0},
    {x: snakeUnitSize, y: 0},
    {x: 0, y: 0}
    ]
    clearBoard()
}

clearBoard()

// Event listener for arrow keys
window.addEventListener('keydown', changeDirection)
resetBtn.addEventListener('click', resetGame)
startBtn.addEventListener('click', startGame)

document.addEventListener("DOMContentLoaded", function () {
    const startupScreen = document.getElementById("startup-screen")
    
    const playBtn = document.getElementById("lets-play")
    

    playBtn.addEventListener("click", clearBoard)

    function clearBoard() {
        startupScreen.style.display = "none"
        gameArena.style.display = "block"
    }
})



