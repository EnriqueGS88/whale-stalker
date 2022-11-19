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
    
    // companies.sort();

    let fundsByDate = [ ];


    // for ( let i=0; i < companies.length; i++ ) {
    for ( let i=0; i < 2; i++ ) {
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

        console.log( "about to fake logo clicks" ); // Here plays the Bot Blocker
        
        // Fake click to disguise bot blocker
        const logoSelector = 'div[class="provide-styling cb-image-with-placeholder"]';
        await page.waitForSelector( logoSelector );
        await delay( randomNumber( 1500, 4500 ) );
        await page.click( logoSelector );
        
        console.log( "about to fake mouse moves" );
        
        // Fake mouse mouves to disguise bot blocker
        const elem = await page.$( logoSelector);
        const boundingBox = await elem.boundingBox();
        await page.mouse.move(
            boundingBox.x + boundingBox.width / 2,
            boundingBox.y + boundingBox.height / 2
            );
        await page.mouse.wheel({deltaY: -100});
            
        console.log( "about to have a random lenght delay" );
        // Random Delay to bypass Bots Banners
        await delay( randomNumber( 1500, 4500 ) );
        
        let projectFunds = [ ];
        let timestamp = Math.floor(Date.now() / 1000);

        const fundsRaised = await page.$eval( selectors.fundingAmount, e => e.innerText );
        const description = await page.$eval( selectors.description, e => e.innerText );
        const fundsUSD = convertToUSD( fundsRaised );
        projectFunds.push( time.fileID, timestamp, companies[i], fundsRaised, fundsUSD, description );
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

    const scrapeDataAsString = JSON.stringify( fundsByDate );
    console.log( "stringified: ", scrapeDataAsString );



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


    const prefix = "export const data = ";
    const scrapeDataAsArray = prefix + JSON.stringify( scrapeDataAsString );
    console.log( "prefixed: ", scrapeDataAsArray );


    let arrayPath = `./output/latestDataScraped.js`;
    saveFile( arrayPath, scrapeDataAsArray );





    // console.log( fundsByDate );        
}

getObjects();
