import { companies } from './companies.js';
import puppeteer from 'puppeteer';
import { convertArrayToCSV } from 'convert-array-to-csv';
import fs from 'fs-extra';
import converter from 'convert-array-to-csv';
import { time } from './getTime.js';
import { selectors } from './selectors.js';
import { convertToUSD } from './utils/convertToUSD.js';

const header = [
        'date',
        'company',
        'amountText',
        'amountUSD',
        'description',
    ];
    
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
        const description = await page.$eval( selectors.description, e => e.innerText );
        const fundsUSD = convertToUSD( fundsRaised );
        projectFunds.push( time.fileID, companies[i], fundsRaised, fundsUSD, description );
        fundsByDate.push( projectFunds );  // This array will be converted into CSV
        
        console.log( "funds: ", fundsUSD );

        // Convert Array of Arrays into CSV
        const csvFromArray = convertArrayToCSV( fundsByDate, {
            header,
            separator: ','
        });

        // Store CSV data into a file in ./output
        async function saveFile ( f, d ) {
            try{
                await fs.outputFile( f, d );

            } catch ( e ) {
                console.error( e )
            }
        }

        let filePath = `./output/crunchbase_${time.fileID}`;
        saveFile( filePath, csvFromArray );
  
        await page.close();
        await browser.close();        
    }
    // console.log( fundsByDate );        
}

getObjects();
