const net = require('net')
const hostname = "localhost"
const port = 3000

net
    .createServer((socket) => {
        console.log("Client connected.")
        socket.on("data", (name) => {
            socket.write(`Hello ${name}!`)
            })
    })
    .listen(port, hostname)

      // createServer() on server end and createConnection() on client end
      // to test have to use two shells or two browsers tabs.