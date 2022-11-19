import fs from 'fs-extra';

const arr = [
    [ "pA", "$1k", 1000, "some\n text" ],
    [ "pB", "$3k", 3000, "some\n words" ],
    [ "pC", "$4k", 4000, "some\n gibberish" ],
]

const prefix = "export const data = ";

const string = prefix + JSON.stringify( arr );

// Store CSV data into a file in ./output
async function saveFile ( f, d ) {
    try{
        await fs.outputFile( f, d );

    } catch ( e ) {
        console.error( e )
    }
}

let filePath = `../output/latestDataScraped.js`;

console.log( "file saved" );

saveFile( filePath, string );