const fs = require('fs');
const { google } = require('googleapis');

const SHEET_ID = '1UVmzG0ttiul_xLWEBbEbfmkv6tOwonPu3AMzUNtgyQQ'; // แทนที่ด้วย Sheet ID จริงจาก Google Sheet

async function fetchData() {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const auth = google.auth.fromJSON(credentials);
    auth.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

    const sheets = google.sheets({ version: 'v4', auth });

    // Personal
    const personalSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Personal',
    });
    const personalData = {};
    personalSheet.data.values.slice(1).forEach((row) => {
        personalData[row[0]] = row[1];
    });

    // Experience
    const experienceSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Experience!A:G',
    });
    const experienceData = experienceSheet.data.values.slice(1).reduce((acc, row) => {
        const category = row[6] || 'Other Valuable Experience'; // ใช้ G (index 6) สำหรับ Category, ถ้าว่างให้เป็นหมวด Other
        acc[category] = acc[category] || [];
        acc[category].push({
            startDate: row[0] || '',
            endDate: row[1] || '',
            jobTitle: row[2] || 'N/A',
            company: row[3] || 'N/A',
            location: row[4] || 'N/A',
            description: row[5] ? row[5].replace(/(\r\n|\n|\r)/g, '<br>') : 'No description available',
        });
        return acc;
    }, {});

    const relevantExperience = experienceData['Relevant Experience'] || [];
    const leadershipExperience = experienceData['Leadership Experience'] || [];
    const otherExperience = experienceData['Other Valuable Experience'] || [];

    // Skills (เพิ่มส่วนนี้)
    const skillsSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Skills',
    });
    const skillsData = skillsSheet.data.values.slice(1).reduce((acc, row) => {
        const category = row[0] || 'Technical Skills'; // ใช้ A (index 0) สำหรับ Category, ถ้าว่างให้เป็น Technical Skills
        acc[category] = acc[category] || [];
        acc[category].push(row[1] || 'N/A'); // ใช้ B (index 1) สำหรับ Skill
        return acc;
    }, {});

    const technicalSkills = skillsData['Technical Skills'] || [];
    const frontendSkills = skillsData['Frontend Development'] || [];
    const backendSkills = skillsData['Backend Development'] || [];
    const toolsSkills = skillsData['Tools & Platforms'] || [];
    const softSkills = skillsData['Soft Skills'] || [];

    // Projects
    const projectsSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Projects',
    });
    const projectsData = projectsSheet.data.values.slice(1).map((row) => {
        return {
            projectName: row[0] || 'N/A',
            startDate: row[1] || '',
            endDate: row[2] || '',
            description: row[3] ? row[3].replace(/(\r\n|\n|\r)/g, '<br>') : 'No description available',
            // technologies: row[4] || 'N/A',
            technologies: row[4]
                ? row[4]
                    .replace(/^\*\*Technologies:\*\*\n/, '') // ลบ "**Technologies:**\n" จากหัว
                    .split('\n● ')
                    .slice(1) // ข้ามบรรทัดว่างแรกหลังการ split
                    .map((tech) => tech.trim()) // ตัดช่องว่างและเก็บเฉพาะเทคโนโลยี
                : ['N/A'], // ถ้าว่างให้ใช้ 'N/A'
            links: row[5] || '',
        };
    });

    // Education
    const educationSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Education',
    });
    const educationData = educationSheet.data.values.slice(1).map((row) => {
        return {
            institution: row[0] || 'N/A',
            degree: row[1] || 'N/A',
            dates: row[2] || 'N/A',
            description: row[3] || 'No description available',
        };
    });

    // Certificates
    const certificatesSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Certificates',
    });
    const certificatesData = certificatesSheet.data.values.slice(1).map((row) => {
        return {
            certificateName: row[0] || 'N/A',
            issueDate: row[1] || '',
            issuingOrganization: row[2] || 'N/A',
            description: row[3] ? row[3].replace(/(\r\n|\n|\r)/g, '<br>') : '',
            url: row[4] || '', // เพิ่ม URL
        };
    });

    // Contact
    const contactSheet = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: 'Contact',
    });
    const contactData = contactSheet.data.values.slice(1).map((row) => {
        return {
            platform: row[0] || 'N/A',
            url: row[1] || '#',
        };
    });

    const dataStr = `
  export const personal = ${JSON.stringify(personalData)};
  export const relevantExperience = ${JSON.stringify(relevantExperience)};
  export const leadershipExperience = ${JSON.stringify(leadershipExperience)};
  export const otherExperience = ${JSON.stringify(otherExperience)};
  export const technicalSkills = ${JSON.stringify(technicalSkills)};
  export const frontendSkills = ${JSON.stringify(frontendSkills)};
  export const backendSkills = ${JSON.stringify(backendSkills)};
  export const toolsSkills = ${JSON.stringify(toolsSkills)};
  export const softSkills = ${JSON.stringify(softSkills)};
  export const projects = ${JSON.stringify(projectsData)};
  export const education = ${JSON.stringify(educationData)};
  export const certificates = ${JSON.stringify(certificatesData)};
  export const contact = ${JSON.stringify(contactData)};
`;
    fs.writeFileSync('data.js', dataStr);
    console.log('Data saved to data.js');
}

fetchData().catch(console.error);