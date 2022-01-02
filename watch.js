const fs = require('fs')
const file = "./file.txt"

// can watch real time changes on file in console
fs.watchFile(file, (current, previous) => {
    return console.log(`${file} updated ${ (current.mtime) }`)
})

/**
 * watchFile() accepts three parameters: filename, list of options, and a listener function
 *  options: BigInt; Persistent; Interval // look into definitions
 *  listener function: current; previous
 */