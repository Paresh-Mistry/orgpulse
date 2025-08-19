const { default: axios } = require("axios")

// Mapping Issues
function mapIssue(apiJson, org) {
    return {
        repo: `${org}`,
        number: apiJson.number,
        title: apiJson.title,
        state: apiJson.state,
        createdAt: apiJson.created_at,
    };
}


// fetch Issues from Mongo DB  
async function fetchIssues(org, page) {
    const url = `https://api.github.com/orgs/${org}/issues?per_page=100&page=${page}`
    const headers = {}

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Token ${process.env.GITHUB_TOKEN}`
    }

    const response = axios.get(url, { headers })
    console.log((await response).data)

    return {
        data: (await response).data,
        hasNext: (await response).data.length === 100
    }
}

module.exports = {
    fetchIssues,
    mapIssue
}