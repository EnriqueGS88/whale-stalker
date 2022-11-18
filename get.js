import { google } from 'googleapis';

const id = '1duDS9d22M2K_XfZyyeAk-1ARqD7rKvLusznFvViCXTI';

// Authenticate to google api
async function authSheets() {
    const auth = new google.auth.GoogleAuth( {
        keyFile: "keys.json",
        scopes: [ "https://www.googleapis.com/auth/spreadsheets" ],
    } );

    const authClient = await auth.getClient();

    const sheets = google.sheets( { version: "v4", auth: authClient } );

    return {
        auth,
        authClient,
        sheets,
    };

}

// Get data from your Spreadsheet
async function getData() {

    const { sheets } = await authSheets();

    const getRows = await sheets.spreadsheets.values.get( {
        spreadsheetId: id,
        range: "Sheet1",
    });

    console.log( getRows.data );

}

getData();