import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Image from "gatsby-image"

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
`

const PostPreview = ({ post }) => (
  <Preview>
    <Link to={post.slug} className="imageLink">
      <Image fluid={post.image.sharp.fluid} alt={post.title} />
    </Link>
    <div>
      <h3>
        <Link to={post.slug}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      <Link to={post.slug}>Read more &rarr;</Link>
    </div>
  </Preview>
)

export default PostPreview
