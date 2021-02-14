import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Hamburger from "hamburger-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { FiMoon } from "@react-icons/all-files/fi/FiMoon";
import Social from "./social";
import useWindowSize from "../hooks/useWindowSize";
import Fox from "../../images/gk-fox.svg";

const mobileStyleScreenWidth = 1245;

const HeaderStyles = styled.header`
  display: flex;
  align-items: center;
  min-height: 80px;
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

  @media (min-width: ${mobileStyleScreenWidth}px) {
    & nav {
      margin: 0px 0px 0px 32px;
      flex-direction: row;
    }
  }
`;

const NavGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  margin-bottom: 24px;

  & svg {
    width: 2.8rem;
    height: auto;
  }

  @media (min-width: ${mobileStyleScreenWidth}px) {
    margin-bottom: 0px;
    flex-direction: row;
  }
`;

const NavLink = styled(Link)`
  font-size: ${props => props.theme.fontSize.emphasis};
  font-weight: bold;
  line-height: 1;
  margin: 0;
  margin-top: 30px;
  padding: 0.25rem;
  text-decoration: none;
  border-bottom: 2px solid var(--navLinkUnderlineInactiveColor);
  box-sizing: border-box;
  transition: 0.1s ease-in-out;
  position: relative;
  height: 100%;

  &:first-of-type {
    margin-top: 80px;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }

  & img {
    min-width: 60px;
  }
  &.current {
    border-bottom: 2px solid var(--navLinkUnderlineActiveColor);
    & :hover {
      &::before {
        visibility: hidden;
      }
    }
  }
  /* &:last-of-type {
    margin: 0;
  } */
  & :hover {
    color: ${props => (props.invert ? props.theme.portfolio.bg : props.colour)};
    &::before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  @media (min-width: ${mobileStyleScreenWidth}px) {
    height: auto;
    margin: 0 2rem 0 0;
    &:first-of-type {
      margin-top: 0px;
    }
  }
`;

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
  color: var(--titleColor);
  border-radius: 1000px;
  padding: 8px 12px;

  & :hover {
    color: var(--grey3);
  }

  & svg {
    width: 12%;
    height: auto;
  }

  @media (min-width: ${mobileStyleScreenWidth}px) {
    justify-content: flex-start;
  }
`;

const MobileIcon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: var(--navLinkColor);
  @media (min-width: ${mobileStyleScreenWidth}px) {
    display: none;
  }
`;

const MobileNav = styled.div`
  display: none;

  &.open {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-rows: 2fr 1fr;
    position: fixed;
    top: 80px;
    bottom: 0;
    z-index: 999;
    overflow-y: scroll;
    overflow-x: hidden;
    background: var(--background);

    width: 100%;
  }

  @media (min-width: ${mobileStyleScreenWidth}px) {
    overflow-y: auto;
    height: inherit;
    width: auto;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
  }
`;

const Header = ({
  location,
  siteTitle,
  isDark,
  toggleDark,
  socialColour,
  invertSocial,
}) => {
  const [open, setOpen] = useState(false);

  const { width } = useWindowSize();

  useEffect(() => {
    if (width !== undefined && width > mobileStyleScreenWidth) {
      setOpen(false);
    }
  }, [width]);

  const handleMenuButtonClick = () => {
    if (width && width !== undefined && width > mobileStyleScreenWidth) {
      return;
    }

    if (!open) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    }

    setOpen(!open);
  };

  const handleLinkClick = () => {
    if (width && width !== undefined && width > mobileStyleScreenWidth) {
      return;
    }

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
  };

  return (
    <HeaderStyles>
      <nav className={open ? "open" : ""}>
        <SiteTitle to="/" fontWeight="bold">
          {location?.pathname === "/" ? null : <Fox />}
          {siteTitle}
        </SiteTitle>
        <MobileIcon>
          <Hamburger toggled={open} toggle={handleMenuButtonClick} />
        </MobileIcon>
        <MobileNav className={open ? "open" : ""}>
          <NavGroup>
            <NavLink
              to="/portfolio"
              activeClassName="current"
              colour={socialColour}
              partiallyActive={true}
              onClick={handleLinkClick}
              invert={invertSocial}
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/blog"
              activeClassName="current"
              colour={socialColour}
              partiallyActive={true}
              onClick={handleLinkClick}
              invert={invertSocial}
            >
              Blog
            </NavLink>
            <NavLink
              to="/about"
              activeClassName="current"
              colour={socialColour}
              onClick={handleLinkClick}
              invert={invertSocial}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              activeClassName="current"
              colour={socialColour}
              onClick={handleLinkClick}
              invert={invertSocial}
            >
              Contact
            </NavLink>
          </NavGroup>
          <NavGroup>
            <Social />
          </NavGroup>
          <NavGroup>
            <DarkModeButton onClick={toggleDark}>
              {isDark ? <FiMoon /> : <FiSun />}
            </DarkModeButton>
          </NavGroup>
        </MobileNav>
      </nav>
    </HeaderStyles>
  );
};

const DarkModeButton = styled.button`
  border: none;
  background: none;
  color: var(--linkColor);

  &:hover {
    color: var(--textColor);
  }

  &:focus {
    outline: none;
  }
`;

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
