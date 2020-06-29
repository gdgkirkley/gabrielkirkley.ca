import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import GIFPlayer from "react-gif-player"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactLogo from "../../images/react-icon.svg"
import NodeJS from "../../images/node.js_logo.svg"
import PostgreSQL from "../../images/postgresql_elephant.svg"
import Java from "../../images/java_logo.svg"
import CSS from "../../images/CSS3_logo.svg"
import HTML5 from "../../images/HTML5_logo.svg"

const PortfolioBlock = styled.div``

const PortfolioContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  text-align: center;

  & svg {
    width: 220px;
    height: 236px;
  }

  @media (min-width: 768px) {
    grid-template-columns: ${props => {
      let columns = ""
      for (let i = 0; i < props.columns; i++) {
        columns += "1fr "
      }
      return columns
    }};
    grid-gap: 24px;
  }
`

const PortfolioFeature = styled.div`
  & img {
    max-width: 400px;
  }
`

const PortfolioTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 20px;

  & h2 {
    margin: 10px 0px;
    text-align: center;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;

    & h2 {
      margin: 0px;
    }
  }
`

const PortfolioTitleDecorator = styled.div`
  border-top: 1px solid ${props => props.theme.accent5};
  width: 100%;
`

const Portfolio = () => {
  const {
    image1,
    image2,
    digitalGIF,
    castmyshowGIF,
    secondaryCharGIF,
  } = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "600px-JavaScript-logo.png" }) {
        sharp: childImageSharp {
          fluid(quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      image2: file(relativePath: { eq: "Rlogo.png" }) {
        sharp: childImageSharp {
          fluid(quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      digitalGIF: allFile(
        filter: { publicURL: { regex: "/digitaledition/" } }
      ) {
        edges {
          node {
            publicURL
          }
        }
      }
      castmyshowGIF: allFile(filter: { publicURL: { regex: "/castmyshow/" } }) {
        edges {
          node {
            publicURL
          }
        }
      }
      secondaryCharGIF: allFile(
        filter: { publicURL: { regex: "/secondarycharacters/" } }
      ) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <PortfolioBlock>
        <PortfolioTitle>
          <PortfolioTitleDecorator />
          <h2>Web</h2>
          <PortfolioTitleDecorator />
        </PortfolioTitle>
        <PortfolioContent columns={2}>
          <PortfolioFeature>
            <GIFPlayer
              gif={digitalGIF.edges[0].node.publicURL}
              still={digitalGIF.edges[1].node.publicURL}
            />
            <h3>Digital Edition</h3>
          </PortfolioFeature>

          <PortfolioFeature>
            <GIFPlayer
              gif={secondaryCharGIF.edges[1].node.publicURL}
              still={secondaryCharGIF.edges[2].node.publicURL}
            />
            <h3>Secondary Characters</h3>
          </PortfolioFeature>
          <h3>Staff Scheduling App</h3>
          <PortfolioFeature>
            <GIFPlayer
              gif={castmyshowGIF.edges[0].node.publicURL}
              still={castmyshowGIF.edges[1].node.publicURL}
            />
            <h3>Cast My Show</h3>
          </PortfolioFeature>
        </PortfolioContent>
      </PortfolioBlock>
      <PortfolioBlock>
        <PortfolioTitle>
          <PortfolioTitleDecorator />
          <h2>Technical Expertise</h2>
          <PortfolioTitleDecorator />
        </PortfolioTitle>
        <PortfolioContent columns={3}>
          <div>
            <Img fluid={image1.sharp.fluid} alt="Javascript" />
            <h3>Javascript</h3>
          </div>
          <div>
            <ReactLogo />
            <h3>React</h3>
          </div>
          <div>
            <NodeJS />
            <h3>NodeJS</h3>
          </div>
          <div>
            <PostgreSQL />
            <h3>PostgreSQL</h3>
          </div>
          <div>
            <Java />
            <h3>Java</h3>
          </div>
          <div>
            <HTML5 />
            <h3>HTML5</h3>
          </div>
          <div>
            <CSS />
            <h3>CSS</h3>
          </div>
          <div>
            <Img fluid={image2.sharp.fluid} alt="R" />
            <h3>R</h3>
          </div>
        </PortfolioContent>
      </PortfolioBlock>
    </Layout>
  )
}

export default Portfolio
