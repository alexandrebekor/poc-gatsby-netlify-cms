const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === 'MarkdownRemark') {
        const group = getNode(node.parent).sourceInstanceName
        createNodeField({
            name: 'collection',
            node,
            value: group
        })

        createNodeField({
            name: 'slug',
            node,
            value: createFilePath({ node, getNode })
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const query = await graphql(`
    {
    posts: allMarkdownRemark(filter: {fields: {collection: {eq: "post"}}}) {
        edges {
        node {
            id
            frontmatter {
            title
            }
            fields {
            slug
            }
        }
        }
    }
    authors: allMarkdownRemark(filter: {fields: {collection: {eq: "author"}}}) {
        edges {
        node {
            id
            frontmatter {
            title
            }
            fields {
            slug
            }
        }
        }
    }
    }
    `)

    query.data.posts.edges.map(({ node }) => {
        createPage({
            path: `/blog${node.fields.slug}`,
            component: path.resolve(`src/templates/post.js`),
            context: {
                id: node.id
            }
        })
    })
}