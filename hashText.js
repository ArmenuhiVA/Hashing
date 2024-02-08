const fs = require('fs');
const crypto = require('crypto');
const Readable = require('stream').Readable

const textMessage = "Hello";
const fileName = "message-hash.txt";

const readFile = "read-hash.txt";
const writeFile = "write-hash.txt"

const encryptionAlgorithm = 'sha256';

const hash = crypto.createHash(encryptionAlgorithm, textMessage);

let readableStream = new Readable();
readableStream.push(textMessage);
readableStream.push(null);


let writeableStream = fs.createWriteStream(fileName, {
    highWaterMark: 10
});


readableStream.pipe(hash).pipe(writeableStream)

writeableStream.on('finish', () => {
    console.log("Done");
})


let readableStreamFromFile = fs.createReadStream(readFile, {
    highWaterMark: 10
})

let writeableStreamToFile = fs.createWriteStream(writeFile, {
    highWaterMark: 10
})

readableStreamFromFile.pipe(hash).pipe(writeableStreamToFile);