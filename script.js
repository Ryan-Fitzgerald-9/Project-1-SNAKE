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
const foodColor = '#ff073a'

const snakeUnitSize = 20
const foodUnitSize = 20

let speed = 12

let running = false


let xMovement = snakeUnitSize
let yMovement = 0


let snake = [
    {x: snakeUnitSize * 2, y: 0},
    {x: snakeUnitSize, y: 0},
    {x: 0, y: 0}
]




// Snake movement, create out-of-bounds


// Logic for dot (scoring and then random location)


// Adding blocks to end of snake after each point


// Game Over logic (moving into wall or itself)


// Creating difficulty settings (smaller blocks and faster movement?)


// Functions for Scoring, Game Menu, Start Game, and Game Over

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

const moveSnake = () => {
    const snakeHead = {x: snake[0].x + xMovement,
                       y: snake[0].y + yMovement }

    snake.unshift(snakeHead)
    //***NEED to update false with food eaten logic***
    if(false){

    } else {
        snake.pop()
    }

}




const createFood = () => {
    const randFoodLoc = (min, max) => {
        let randNum = Math.round((Math.random() * (max - min) + min) / foodUnitSize) * foodUnitSize
        return randNum
    }
    foodX = randFoodLoc(0, gameWidth - foodUnitSize)
    foodY = randFoodLoc(0, gameWidth - foodUnitSize)
}
const drawFood = () => {
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX, foodY, foodUnitSize, foodUnitSize)
}


// Using arrow keys to change direction of the snake
const changeDirection = (event) => {
    const pressedKey = event.keyCode
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
            break;
        //DOWN
        case(pressedKey == downArrow && !movingUp):
            xMovement = 0
            yMovement = snakeUnitSize
            break;
        //LEFT
        case(pressedKey == leftArrow && !movingRight):
            xMovement = -snakeUnitSize
            yMovement = 0
            break;
        //RIGHT
        case(pressedKey == rightArrow && !movingLeft):
            xMovement = snakeUnitSize
            yMovement = 0
            break;        
    }
        
}

const startGame = () => {
    running = true
    createFood()
    drawFood()
    drawBoard()
}

//draws the game in each frame, determines refresh rate
const drawBoard = () => {
    if(running) {
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            drawBoard()
        }, 1000 / speed)
    }
}

startGame()


const checkGameOver = () => {}
const displayGameOver = () => {}
const resetGame = () => {}


// Event listener for arrow keys
window.addEventListener('keydown', changeDirection)


