const githubQuery = (pageCount, queryString) => {
    return {
        query: `
        {
            viewer {
                name
            }
            search(query: " ${queryString}user:arief-github sort:update-desc", type: REPOSITORY, first: ${pageCount}) {
                    repositoryCount
                    nodes {
                        ... on Repository {
                            id
                            url
                            name
                            description
                            viewerSubscription
                            licenseInfo {
                                spdxId
                            }
                        }
                }
            }
        }
    `
    }
}

export default githubQuery;