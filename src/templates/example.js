import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Button from "../components/button"
// import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query($slug: String!) {
    pageData: allMdx(filter: { frontmatter: { slug: { eq: $slug } } }) {
      edges {
        node {
          frontmatter {
            title
          }
          body
          excerpt
        }
      }
    }
  }
`

const shortcodes = { Button }

const ExamplePage = ({ data: { pageData } }) => {
  const page = pageData.edges[0].node

  return (
    <Layout colour="portfolio" invert="true">
      <SEO title={page.title} />
      <main>
        <h1>{page.title}</h1>
        <MDXRenderer components={shortcodes}>{page.body}</MDXRenderer>
        <Link to="/portfolio" replace>
          &larr; Go Back
        </Link>
      </main>
    </Layout>
  )
}

export default ExamplePage
