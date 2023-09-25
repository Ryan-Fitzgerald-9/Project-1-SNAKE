// Define variables (snake, dot, scoreboard...)
const gameBoard = document.querySelector('#game-area')
//canvas & ctx found on W3Schools
const ctx = gameBoard.getContext("2d")
const scoreCurrent = document.querySelector('#score-current')
const scoreHigh = document.querySelector('#score-high')
const startBtn = document.querySelector('#start-button')
const resetBtn = document.querySelector('#restart-button')
const modeBtn = document.querySelector('#difficulty')



const gameWidth = gameBoard.width
const gameHeight = gameBoard.height

const gameBackground = "black"
const snakeColor = "#0cff0c"

const snakeUnitSize = 10
let speed = 10

//let running = false
let xVelocity = snakeUnitSize
let yVelocity = 0


let snake = [
    {x: snakeUnitSize * 2, y: 0},
    {x: snakeUnitSize, y: 0},
    {x: 0, y: 0}
]
//const food = 

//let gameSpeed = 1



// Snake movement, create out-of-bounds


// Logic for dot (scoring and then random location)


// Adding blocks to end of snake after each point


// Game Over logic (moving into wall or itself)


// Creating difficulty settings (smaller blocks and faster movement?)


// Functions for Scoring, Game Menu, Start Game, and Game Over
const startGame = () => {}
const clearBoard = () => {
    ctx.fillStyle = gameBackground
    ctx.fillRect(0, 0, gameWidth, gameHeight)
}
//draws each snake unit, fills neon green
const drawSnake = () => {
    ctx.fillStyle = snakeColor
    snake.forEach(snakeBlock => {
        ctx.fillRect(snakeBlock.x, snakeBlock.y, snakeUnitSize, snakeUnitSize)
    })
}

//draws the game in each frame, determines refresh rate
const drawBoard = () => {
    clearBoard()
    drawSnake()
    setTimeout(drawBoard, 1000/ speed)
}

drawBoard()


const createFood = () => {}
const drawFood = () => {}
const moveSnake = () => {}


const changeDirection = () => {}
const checkGameOver = () => {}
const displayGameOver = () => {}
const resetGame = () => {}


// Event listener for arrow keys



