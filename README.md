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
