const fs = require('fs')
const path = require('path')

const filepath = path.join(process.cwd(), "hello.txt")
// synchronous style
const contents = fs.readFileSync(filepath, "utf-8")
console.log("File Contents:", contents)


const upperContents = contents.toUpperCase()

fs.writeFileSync(filepath, upperContents)
console.log("File updated.")

// asynchronous style(callbacks)
const contents = fs.readFile(filepath, "utf-8", (err, contents) => {
    if (err){
        return console.log(err)
    }
    console.log("File Contents:", contents)
    
    
    const upperContents = contents.toUpperCase()
    
    fs.writeFile(filepath, upperContents, (err) => {
        if(err) throw err
        console.log("File updated.")
    })
})

console.log(path)