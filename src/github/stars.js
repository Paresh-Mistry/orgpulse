const { default: axios } = require("axios");


// Fetch Repo Star value from MongoDB 
async function fetchRepoStars(org, repoName) {
  const url = `https://api.github.com/repos/${org}/${repoName}`
    ||
    "https://api.github.com/repos/golang/go"   // Golang Repo for testing
  const headers = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }
  else{
    console.log("No Token Found");
    
  }
  const res = await axios.get(url, { headers });
  return {
    stars: res.data.stargazers_count,
    forks: res.data.forks_count,
  };
}

module.exports = fetchRepoStars


