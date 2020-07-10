import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Button from "../components/button"

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
          <Button tabIndex="-1">&larr; Go Back</Button>
        </Link>
      </main>
    </Layout>
  )
}

export default PostTemplate
