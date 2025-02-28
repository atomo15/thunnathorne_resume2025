const fs = require('fs');
const { google } = require('googleapis');

const SHEET_ID = '1UVmzG0ttiul_xLWEBbEbfmkv6tOwonPu3AMzUNtgyQQ'; // แทนที่ด้วย ID ของ Google Sheet ของคุณ

async function fetchData() {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = google.auth.fromJSON(credentials);
    auth.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

    const sheets = google.sheets({ version: 'v4', auth });

    // ดึงข้อมูลจาก sheet Personal
    const personalSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Personal!A:B',
    });
    const personalData = {};
    personalSheet.data.values.slice(1).forEach((row) => {
        personalData[row[0]] = row[1];
    });

    // ดึงข้อมูลจาก sheet Experience
    const experienceSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Experience',
    });
    const experienceData = experienceSheet.data.values.slice(1).map((row) => {
        return {
            startDate: row[0],
            endDate: row[1],
            jobTitle: row[2],
            company: row[3],
            location: row[4],
            description: row[5],
        };
    });

    // ดึงข้อมูลจาก sheet อื่นๆ เช่น Skills, Projects, Education, Contact ในลักษณะเดียวกัน

    // บันทึกข้อมูลลงไฟล์ data.js
    const dataStr = `
    export const personal = ${JSON.stringify(personalData)};
    export const experience = ${JSON.stringify(experienceData)};
    // export อื่นๆ
  `;
    fs.writeFile('data.js', dataStr, (err) => {
        if (err) throw err;
        console.log('Data saved to data.js');
    });
}

fetchData();