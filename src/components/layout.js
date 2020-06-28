import React from "react"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import useSiteMetadata from "../hooks/useSiteMetadata"

import Header from "./header"

const theme = {
  primary1: "#FA6E4F", // Updated
  primary2: "#200A5C",
  primary3: "#341782",
  primary4: "#4A29A3",
  primary5: "#FB8E7E", // Updated
  primary6: "#7D5CD6",
  primary7: "#9A7DE8",
  primary8: "#B9A3F5",
  primary9: "#DBCFFC",
  primary10: "#F8CA9D", // Updated
  accent1: "#C5D7C0", // Updated
  accent2: "#651301",
  accent3: "#981C01",
  accent4: "#CA2602",
  accent5: "#C5D7C0", // Updated
  accent6: "#FD5935",
  accent7: "#FE8267",
  accent8: "#FEAC9A",
  accent9: "#FFD5CC",
  accent10: "#FFF3F0",
  grey1: "#222222",
  grey2: "#3B3B3B",
  grey3: "#535353",
  grey4: "#6E6E6E",
  grey5: "#878787",
  grey6: "#A1A1A1",
  grey7: "#BABABA",
  grey8: "#D4D4D4",
  grey9: "#EDEDED",
  grey10: "#F6F6F6",
  warning1: "#610509",
  warning2: "#BD0F16",
  warning3: "#EC131B",
  warning4: "#F47176",
  warning5: "#F9B8BB",
  fontSize: {
    smallPrint: "11px",
    information: "14px",
    reading: "17px",
    emphasis: "21px",
    highLevel: "25px",
    subHeading: "34px",
    title: "42px",
    display: "51px",
    banner: "68px",
  },
  maxWidth: "800px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)",
  borderRadius: "4px",
}

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.8rem;
        color: ${theme.grey1};
        line-height: 1;
        font-family: "Roboto", Arial, Helvetica, sans-serif;
    }
    /* Remove margin for the main div that Gatsby mounts into*/
    > div {
        margin-top: 0;
    }
    svg {
      width: 32px;
      height: 1%;
      margin: 0px 8px;
    }
    a {
        text-decoration: none;
        color: ${theme.primary5};
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: "Roboto Condensed", Arial, Helvetica, sans-serif;
      color: ${theme.primary1};
      & * {
          margin-top: 0.5rem;
      }
    }
    h1 {
      font-size: ${theme.fontSize.title}
    }
    strong {
        color: ${theme.grey3};
    }
    main {
        margin: 2rem auto 4rem;
        max-width: 90vw;
        width: 640px;
    }
`

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Header siteTitle={title} />
      <div>
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}, Gabe Kirkley</footer>
      </div>
      <GlobalStyle />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
