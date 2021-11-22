import React from 'react'
import { graphql } from 'gatsby'

const Post = ({ data }) => {
    return (
        <>
            <h1>Post</h1>
            <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
        </>
    )
}

export default Post

export const pageQuery = graphql`
    query($id: String!) {
        post: markdownRemark(id: {eq: $id}) {
            html
        }
    }
`