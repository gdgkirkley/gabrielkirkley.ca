import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Link } from "gatsby";
import { TwitterShareButton } from "react-share";
import Layout from "../components/layout";
import Button from "../components/button";
import Author from "../components/author";
import SEO from "../components/seo";
import config from "../../config/website";

const Post = styled.article`
  margin: 0px 10px;

  & p {
    margin: 25px 0px;
    line-height: 1.8;
  }

  @media (min-width: 768px) {
    margin: 0px 90px;
  }
`;

const PostDate = styled.p`
  font-size: ${props => props.theme.fontSize.information};
  text-align: right;
`;

const PostShare = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const query = graphql`
  query($slug: String!) {
    postData: allMdx(filter: { frontmatter: { slug: { eq: $slug } } }) {
      edges {
        node {
          frontmatter {
            title
            author
            date
            keywords
            image {
              sharp: childImageSharp {
                fluid(quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageAltText
            imageCredit
            slug
          }
          body
          excerpt(pruneLength: 160)
        }
      }
    }
  }
`;

const formatDate = date => {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const PostTemplate = ({ data: { postData } }) => {
  const post = postData.edges[0].node;
  if (!post) return null;
  return (
    <Layout colour="blog" invert={true}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        image={
          post.frontmatter.image ? post.frontmatter.image.sharp.fluid.src : null
        }
        keywords={post.frontmatter.keywords}
        isBlogPost={true}
        slug={post.frontmatter.slug}
      />
      <main>
        <Post>
          <h1>{post.frontmatter.title}</h1>
          {post.frontmatter.image ? (
            <Img
              fluid={post.frontmatter.image.sharp.fluid}
              alt={post.frontmatter.imageAltText}
            />
          ) : null}
          <PostDate>{formatDate(post.frontmatter.date)}</PostDate>
          <MDXRenderer>{post.body}</MDXRenderer>
          <PostShare>
            <TwitterShareButton
              url={`${config.siteUrl}${post.frontmatter.slug}`}
              title={post.frontmatter.title}
              via={config.twitterHandle}
            >
              Share on Twitter
            </TwitterShareButton>
          </PostShare>
          <Author />
          <Link to="/blog" replace>
            <Button tabIndex="-1">&larr; Go Back</Button>
          </Link>
        </Post>
      </main>
    </Layout>
  );
};

export default PostTemplate;
