const {GRID_SIZE} = require('./constants')

// create orgin state 
const createGameState = () => {
    return {
        player: {
            pos: {
                x: 3,
                y:10
            },
            quick: {
                x: 1,
                y: 0
            },
            snake: [
                {x: 0, y: 0},
                {x: 1, y: 0},
                {x: 2, y: 0},
            ]
        },
        food: {
            x:7,
            y:7
        },
        gridSize: GRID_SIZE
    }
} 

const gameLoop = (state) => {
    if(!state) {
        return
    }

    //get state
    const playerOne = state.player

    // moving positions
    playerOne.pos.x += playerOne.quick.x
    playerOne.pos.y += playerOne.quick.y

    // define borders for snake
    if (
        playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE ||
        playerOne.pos.y < 0 || playerOne.pos.x > GRID_SIZE
        ) {
            return 2;
    }
    // checking if food position equal to snake position
    if(state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
        // push to current position player
        playerOne.snake.push({...playerOne.pos})

        playerOne.pos.x += playerOne.quick.x
        playerOne.pos.y += playerOne.quick.y

        randomFood(state)
    }

    //checking if quick equal to position of snake 
    if(playerOne.quick.x || playerOne.quick.y) {
        for(let cell of playerOne.snake) {
            if(cell.x === playerOne.pos.x && cell.y === playerOne.pos.y ) {
                return 2
            }
        }
        // in this case we are pushing new inrement body position of the snake
        playerOne.snake.push({...playerOne.pos})

        // delete first element of snake array cause end of body is equal to first item of array
        playerOne.snake.shift()
    }

    return false
}


const randomFood = (state) => {
    food = {
        // gettig new random posit of food
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    }
    // checked if one of parts of body equal to x/y of food 
    for(let cell of state.player.snake) {
        if(cell.x === food.x && cell.y === food.y) {
            return randomFood(state)
        }
    }

    // pushing new x/y position in state of food
    state.food = food
}

module.exports = {
    createGameState,
    gameLoop
}