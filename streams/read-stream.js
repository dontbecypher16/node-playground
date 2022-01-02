const fs = require('fs')
const rs = fs.createReadStream("./stream-file.txt")


rs.on("data", (data) => {
    //console.log("Read chunk:", data) // Buffer
    console.log("Read chunk:", data.toString()) // String
})

rs.on("end", () => {
    console.log("No more data.")
    })

// async format
    // async function run() {
    //   for await (const chunk of rs) {
    //     console.log("Read chunk:", chunk);
    //   }
    //   console.log("No more data.");
    // }

    // run();

    ////////////////////////////////////
    ////////////////////////////////////

    // Reading stream while paused, using read method
    // rs.on("readable", () => {
    //     // Read data
    //     })

    //     let data = rs.read();
    //     while (data !== null) {
    //       console.log("Read chunk:", data);
    //       data = rs.read();
    //     }

    //     rs.on("end", () => {
    //       console.log("No more data.");
    //     });