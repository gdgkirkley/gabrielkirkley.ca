import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Hamburger from "hamburger-react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Social from "./social"
import useWindowSize from "../hooks/useWindowSize"

const HeaderStyles = styled.header`
  display: flex;
  align-items: center;
  min-height: 80px;
  background: white;
  justify-content: space-between;
  & nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    margin-top: 0;
    margin: 0px 32px 0px 0px;
    position: relative;
  }

  @media (min-width: 768px) {
    & nav {
      margin: 0px 0px 0px 32px;
      flex-direction: row;
    }
  }
`

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 24px;
  background: ${props => (props.colour ? props.colour : "none")};
  margin-bottom: 24px;

  @media (min-width: 768px) {
    margin-bottom: 0px;
    flex-direction: row;
  }
`

const NavLink = styled(Link)`
  font-size: ${props => props.theme.fontSize.emphasis};
  font-weight: bold;
  line-height: 1;
  margin: 80px 2rem 0 0;
  padding: 0.25rem;
  text-decoration: none;
  border-bottom: 2px solid white;
  box-sizing: border-box;
  transition: 0.1s ease-in-out;
  & img {
    min-width: 60px;
  }
  &.current {
    border-bottom: 2px solid ${props => props.colour};
  }
  /* &:last-of-type {
    margin: 0;
  } */
  & :hover {
    border-bottom: 2px solid ${props => props.theme.grey5};
  }

  @media (min-width: 768px) {
    margin: 0 2rem 0 0;
  }
`

const SiteTitle = styled(Link)`
  margin: 0 2rem 0 0;
  padding: 0.25rem;
  min-width: 120px;
  transition: all 0.4s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0px 0px 0px 32px;

  font-weight: bolder;
  font-size: 22px;
  z-index: 2;
  color: ${props => props.theme.grey5};
  border-radius: 1000px;
  padding: 8px 12px;

  & :hover {
    color: ${props => props.theme.grey3};
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`

const MobileIcon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.grey1};
  @media (min-width: 768px) {
    display: none;
  }
`

const MobileNav = styled.div`
  display: none;

  &.open {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 80px;
    bottom: 0;
    z-index: 999;
    overflow-y: scroll;
    overflow-x: hidden;
    background: ${props => props.theme.grey10};

    width: 100%;
    justify-content: space-evenly;
  }

  @media (min-width: 768px) {
    overflow-y: auto;
    height: inherit;
    width: auto;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
  }
`

const Header = ({ siteTitle, theme, socialColour, invertSocial }) => {
  const [open, setOpen] = useState(false)

  const { width } = useWindowSize()

  useEffect(() => {
    if (width !== undefined && width > 768) {
      setOpen(false)
    }
  }, [width])

  const handleMenuButtonClick = () => {
    if (width && width !== undefined && width > 768) {
      return
    }

    if (!open) {
      document.body.style.position = "fixed"
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = "100%"
    } else {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }

    setOpen(!open)
  }

  const handleLinkClick = () => {
    if (width && width !== undefined && width > 768) {
      return
    }

    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.width = ""
  }

  return (
    <HeaderStyles>
      <nav className={open ? "open" : ""}>
        <SiteTitle to="/" fontWeight="bold">
          Gabe Kirkley.
        </SiteTitle>
        <MobileIcon>
          <Hamburger toggled={open} toggle={handleMenuButtonClick} />
        </MobileIcon>
        <MobileNav className={open ? "open" : ""}>
          <NavGroup>
            <NavLink
              to="/"
              activeClassName="current"
              colour={socialColour}
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/portfolio"
              activeClassName="current"
              colour={socialColour}
              partiallyActive={true}
              onClick={handleLinkClick}
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/blog"
              activeClassName="current"
              colour={socialColour}
              partiallyActive={true}
              onClick={handleLinkClick}
            >
              Blog
            </NavLink>
            <NavLink
              to="/about"
              activeClassName="current"
              colour={socialColour}
              onClick={handleLinkClick}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              activeClassName="current"
              colour={socialColour}
              onClick={handleLinkClick}
            >
              Contact
            </NavLink>
          </NavGroup>
          <NavGroup colour={socialColour}>
            <Social invertSocial={invertSocial} />
          </NavGroup>
        </MobileNav>
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
