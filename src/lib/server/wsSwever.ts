import { Server } from 'socket.io'

const io = new Server(3001, {
    cors: {
        origin: '*',
    },
})

io.on('connection', async () => {
    io.emit('user-connect')
})