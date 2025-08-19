const { default: axios } = require("axios");

async function fetchIssues(owner, repo, page = 1) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues?per_page=100&page=${page}`;
  const headers = { 'User-Agent': 'Node.js' };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }

  const response = await axios.get(url, { headers });

  return {
    data: response.data,
    hasNext: response.data.length === 100
  };
}


// Map Issues
function mapIssue(apiJson, repoName) {
  return {
    repo: repoName,
    number: apiJson.number,
    title: apiJson.title,
    state: apiJson.state,
    createdAt: apiJson.created_at,
  };
}

module.exports = { fetchIssues, mapIssue };

