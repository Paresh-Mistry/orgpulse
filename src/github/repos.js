const { default: axios } = require("axios");


function mapRepo(apiJson, org) {
    return {
        org,
        name: apiJson.name,
        description: apiJson.description,
        topics: apiJson.topics || [],
        language: apiJson.language,
        stars: apiJson.stargazers_count,
        forks: apiJson.forks_count,
        openIssues: apiJson.open_issues_count,
        license: apiJson.license ? apiJson.license.spdx_id : null,
        pushedAt: apiJson.pushed_at,
    };
}


async function fetchRepos(org, page) {
    const url = `https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}`;
    const headers = {}

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Token ${GITHUB_TOKEN}`
    }

    const res = axios.get(url, { headers })
    console.log("Working Fine")

    const repo = (await res).data

    return {
        data: repo,
        // hasNext: (await res).headers.Server.link && res.headers.link.includes('rel="next"'),
    }
}

module.exports = {
    fetchRepos,
    mapRepo
}