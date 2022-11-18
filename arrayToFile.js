// import { convertArrayToCSV } from 'convert-array-to-csv';
// import converter from 'convert-array-to-csv';
import { time } from './getTime.js';
import fs from 'fs-extra';


const arr = [
    [ "pA", "$1k", 1000, "some text" ],
    [ "pB", "$3k", 3000, "some words" ],
    [ "pC", "$4k", 4000, "some gibberish" ],
]

const string = JSON.stringify( arr );

// Store CSV data into a file in ./output
async function saveFile ( f, d ) {
    try{
        await fs.outputFile( f, d );

    } catch ( e ) {
        console.error( e )
    }
}

let filePath = `./output/arraySave_${time.fileID}.js`;
saveFile( filePath, string );