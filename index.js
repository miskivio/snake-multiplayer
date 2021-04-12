const BG_COLOR = '#c0c0c0'
const SNAKE_COLOR = '#686668'
const FOOD_COLOR = '#33d69d'

const gameScreen = document.getElementById('gameScreen')

console.log('js is working')

let canvas, ctx;

const gameState = {
    player: {
        pos: {
            x: 3,
            y:10
        },
        vel: {
            x: 1,
            y: 0
        },
        snake: [
            {x: 1, y: 10},
            {x: 2, y: 10},
            {x: 3, y: 10},
        ]
    },
    food: {
        x:7,
        y:7
    },
    gridSize: 20
}

const init = () => {
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext("2d");

    canvas.width  = 600
    canvas.height = 600
   
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    document.addEventListener('keydown', keydown)
}


const paintGame = state => {
    ctx.fillStyle = BG_COLOR
    ctx.fillRect = (0, 0, canvas.width, canvas.height)

    const food = state.food
    const gridSize = state.gridSize
    const size = canvas.width / gridSize

    ctx.fillStyle = FOOD_COLOR
    ctx.fillRect(food.x * size, food.y * size, size, size)

    paintPlayer(state.player, size, SNAKE_COLOR)
}

const keydown = (e) =>{
    console.log(e.keyCode)
}

init()