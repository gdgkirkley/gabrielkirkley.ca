import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import useSiteMetadata from "../hooks/useSiteMetadata";

import Inter300Woff from "../../fonts/inter-v2-latin-300.woff";
import Inter300Woff2 from "../../fonts/inter-v2-latin-300.woff2";
import InterRegularWoff from "../../fonts/inter-v2-latin-regular.woff";
import InterRegularWoff2 from "../../fonts/inter-v2-latin-regular.woff2";
import Inter600Woff from "../../fonts/inter-v2-latin-600.woff";
import Inter600Woff2 from "../../fonts/inter-v2-latin-600.woff2";
import Inter800Woff from "../../fonts/inter-v2-latin-800.woff";
import Inter800Woff2 from "../../fonts/inter-v2-latin-800.woff2";

import Header from "./header";
import CodeBlock from "../components/codeblock";

const theme = {
  home: { bg: "#BE4242" },
  portfolio: {
    bg: "#45A9DE",
    a: "#222222",
  },
  blog: { bg: "#F6F6F6", a: "#3a13d6" },
  about: { bg: "#BE4242", a: "#fff" },
  contact: { bg: "#FFE263" },
  primary1: "#231c42", // Updated
  primary2: "#200A5C",
  primary3: "#52419C", // Updated
  primary4: "#4A29A3",
  primary5: "#866BFF", // Updated
  primary6: "#7D5CD6",
  primary7: "#9A7DE8",
  primary8: "#866BFF", // Updated
  primary9: "#DBCFFC",
  primary10: "#FBDADE", // Updated
  accent1: "#8EC9BB", // Updated
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
  maxWidth: "900px",
  gridGap: "24px",
  bs: "0 12px 24px 0 rgba(0,0,0,0.09)",
  borderRadius: "4px",
};

const GlobalStyle = createGlobalStyle`
    /* inter-300 - latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 300;
      src: local(''),
          url(${Inter300Woff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
          url(${Inter300Woff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* inter-regular - latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      src: local(''),
          url(${InterRegularWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
          url(${InterRegularWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* inter-600 - latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      src: local(''),
          url(${Inter600Woff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
          url(${Inter600Woff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* inter-800 - latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 800;
      src: local(''),
          url(${Inter800Woff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
          url(${Inter800Woff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
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
        color: ${theme.grey10};
        line-height: 1.5;
        font-family: "Inter", Arial, Helvetica, sans-serif;
        font-weight: 400;
        min-height: 100vh;
        background: #231c42;
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
    nav {
      a {
        color: ${theme.grey3};
      }
    }
    a {
        text-decoration: none;
        color: ${theme.grey8};
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: "Inter", Arial, Helvetica, sans-serif;
      font-weight: 800;
      color: ${theme.grey10};
      & * {
          margin-top: 0.5rem;
      }
    }
    h1 {
      font-size: ${theme.fontSize.title}
    }
    h2 {
      font-size: ${theme.fontSize.subHeading}
    }
    strong {
        color: ${theme.grey2};
        font-weight: 600;
    }
    main {
        margin: 2rem auto 4rem;
        max-width: 90vw;
        width: ${theme.maxWidth};
        z-index: 2;
    }
    footer {
      text-align: center;
      color: ${props => props.theme.grey8};
      padding: 20px 0px;
      font-weight: 300;
    }
    code {
      padding: 2px 4px;
      background: #f4f3fa;
      color: ${theme.blog.a};
      border-radius: 3px;
    }
    pre {
      background-color: #061526;
      border-radius: 4px;
      font-size: 16px;
      padding: 10px;
      overflow-x: auto;
      /* Track */
      ::-webkit-scrollbar {
        width: 100%;
        height: 5px;
        border-radius: 0 0 5px 5px;
      }
      ::-webkit-scrollbar-track {
        background: #061526;
        border-radius: 0 0 4px 4px;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
      }
    }
    .highlight-line {
      background-color: rgba(201, 167, 255, 0.2);
      margin: 0 -10px;
      padding: 0 5px;
      border-left: 5px solid #c9a7ff;
    }
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  flex: 1 1 auto;
  overflow: hidden;
  z-index: 1;
  background: ${props => props.colour};
  color: ${props => (props.invert ? props.theme.grey1 : "inherit")};
  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${props => (props.invert ? props.theme.grey1 : "inherit")};
  }
  & a {
    color: ${props => props.link};
  }
`;

const components = {
  code: CodeBlock,
};

const Layout = ({ children, colour = "none", invert = false }) => {
  const { title, description } = useSiteMetadata();

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Page>
        <Header
          siteTitle={title}
          theme={theme}
          socialColour={theme[colour].bg}
          invertSocial={invert}
        />
        <Wrapper
          colour={theme[colour].bg}
          invert={invert}
          link={theme[colour].a}
        >
          <MDXProvider components={components}>{children}</MDXProvider>
        </Wrapper>
        <footer>© {new Date().getFullYear()}, Gabe Kirkley</footer>
      </Page>
      <GlobalStyle />
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
