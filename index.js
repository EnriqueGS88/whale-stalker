/*
    Scrape all Recommendations per LOB and per Value Driver
    Check if Recommendation Type tab does even exist
    Save scraped data into arrays
    Export arrays results in a CSV under ./output
*/

const puppeteer = require('puppeteer');
// const splitArray = require('./utils/splitArray')
// const utils = require('./utils/utilities');
// const { convertArrayToCSV } = require('convert-array-to-csv');
// const converter = require('convert-array-to-csv');
const time = require('./utils/getTime');
// const selector = require('./QAselectors')
require('dotenv').config();

// URL and logins for QA system
const bpiURL =      `https://www.crunchbase.com/organization/rapidapi`;;
// const username =    process.env.QAUSER;
// const psswd =       process.env.QAPASSWORD;
// const adminURL =    process.env.QANEWADMINURL;

// const header = [
//     'entryID',
//     'industry',
//     'lob',
//     'valueDriver',
//     'categoryID',
//     'typeID',
//     'recomms',
// ];


// Main Async function to scrape
async function getObjects(){

    const browser = await puppeteer.launch(
        {   
            headless: false,
            defaultViewport: {
                width: 1700,
                height: 900,
                deviceScaleFactor: 1,
            },
            slowMo:30
        }
    );

    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    let startTime = time.start;
    console.log("Start Scraper at :",startTime);

    await page.goto(bpiURL);

    console.log( page.url() );

    await page.close();

}

getObjects();
