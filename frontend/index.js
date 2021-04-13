const BG_COLOR = '#c0c0c0'
const SNAKE_COLOR = '#876465'
const FOOD_COLOR = '#33d69d'

// init socket
const socket = io('http://localhost:5000')

const gameScreen = document.getElementById('gameScreen')
const initialScreen = document.getElementById('initialScreen')
const newGameButton = document.getElementById('newGameButton')
const joinGameButton = document.getElementById('joinGameButton')
const gameCodeInput = document.getElementById('gameCodeInput')

newGameButton.addEventListener('click', newGame)
joinGameButton.addEventListener('click', joinGame)

const newGame = () => {
    socket.emit('newGame')
        //calling initialization
        init()
}

const joinGame = () => {
    const code = gameCodeInput.value
    socket.emit('joinGame', code)
    init()
}

//init vars for access in our functions
let canvas
let ctx
let playerNumber

// inial state
const gameState = {
    player: {
        pos: {
            x: 3,
            y: 0
        },
        quick: {
            x: 1,
            y: 0
        },
        snake: [
            {x: 3, y: 0},
            {x: 4, y: 0},
            {x: 5, y: 0},
        ]
    },
    food: {
        x:7,
        y:7
    },
    gridSize: 20
}



const init = () => {
    // hide start amd show game screen when the game starts
    initialScreen.style.display = 'none'
    gameScreen.style.display = 'block'

    canvas = document.getElementById('canvas')
    ctx = canvas.getContext("2d");

    // inits size of canvas 
    canvas.width  = 600
    canvas.height = 600
   
    // fill bg color of canvas
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height)

   
    document.addEventListener('keydown', keydown)   
}

// keydown actions
const keydown = (e) =>{
    console.log(e.keyCode)
    socket.emit('keydown', e.keyCode)
}


const paintGame = (state) => {

    // paint our game border
    ctx.fillStyle = BG_COLOR
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // get our state variables
    const food = state.food
    const gridSize = state.gridSize
    const size = canvas.width / gridSize

    // color and filling cell of food
    ctx.fillStyle = FOOD_COLOR
    ctx.fillRect(food.x * size, food.y * size, size, size)  

    //paintPlayer function which contains state, size and color props
    const paintPlayer = (state, size, color) => {

    // get our state of player 
    const snake = state.snake

    // paint our each cell of snake
    for(let cell of snake) {

    // get our color from props
    ctx.fillStyle = color

    // filling context
    ctx.fillRect(cell.x * size, cell.y * size, size, size)

        }
    }

    /* calling our paint game and put in porps like state of our player, 
     size and color */
    paintPlayer(state.player, size, SNAKE_COLOR)
}



    //calling our paint game and put in our state object
    paintGame(gameState, ctx, canvas)



// handles of sockets
const handleInit = (number) => {
    playerNumber = number
}

const handleGameState = (gameState) => {
    gameState = JSON.parse(gameState)
    // do animation and repainting in the next frame
    requestAnimationFrame(()=>{
        paintGame(gameState)
    })
}

const handleGameOver = () => {
    alert('Game Over')
}

// sockets on

socket.on('init', handleInit)

// listeting for changin our state from server
socket.on('gameState', handleGameState)

socket.on('gameOver', handleGameOver)

