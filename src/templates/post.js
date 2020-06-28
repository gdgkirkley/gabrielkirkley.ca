import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        author
        date
      }
      body
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

const PostTemplate = ({ data: { mdx: post } }) => {
  if (!post) return null
  return (
    <Layout>
      <h1>{post.frontmatter.title}</h1>
      <MDXRenderer>{post.body}</MDXRenderer>
      <p>Posted by {post.frontmatter.author}</p>
      <p>{formatDate(post.frontmatter.date)}</p>
      <Link to="/blog" replace>
        &larr; Go Back
      </Link>
    </Layout>
  )
}

export default PostTemplate
