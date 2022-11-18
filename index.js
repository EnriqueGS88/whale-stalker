import puppeteer from 'puppeteer';
import { convertArrayToCSV } from 'convert-array-to-csv';
import converter from 'convert-array-to-csv';
import fs from 'fs-extra';
import { selectors } from './puppeteer/selectors.js';
import { companies } from './puppeteer/companies.js';
import { time } from './utils/getTime.js';
import { convertToUSD, randomNumber } from './utils/convertToUSD.js';

const header = [
    'date',
    'company',
    'amountText',
    'amountUSD',
    'description',
];


async function delay( time ) {
    return new Promise(r => setTimeout(r, time ));
}


// Main Async function to scrape
 async function getObjects(){
    
    companies.sort();

    let fundsByDate = [ ];


    for ( let i=0; i < companies.length; i++ ) {
        const investmentsURL = `https://www.crunchbase.com/organization/${ companies[i] }/recent_investments`
        const crunchbase = `https://www.crunchbase.com/organization/${ companies[i] }`;      
        
        // Random slow mo to bypass Bots Banners
        let randomSlowMo = randomNumber( 50, 130 );

        const browser = await puppeteer.launch(
            {   
                headless: false,
                defaultViewport: {
                    width: 1700,
                    height: 900,
                    deviceScaleFactor: 1,
                },
                slowMo:randomSlowMo
            }
        );
            
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        await page.goto( crunchbase );

        // Random Delay to bypass Bots Banners
        await delay( randomNumber( 1500, 4500 ) );
        
        let projectFunds = [ ];

        const fundsRaised = await page.$eval( selectors.fundingAmount, e => e.innerText );
        const description = await page.$eval( selectors.description, e => e.innerText );
        const fundsUSD = convertToUSD( fundsRaised );
        projectFunds.push( time.fileID, companies[i], fundsRaised, fundsUSD, description );
        fundsByDate.push( projectFunds );  // This array will be converted into CSV
        
        console.log( "funds: ", fundsUSD );

        
        await page.close();
        await browser.close();        
    }
    
    
    // Convert Array of Arrays into CSV
    const scrapeDataAsCSV = convertArrayToCSV( fundsByDate, {
        header,
        separator: ','
    });

    const scrapeDataAsArray = JSON.stringify( fundsByDate );

    // Store CSV data into a file in ./output
    async function saveFile ( f, d ) {
        try{
            await fs.outputFile( f, d );

        } catch ( e ) {
            console.error( e )
        }
    }

    let csvPath = `./output/crunchbase_${time.fileID}.csv`;
    saveFile( csvPath, scrapeDataAsCSV );
    
    let arrayPath = `./output/crunchbase_${time.fileID}.js`;
    saveFile( arrayPath, scrapeDataAsArray );





    // console.log( fundsByDate );        
}

getObjects();
