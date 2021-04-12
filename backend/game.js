const {GRID_SIZE} = require('./constants')


const createGameState = () => {
    return {
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


module.exports = {
    createGameState
}