// import { auth } from 'google-auth-library';
import { google } from 'googleapis';

// import * as dotenv from 'dotenv';
// dotenv.config();
// const id = process.env.ID;

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

// Post data to your Spreadsheet
async function postData() {

    const { sheets } = await authSheets();

    // Write rows to spreadsheet
    await sheets.spreadsheets.values.append({
    spreadsheetId: id,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        ["Wed", "F", "3"],
        ["Thu", "M", "2"],
    ],
    },
  });

    console.log( "data posted" );

}

postData();