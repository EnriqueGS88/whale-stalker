/*
    Scrape all Recommendations per LOB and per Value Driver
    Check if Recommendation Type tab does even exist
    Save scraped data into arrays
    Export arrays results in a CSV under ./output
*/

// const puppeteer = require('puppeteer');
// const splitArray = require('./utils/splitArray')
// const utils = require('./utils/utilities');
// const { convertArrayToCSV } = require('convert-array-to-csv');
// const converter = require('convert-array-to-csv');
// const time = require('./utils/getTime');
import { companies } from './companies.js';
import puppeteer from 'puppeteer';
import { time } from './getTime.js';
import { selectors } from './selectors.js';

// const selector = require('./QAselectors')
// require('dotenv').config();

// URL and logins for QA system
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

    let fundsByDate = [ ];

    for ( let i=0; i < companies.length; i++ ) {

        const investmentsURL = `https://www.crunchbase.com/organization/${ companies[i] }/recent_investments`

        const crunchbase = `https://www.crunchbase.com/organization/${ companies[i] }`;      
        
        const browser = await puppeteer.launch(
            {   
                headless: false,
                defaultViewport: {
                    width: 1700,
                    height: 900,
                    deviceScaleFactor: 1,
                },
                slowMo:70
            }
        );
            
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        
        await page.goto( crunchbase );
        
        let projectFunds = [ ];

        const fundsRaised = await page.$eval( selectors.fundingAmount, e => e.innerText );

        const convertToUSD = ( text ) => {
            
            // if K = * 1000
            // if EUR = * 1.1
            // if EUR = delete sign
            // if $ = delete sign
            // if .  = move decimal

           let noDollar = text.replace( '$', '' );

           let thousands = noDollar.replace( 'K', '000' );
           let millions = thousands.replace( 'M', '000000');
           let millionsWithoutDecimals = millions.replace( '.', '' );
           
           let value = Number( millionsWithoutDecimals );
           return value;

        };
        const fundsUSD = convertToUSD( fundsRaised );
        console.log( fundsUSD );

        const description = await page.$eval( selectors.description, e => e.innerText );
        console.log( description );

        projectFunds.push( time.fileID, companies[i], fundsRaised, fundsUSD, description );

        fundsByDate.push( projectFunds ); 
        
        console.log( page.url() );        
        await page.close();
        await browser.close();
        
    }
    console.log( fundsByDate );        

}

getObjects();
