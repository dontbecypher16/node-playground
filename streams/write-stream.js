const fs = require('fs')
const file = fs.createWriteStream("./stream-file.txt")

for(let i = 0; i <= 1000000; i++){
    file.write(
        "Node is a JavaScript runtime built on Google Chrome's v8 engine.\n"
    )
}