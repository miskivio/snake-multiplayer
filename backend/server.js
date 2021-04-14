const io = require('socket.io')()
const {createGameState, gameLoop, getUpdatedQuick, initGame} = require('./game')
const {FRAME_RATE} = require('./constants')

const state = {}
const clientRooms = {}

const startGameInterval = (roomName) => {
    const intervalId = setInterval(()=>{
        console.log('interval')
        const winner = gameLoop(state[roomName])
        if(!winner) {
            emitGameState(roomName, state[roomName])
        } else {
            emitGameOver(roomName, winner)
            state[roomName] = null
            clearInterval(intervalId)
        }
    }, 1000 / FRAME_RATE)
}

const emitGameState = (roomName, state) => {
    io.sockets.in(roomName)
    .emit('gameState', JSON.stringify(state))
}

const emitGameOver = (roomName, state) => {
    io.sockets.in(roomName)
    .emit('gameOver', JSON.stringify({winner}))
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

    const handleJoinGame = (gameCode) => {
       const room = io.sockets.adapter.rooms(gameCode) 

       let allUsers

       if(room) {
           allUsers = room.sockets
       }

       let numOfClients = 0

       if(allUsers) {
           numOfclients = Object.keys(allUsers).length
       }

       if(numOfClients === 0) {
           client.emit('gameDoesntExists')
           return
       } else if (numOfClients > 1) {
           client.emit('tooManyPlayers')
           return
       }

       clientRooms[client.id] = gameCode

       client.join(gameCode)
       client.number = 2
       client.emit('init', 2)

       startGameInterval(gameCode)
    }

     // getting key from the frontend
     client.on('keydown', handleKeydown)

     client.on('newGame', handleNewGame)

     client.on('joinGame', handleJoinGame)

   
})

io.listen(5000)