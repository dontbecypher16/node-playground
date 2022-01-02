const net = require('net')
const hostname = "localhost"
const port = 3000

const socket = net.connect(port, hostname)
socket.write("World")

socket.on("data", (data) => {
    console.log(data.toString());
    })

    // net is for tcp
    // dgram is for udp (user datagram protocol)
    // const dgram = require('dgram')
    // udp is faster than tcp but some packets can be loss. Used for video calling, gaming, streaming
    

    // createServer() on server end and createConnection() on client end
     // to test have to use two shells or two browsers tabs