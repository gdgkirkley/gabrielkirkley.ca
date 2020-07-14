import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Button from "../components/button";
import styled from "styled-components";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { ExternalLink } from "../components/icons";
import { Github } from "../components/social";

const ExampleBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;

  & p {
    font-weight: 300;
  }

  & a {
    margin: 10px 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    & a {
      margin: 0;
    }
  }
`;

export const query = graphql`
  query($slug: String!) {
    pageData: allMdx(filter: { frontmatter: { slug: { eq: $slug } } }) {
      edges {
        node {
          frontmatter {
            title
            tagline
            using
            link
            source
            image {
              sharp: childImageSharp {
                fluid(maxWidth: 1200, maxHeight: 600) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          body
          excerpt
        }
      }
    }
  }
`;

const ExamplePage = ({ data: { pageData } }) => {
  const page = pageData.edges[0].node;

  return (
    <Layout colour="portfolio" invert="true">
      <SEO title={page.frontmatter.title} />
      <main>
        <h1>{page.frontmatter.title}</h1>
        {page.frontmatter.tagline && (
          <p>
            <strong>{page.frontmatter.tagline}</strong>
          </p>
        )}
        <Img fluid={page.frontmatter.image.sharp.fluid} />
        <ExampleBar>
          {page.frontmatter.using && <p>{page.frontmatter.using}</p>}

          {page.frontmatter.source && (
            <a
              href={page.frontmatter.source}
              target="_blank"
              rel="noreferrer noopener"
            >
              View Source
            </a>
          )}
          {page.frontmatter.link && (
            <a
              href={page.frontmatter.link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button tabIndex="-1">
                Take Me There <ExternalLink />
              </Button>
            </a>
          )}
        </ExampleBar>

        <MDXRenderer>{page.body}</MDXRenderer>

        <Link to="/portfolio" replace>
          <Button tabIndex="-1">&larr; Go Back</Button>
        </Link>
      </main>
    </Layout>
  );
};

export default ExamplePage;
