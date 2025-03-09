# Thunnathorne Resume 2025

## Overview

This repository contains the source code for a personal resume website, `thunnathorne_resume2025`, built using **Next.js 15.2.0**. The project dynamically fetches resume data from a Google Sheet and generates a static site for deployment on **GitHub Pages**. The site is styled with **Tailwind CSS** and designed to be lightweight, responsive, and easily maintainable. This serves as a professional portfolio showcasing my skills and experience.

- **Live Demo**: [https://atomo15.github.io/thunnathorne_resume2025](https://atomo15.github.io/thunnathorne_resume2025)
- **Repository**: [https://github.com/atomo15/thunnathorne_resume2025](https://github.com/atomo15/thunnathorne_resume2025)
- **Branch**: `main` (development), `gh-pages` (deployment)

## Features

- Dynamic data fetching from Google Sheets using a custom script.
- Static site generation with Next.js `output: 'export'` for GitHub Pages compatibility.
- Responsive design powered by Tailwind CSS.
- Automated deployment via GitHub Actions.
- Local development and testing environment.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v20.x or later) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- Google Cloud Service Account JSON Key (for Google Sheets API access)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/atomo15/thunnathorne_resume2025.git
cd thunnathorne_resume2025
```

### 2. Install Dependencies
Install the required Node.js packages:
```bash
npm install
```
Ensure the <mark>`googleapis`</mark> package is installed for Google Sheets API integration:
```bash
npm install googleapis
```

### 3. Configure Google Credentials
To fetch data from Google Sheets, you need a Service Account JSON Key:
- Create a Service Account in <mark>Google Cloud Console</mark>.
- Download the JSON key file (e.g., <mark>`credentials.json`</mark>).
- Set the <mark>GOOGLE_CREDENTIALS</mark> environment variable:
```bash
export GOOGLE_CREDENTIALS=$(cat secrets/credentials.json)
```
- Share your Google Sheet with the Service Account email (found in the JSON key) and note the Sheet ID (from the Sheet URL: <mark>https://docs.google.com/spreadsheets/d/SHEET_ID/edit</mark>).

### 4. Fetch Data
Run the custom script to fetch data from Google Sheets and generate data.js:
```bash
npm run fetch-data
```
This script ( <mark>scripts/fetch-data.js</mark> ) uses the Google Sheets API to pull data and save it as <mark>data.js</mark> for use in the Next.js app.

### 5. Run the Development Server
Since this project uses output: 'export', build and serve the static files locally:
```bash
npx next build
npx next export
npx serve@latest out
```
Open <mark>`http://localhost:3000`</mark> (or <mark>`http://localhost:3000/thunnathorne_resume2025`</mark> if using a subpath) in your browser.

### 6. Build for Production
To prepare the site for deployment:
```bash
npx next build
npx next export
```
---
**Project Structure**

thunathorne_resume2025/
├── public/                  # Static assets (e.g., profile.jpg)
├── pages/                   # Next.js pages (e.g., index.js)
├── scripts/                 # Custom scripts (e.g., fetch-data.js)
├── styles/                  # CSS files (e.g., global.css with Tailwind)
├── .github/                 # GitHub Actions workflows
│   └── workflows/
│       └── build-and-deploy.yml
├── secrets/                 # Google Credentials (not committed)
├── out/                     # Static export output
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── README.md                # This file
└── data.js                  # Generated data file from Google Sheets
