import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

const QUERY = graphql`
        query {
        posts: allMarkdownRemark(filter: {fields: {collection: {eq: "post"}}}) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        description
                    }
                    html
                    fields {
                        slug
                    }
                }
            }
        }
    }
`

const Home = () => {
    const query = useStaticQuery(QUERY)

    return (
        <>
            {JSON.stringify(query, null, 2)}
            <h1>Hello World</h1>
            {query.posts.edges.map(post => {
                return (
                    <article>
                        <h2>{post.node.frontmatter.title}</h2>
                        <p>{post.node.frontmatter.description}</p>
                        <Link to={`/blog${post.node.fields.slug}`}>Saiba mais...</Link>
                    </article>
                )
            })}
        </>
    )
}

export default Home