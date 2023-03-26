const githubQuery = {
    query : `
        {
            viewer {
                name
            }
            search(query: "user:arief-github sort:update-desc", type: REPOSITORY, first: 10) {
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

export default githubQuery;