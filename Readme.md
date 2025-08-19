# 🚀 Orgpulse CLI

![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge)
![Version](https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)

Orgpulse CLI is a powerful command-line tool to fetch, analyze, and export GitHub organization data. Manage repositories, issues, stars, and metrics effortlessly from your terminal.

---

## 🛠️ Tech Stack
- **Language:** JavaScript (Node.js)  
- **CLI Framework:** [Commander.js](https://www.npmjs.com/package/commander)  
- **Database:** MongoDB  
- **Data Formats:** CSV / JSON  
- **Other Tools:** Axios (for API calls), Dotenv (for environment variables)  

---


## ✨ Features

- Fetch repositories and issues of any GitHub organization.
- Check if organization data is already fetched.
- Display top repositories by stars or issues.
- Export organization data to CSV or other formats.
- Sync stars and forks for all repositories.
- Lightweight and easy-to-use CLI.

---

## Documentation 

+ ### [PDF-FILE](https://drive.google.com/file/d/1DgVOjOCTraHl4Cne8m-DVRtd5MvBpSTH/view?usp=drive_link)
+ ### [DOC-FILE](./public/docs/ORGPULSE_CLI_CMD.pdf)

---

## ⚡ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/orgpulse.git
cd orgpulse

# Install dependencies
npm install

# Make CLI globally available (optional)
npm link
```


## 💻 CLI Usage


```bash
# Initialize CLI
orgpulse init

# Check if organization is fetched
orgpulse check-org

# Fetch data for an organization
orgpulse fetch facebook

# Show top 5 repos by stars
orgpulse top --org facebook --metric stars --limit 5

# Export top 10 repos by issues to CSV
orgpulse exports --org facebook --metric issues --limit 10 --type csv

# Sync stars & forks
orgpulse sync-stars --org facebook
```

---

## 📜 License
This project is licensed under the MIT License.