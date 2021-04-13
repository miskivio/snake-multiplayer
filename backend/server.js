const io = require('socket.io')()
const {createGameState, gameLoop, getUpdatedQuick, initGame} = require('./game')
const {FRAME_RATE} = require('./constants')

const state = {}
const clientRooms = {}

const startGameInterval = (client, state) => {
    const intervalId = setInterval(()=>{
        console.log('interval')
        const winner = gameLoop(state)
        if(!winner) {
            client.emit('gameState', JSON.stringify(state))
        } else {
            client.emit('gameOver')
            clearInterval(intervalId)
        }
    }, 1000 / FRAME_RATE)
}

io.on('connection', client => {


    const handleNewGame = () => {
        let roomName = makeId(5)
        clientRooms[client.id] = roomName
        client.emit('gameCode', roomName)
        //get state
        state[roomName] = initGame()


        client.join(roomName)
        client.number = 1
        client.emit('init', 1)
    }

    const handleKeydown = (keyCode) => {
        try {
            console.log(keyCode)
            keyCode = parseInt(keyCode)
        } catch (error) {
            console.error(error)
            return
        }

        const quick = getUpdatedQuick(keyCode)
        console.log(quick)

        // changing quick state
        if(quick) {
            state.player.quick = quick
        }
    }
     // getting key from the frontend
     client.on('keydown', handleKeydown)

     client.on('newGame', handleNewGame)

    startGameInterval(client, state)
})

io.listen(5000)