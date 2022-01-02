/**
 * Four main types of streams:
 *  readable streams // fs.createReadStream()
 *  writable streams // fs.createWriteStream()
 *  duplex streams - used for writing and reading // net.Socket
 *  transform streams - changes data input and outputs changed data // zlib.createDeflate()
 * 
 * Can chain all of these types together to create stream pipelines
 * 
 *  All streams are instances of th EventEmitter
 * 
     The following events are emitted on readable streams:

    • close : Emitted when the stream and any of the stream's resources have been
    closed. No further events will be emitted

    • data : Emitted when new data is read from the stream

    • end : Emitted when all available data has been read

    • error : Emitted when the readable stream experiences an error

    • pause : Emitted when the readable stream is paused

    • readable : Emitted when there is data available to be read

    • resume : Emitted when a readable stream resumes after being in a paused state
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    The following are the events emitted on writable streams:

    • close : Emitted when the stream and any of the stream's resources have been
    closed. No further events will be emitted

    • drain : Emitted when the writable stream can resume writing data

    • error : Emitted when the writeable stream experiences an error

    • finish : Emitted when the writeable stream has ended and all writes have completed

    • pipe : Emitted when the stream.pipe() method is called on a readable stream

    • unpipe : Emitted when the stream.unpipe() method is called on a
    readable stream

    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////


    Streams are either flowing or paused. Flowing data is read automatically while paused we have to use
    the stream.read() method.

    By default, a readable stream is in paused mode. However, the readable stream switches
    to flowing mode in the following instances:

    • When a data event handler is registered
    • When the pipe() method is called
    • When the resume() method is called

    and would switch back to paused mode if:
    • When the pause() method is called and there are no pipe destinations
    • When the unpipe() method is called on all pipe destinations

    pipe() method is very important. Can redirect streams such as directing read to wite output similar to 
    the pipe command in linux.

    Transform streams allow us to consume input data, then process that data, and then
    output the data in processed form. We can use transform streams to handle data
    manipulation functionally and asynchronously. It's possible to pipe many transform
    streams together, allowing us to break complex processing down into sequential tasks.

    Import Transform class from stream and create a new instance of it
    ex:  const { Transform } = require('stream')
    const uppercase = new Transform({
        transform(chunk, encoding, callback){
            
            // data processing...

        }
    })

    ///////////////////////////////////////
    ///////////////////////////////////////

    Stream pipelines
    pipeline() method chains many streams together builing upon the concepts above. // *Very important
    Would import pipeline method and Transform class
    import util to access util.promisify to use promises and async
 * 
 */
