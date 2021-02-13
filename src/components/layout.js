import * as React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import useSiteMetadata from "../hooks/useSiteMetadata";

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
    :root {
      --grey1: #222222;
      --grey2: #3B3B3B;
      --grey3: #535353;
      --grey4: #6E6E6E;
      --grey5: #878787;
      --grey6: #A1A1A1;
      --grey7: #BABABA;
      --grey8: #D4D4D4;
      --grey9: #EDEDED;
      --grey10: #F6F6F6;

      --primary1: #0a2540;
      --primary2: #200A5C;
      --primary3: #52419C;
      --primary5: #635bff;
      --primary9: #DBCFFC;

      --highlight: #02bcf5;
      --highlight2: #0073e6;
      --highlight3: #003ab9;
      --highlight4: #002c59;

      --accent: #BE4242;

      --white: #fff;

      --linkColor: #3a13d6;
      --titleColor: var(--primary1);
      --textColor: #425466;
      --buttonColor: var(--primary5);

      --level-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      --level-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --level-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --level-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

      --fontSize-smallPrint: "11px";
      --fontSize-information: 14px;
      --fontSize-reading: 17px;
      --fontSize-emphasis: 21px;
      --fontSize-highLevel: 25px;
      --fontSize-subHeading: 34px;
      --fontSize-title: 42px;
      --fontSize-display: 51px;
      --fontSize-banner: 68px;
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
        color: var(--textColor);
        line-height: 1.5;
        font-family: "Inter", Arial, Helvetica, sans-serif;
        font-weight: 400;
        min-height: 100vh;
        background: var(--grey10);
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
        color: var(--linkColor);
    }
    nav {
      a {
        --linkColor: var(--grey3);
      }
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: "Inter", Arial, Helvetica, sans-serif;
      font-weight: 800;
      color: var(--titleColor);
      & * {
          margin-top: 0.5rem;
      }
    }
    h1 {
      font-size: var(--fontSize-title)
    }
    h2 {
      font-size: var(--fontSize-subHeading)
    }
    strong {
        color: var(--grey2);
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
      color: var(--grey10);
      background: var(--primary1);
      padding: 20px 0px;
      font-weight: 300;
    }
    code {
      padding: 2px 4px;
      background: var(--grey10);
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
    .visually-hidden {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
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
  background: var(--grey10);
`;

const components = {
  code: CodeBlock,
};

const Layout = ({ children, location, colour = "none", invert = false }) => {
  const { title, description } = useSiteMetadata();

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Page>
        <Header siteTitle={title} location={location} />
        <Wrapper>
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
