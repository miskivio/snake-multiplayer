const {GRID_SIZE} = require('./constants')

// create orgin state 
const createGameState = () => {
    return {
        players: [{
            pos: {
                x: 3,
                y: 10
            },
            quick: {
                x: 0,
                y: 0
            },
            snake: [
                {x: 3, y: 10},
                {x: 4, y: 10},
                {x: 5, y: 10},
            ]
        }, {
            os: {
                x: 18,
                y: 10
            },
            quick: {
                x: 0,
                y: 0
            },
            snake: [
                {x: 20, y: 0},
                {x: 19, y: 0},
                {x: 18, y: 0},
            ]
        }],
        food: {},
        gridSize: GRID_SIZE
    }
} 



const gameLoop = (state) => {
    if(!state) {
        return
    }

    //get state
    const playerOne = state.player[0]
    const playerTwo = state.player[1]

    // moving positions
    playerOne.pos.x += playerOne.quick.x
    playerOne.pos.y += playerOne.quick.y

    // define borders for snake player 1
    if (
        playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE ||
        playerOne.pos.y < 0 || playerOne.pos.x > GRID_SIZE
        ) {
            return 2;
    }

    // define borders for snake player 2
    if (
        playerTwo.pos.x < 0 || playerTwo.pos.x > GRID_SIZE ||
        playerTwo.pos.y < 0 || playerTwo.pos.x > GRID_SIZE
        ) {
            return 1;
    }


    // checking if food position equal to snake position for player 1
    if(state.food.x === playerOne.pos.x && state.food.y === playerOne.pos.y) {
        // push to current position player
        playerOne.snake.push({...playerOne.pos})

        playerOne.pos.x += playerOne.quick.x
        playerOne.pos.y += playerOne.quick.y

        randomFood(state)
    }

     // checking if food position equal to snake position for player 2
    if(state.food.x === playerTwo.pos.x && state.food.y === playerTwo.pos.y) {
        // push to current position player
        playerTwo.snake.push({...playerTwo.pos})

        playerTwo.pos.x += playerTwo.quick.x
        playerTwo.pos.y += playerTwo.quick.y

        randomFood(state)
    }

    //checking if quick equal to position of snake for player 1
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


//checking if quick equal to position of snake for player 2
if(playerTwo.quick.x ||playerTwo.quick.y) {
    for(let cell of playerTwo.snake) {
        if(cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y ) {
            //return the winner
            return 1
        }
    }
    // in this case we are pushing new inrement body position of the snake
    playerTwo.snake.push({...playerTwo.pos})

    // delete first element of snake array cause end of body is equal to first item of array
    playerTwo.snake.shift()
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
    for(let cell of state.players[0].snake) {
        if(cell.x === food.x && cell.y === food.y) {
            return randomFood(state)
        }
    }

    for(let cell of state.players[1].snake) {
        if(cell.x === food.x && cell.y === food.y) {
            return randomFood(state)
        }
    }

    // pushing new x/y position in state of food
    state.food = food
}



// directions 
const getUpdatedQuick = (keyCode) => {
    switch(keyCode) {
        case 37: {
            return {x: -1, y:0}
        }
        case 38: {
            return {x: 0, y: -1}
        }
        case 39: {
            return {x: 1, y: 0}
        }
        case 40: {
            return {x: 0, y: 1}
        }
    }
}

const initGame = () => {
    const state = createGameState()

    randomFood(state)
    return state
}

module.exports = {
    initGame,
    createGameState,
    gameLoop,
    getUpdatedQuick
}