const { default: axios } = require("axios");
const { avatar } = require("../utils/avatar");


// Mapping Repo 
function mapRepo(apiJson, org) {
  return {
    org,
    name: apiJson.name,
    description: apiJson.description,
    topics: apiJson.topics || [],
    language: apiJson.language,
    avatar: apiJson.owner.avatar_url,
    stars: apiJson.stargazers_count,
    forks: apiJson.forks_count,
    openIssues: apiJson.open_issues_count,
    license: apiJson.license ? apiJson.license.spdx_id : null,
    pushedAt: apiJson.pushed_at,
  };
}



// Fetch Repo from Mongo db
async function fetchRepos(org, page) {
  // const url = `https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}`;
  const url = `https://api.github.com/orgs/nextjs/repos?per_page=100&page=1`;
  const headers = {}

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Token ${process.env.GITHUB_TOKEN}`
  }

  const res = axios.get(url, { headers })



  const repo = (await res).data

  await avatar(repo[0].owner.avatar_url)

  return {
    data: repo,
    hasNext: repo.length === 100
  }
}

fetchRepos()

module.exports = {
  fetchRepos,
  mapRepo
}