import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Image from "gatsby-image";
import Button from "../components/button";
import { formatDate } from "../lib/dates";

const Preview = styled.article`
  border-bottom: 1px solid ${props => props.theme.accent5};
  margin-top: 0;
  padding-bottom: 1rem;
  display: grid;
  &:first-of-type {
    margin-top: 1rem;
  }
  & a {
    margin: 1rem 1rem 0 0;
    min-width: 100px;
    & img {
      width: 100%;
    }
  }
`;

const PostPreview = ({ post }) => (
  <Preview>
    {post.image ? (
      <Link to={post.slug} className="imageLink">
        <Image fluid={post.image.sharp.fluid} alt={post.title} />
      </Link>
    ) : null}
    <div>
      <h2>
        <Link to={post.slug}>{post.title}</Link>
      </h2>
      <p>{formatDate(post.date)}</p>
      <p>{post.excerpt}</p>
      <Link to={post.slug}>
        <Button tabIndex="-1">Read more &rarr;</Button>
      </Link>
    </div>
  </Preview>
);

export default PostPreview;
