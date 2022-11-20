import fs from "fs-extra";

let timestamp = Math.floor( Date.now() / 1000 );

// const arr = [
//     [ timestamp, "pA", "$1k", 1000, "some\n text" ],
//     [ timestamp, "pB", "$3k", 3000, "some\n words" ],
//     [ timestamp, "pC", "$4k", 4000, "some\n gibberish" ],
// ]

export const arr = [
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
  [
    "20112022_173139",
    1668961911,
    "etherisc",
    "$100K",
    100000,
    "Etherisc is developing a protocol for decentralized insurance applications.",
  ],
  [
    "20112022_173139",
    1668961926,
    "treehouse-finance",
    "$20.4M",
    20400000,
    "Treehouse is a DeFi analytics platform that delivers data, analytics, and risk management to DeFi users and to drive community innovation.",
  ],
];

const prefix = "export const data = ";

const string = prefix + JSON.stringify(arr);

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
