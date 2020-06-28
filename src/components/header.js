import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const HeaderStyles = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  min-height: 80px;
  margin-top: 5px;
  & nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 0;
    margin: 0px 32px;
  }
`

const NavGroup = styled.div`
  display: grid;
  align-items: flex-end;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const NavLink = styled(Link)`
  font-size: ${props => props.theme.fontSize.emphasis};
  font-weight: bold;
  line-height: 1;
  margin: 0 2rem 0 0;
  padding: 0.25rem;
  text-decoration: none;
  border-bottom: 2px solid white;
  box-sizing: border-box;
  transition: 0.1s ease-in-out;
  & img {
    min-width: 60px;
  }
  &.current {
    border-bottom: 2px solid ${props => props.theme.accent5};
  }
  /* &:last-of-type {
    margin: 0;
  } */
  & :hover {
    border-bottom: 2px solid ${props => props.theme.accent5};
  }
`

const ImageLink = styled(Link)`
  margin: 0 2rem 0 0;
  padding: 0.25rem;
  min-width: 120px;
  transition: 0.1s ease-in-out;
  & img {
    min-width: 60px;
  }
  & :hover {
    min-width: 130px;
  }
`

const Header = ({ siteTitle }) => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "plant-header.png" }) {
        sharp: childImageSharp {
          fluid(quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <HeaderStyles>
      <nav>
        <NavGroup>
          <NavLink to="/portfolio" activeClassName="current">
            Portfolio
          </NavLink>
          <NavLink to="/skills" activeClassName="current">
            Blog
          </NavLink>
        </NavGroup>
        <ImageLink to="/" fontWeight="bold">
          <Img fluid={image.sharp.fluid} alt={siteTitle} />
        </ImageLink>
        <NavGroup>
          <NavLink to="/about" activeClassName="current">
            About
          </NavLink>
          <NavLink to="/contact" activeClassName="current">
            Contact
          </NavLink>
        </NavGroup>
      </nav>
    </HeaderStyles>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
