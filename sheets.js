
// https://fusebit.io/blog/google-sheets-api-tutorial/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none


import express from 'express';
import { google } from 'googleapis';

const app = express();
const port = 8080;

const id = '1duDS9d22M2K_XfZyyeAk-1ARqD7rKvLusznFvViCXTI';


//This allows us to parse the incoming request body as JSON
app.use(express.json());

// With this, we'll listen for the server on port 8080
app.listen(port, () => console.log(`Listening on port ${port}`));

async function authSheets() {
    //Function for authentication object
    const auth = new google.auth.GoogleAuth({
      keyFile: "keys.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  
    //Create client instance for auth
    const authClient = await auth.getClient();
  
    //Instance of the Sheets API
    const sheets = google.sheets({ version: "v4", auth: authClient });
  
    return {
      auth,
      authClient,
      sheets,
    };
}

app.get("/", async (req, res) => {
    const { sheets } = await authSheets();
  
    // Read rows from spreadsheet
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: "Sheet1",
    });
  
    res.send(getRows.data);
});
  
  