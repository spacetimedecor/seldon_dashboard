const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = module.exports.io = require('socket.io')(server)

const PORT = process.env.PORT || 3231

app.use(express.static(__dirname + '/../../build'))

let tick = 0;
io.on('connection', client => {
	setInterval(() => {
		console.debug("Tick: ", tick);
		client.emit('testMessage', {
			name: 'name value',
			value: 'value value',
			tick: tick++
		});
	}, 1000);
})

server.listen(PORT, ()=>{
	console.log("Connected to port:" + PORT);
})