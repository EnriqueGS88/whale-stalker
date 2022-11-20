import fs from "fs-extra";
import { postData } from "./post.js";

let timestamp = Math.floor( Date.now() / 1000 );

const arr = [
    [ timestamp, "pA", "$1k", 1000, "some\n text" ],
    [ timestamp, "pB", "$3k", 3000, "some\n words" ],
    [ timestamp, "pC", "$4k", 4000, "some\n gibberish" ],
]

const prefix = "export const data = ";

const string = prefix + JSON.stringify( arr );

// Store CSV data into a file in ./output
async function saveFile(f, d) {
  try {
    await fs.outputFile(f, d);
  } catch (e) {
    console.error(e);
  }
}

let filePath = `../output/latestDataScraped_2.js`;

console.log("file saved");

saveFile(filePath, string);

await postData();
console.log( "data posted" );