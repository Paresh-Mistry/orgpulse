const { default: axios } = require("axios")

function mapIssue(apiJson, org, repoName) {
    return {
        repo: `${org}/${repoName}`,
        number: apiJson.number,
        title: apiJson.title,
        state: apiJson.state,
        createdAt: apiJson.created_at,
    };
}

async function fetchIssues(org) {
    const url = `https://api.github.com/orgs/${org}/issues?per_page=100&page=${page}`
    const headers = {}

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Token ${GITHUB_TOKEN}`
    }

    const response = axios.get(url, { headers })
    console.log((await response).data)

    return {
        data: (await response).data,
        hasNext: res.headers.link && res.headers.link.includes('rel="next"'),
    }
}

module.exports = {
    fetchIssues,
    mapIssue
}