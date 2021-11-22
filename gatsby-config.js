module.exports = {
    plugins: [
        `gatsby-plugin-netlify-cms`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `author`,
                path: __dirname + `/src/content/author`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `post`,
                path: __dirname + `/src/content/post`
            }
        },
        `gatsby-transformer-remark`
    ]
}