const io = require('socket.io')()
const {createGameState, gameLoop} = require('./game')
const {FRAME_RATE} = require('./constants')

const startGameInterval = (client, state) => {
    const intervalId = setInterval(()=>{
        const winner = gameLoop(state)
        console.log('interval')
        if(!winner) {
            client.emit('gameState', JSON.stringify(state))
        } else {
            client.emit('gameOver')
            clearInterval(intervalId)
        }
    }, 1000 / FRAME_RATE)
}


io.on('connection', client => {
    const state = createGameState()

    startGameInterval(client, state)
})


io.listen(5000)