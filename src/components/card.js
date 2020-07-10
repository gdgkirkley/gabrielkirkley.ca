import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import Button from "./button"

const CardLink = styled(Link)`
  display: grid;
  transition: 0.1s linear;
  border-radius: 4px;
  border: 3px solid white;
  position: relative;
  overflow: hidden;
  background-color: #f2f8f9;
  z-index: 0;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: #00838d;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }

  & :hover,
  :focus,
  :focus-within {
    border: 3px solid ${props => props.theme.accent5};
    & p {
      transition: all 0.3s ease-out;
      color: ${props => props.theme.grey10};
    }
    & h3 {
      transition: all 0.3s ease-out;
      color: ${props => props.theme.grey10};
    }
    &::before {
      transform: scale(51);
    }
  }
`
const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  background: url(${props => props.background}) center center/cover;
  transition: 0.4s linear;
`

const CardContent = styled.div`
  padding: 16px 16px;
`

const Card = ({ image, title, description, url }) => {
  return (
    <CardLink to={url}>
      <CardContainer>
        {image && <Img fluid={image.sharp.fluid} />}
        <CardContent>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <Link to={url}>
            <Button tabIndex="-1">Learn more</Button>
          </Link>
        </CardContent>
      </CardContainer>
    </CardLink>
  )
}

export default Card
