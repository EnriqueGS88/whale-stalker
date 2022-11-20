import { google } from 'googleapis';
import { data } from './output/latestDataScraped.js';

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
export async function postData() {

  const { sheets } = await authSheets();

  // Write rows to spreadsheet
  await sheets.spreadsheets.values.append({
    spreadsheetId: id,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: data,
    },
  });

  console.log( "data posted" );

}

postData();