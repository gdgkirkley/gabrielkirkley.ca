import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    postData: allMdx(filter: { frontmatter: { slug: { eq: $slug } } }) {
      edges {
        node {
          frontmatter {
            title
            author
            date
          }
          body
        }
      }
    }
  }
`

const formatDate = date => {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const PostTemplate = ({ data: { postData } }) => {
  const post = postData.edges[0].node
  if (!post) return null
  return (
    <Layout colour="blog" invert={true}>
      <main>
        <h1>{post.frontmatter.title}</h1>
        <MDXRenderer>{post.body}</MDXRenderer>
        <p>Posted by {post.frontmatter.author}</p>
        <p>{formatDate(post.frontmatter.date)}</p>
        <Link to="/blog" replace>
          &larr; Go Back
        </Link>
      </main>
    </Layout>
  )
}

export default PostTemplate
