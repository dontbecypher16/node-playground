const fs = require('fs')

const file = process.argv[2]

function printMetadata(file){
    try{

        const fileStats = fs.statSync(file)
        console.log(fileStats)
    }catch(e){
        console.error("Error reading file path:", file)
    }
}

printMetadata(file)

// console.log(process.argv)

// const fs = require("fs");
// const file = "./file.txt";
// fs.chmodSync(file, 0o664);
/**
 * Always account for errors when dealing with files
 * statSync() or stat() for file metadata
 * fs.access or fs.accessSync() for file access
 * chmod() chmodSync() for modifying permissions
 * 
 * 
 * lstat() lstatSync() for symbolic link between files. // will test in REPL
 * $ ln -s file.txt link-to-file // command for symbolic link
 * 
 */


