import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import ReactLogo from "../../images/react-icon.svg"
import NodeJS from "../../images/node.js_logo.svg"
import PostgreSQL from "../../images/postgresql_elephant.svg"
import Java from "../../images/java_logo.svg"
import CSS from "../../images/CSS3_logo.svg"
import HTML5 from "../../images/HTML5_logo.svg"
import Button from "../components/button"

const PortfolioBlock = styled.div``

const PortfolioContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, 400px);
  row-gap: 24px;
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
    grid-template-rows: ${props => {
      return "repeat(" + props.rows + ", 400px)"
    }};
  }
`

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  padding: 20px;
  opacity: 0;
  transition: 0.1s linear;
  display: grid;
  justify-content: center;
  align-items: center;

  & h3 {
    margin: 0;
  }
`

const Title = styled.h3`
  opacity: 1;
  transition: 0.1s linear;
`

const PortfolioFeatureBlock = styled(Link)`
  display: grid;
  grid-template-rows: 4fr 1fr;
  transition: 0.1s linear;
  border-radius: 4px;
  border: 3px solid white;

  & ${Overlay} {
    opacity: 0;
  }

  & ${Title} {
    opacity: 1;
  }

  & :hover,
  :focus,
  :focus-within {
    border: 3px solid ${props => props.theme.accent5};
    & ${Overlay} {
      opacity: 1;
    }
    & ${Title} {
      opacity: 0;
    }
  }
`

const PortfolioFeature = styled.div`
  width: 100%;
  height: 100%;
  background: url(${props => props.background}) center center/cover;
  transition: 0.4s linear;
`

const PortfolioTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 20px 0px;

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
    schedulingapp,
    castmyshowGIF,
    secondaryCharGIF,
    dice,
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
      schedulingapp: allFile(
        filter: { publicURL: { regex: "/schedulingapp/" } }
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
      dice: allFile(filter: { publicURL: { regex: "/dice/" } }) {
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
          <h2>Projects</h2>
          <PortfolioTitleDecorator />
        </PortfolioTitle>
        <PortfolioContent columns={2} rows={2}>
          <PortfolioFeatureBlock to="digitaledition">
            <PortfolioFeature background={digitalGIF.edges[0].node.publicURL}>
              <Overlay>
                <div>
                  <h3>Arts Club: Digital Edition</h3>
                  <p>React, NodeJS, PostgreSQL</p>
                </div>
                <Button>Learn more</Button>
              </Overlay>
            </PortfolioFeature>
            <Title>Arts Club: Digital Edition</Title>
          </PortfolioFeatureBlock>
          <PortfolioFeatureBlock to="secondarycharacters">
            <PortfolioFeature
              background={secondaryCharGIF.edges[0].node.publicURL}
            >
              <Overlay>
                <div>
                  <h3>Secondary Characters</h3>
                  <p>Gatsby, NetlifyCMS</p>
                </div>
                <Button>Learn more</Button>
              </Overlay>
            </PortfolioFeature>
            <Title>Secondary Characters</Title>
          </PortfolioFeatureBlock>
          <PortfolioFeatureBlock to="castmyshow">
            <PortfolioFeature
              background={castmyshowGIF.edges[1].node.publicURL}
            >
              <Overlay>
                <div>
                  <h3>Cast My Show</h3>
                  <p>React, Firebase</p>
                </div>
                <Button>Learn more</Button>
              </Overlay>
            </PortfolioFeature>
            <Title>Cast My Show</Title>
          </PortfolioFeatureBlock>
          <PortfolioFeatureBlock to="staffscheduling">
            <PortfolioFeature
              background={schedulingapp.edges[0].node.publicURL}
            >
              <Overlay>
                <div>
                  <h3>Staff Shift Scheduling Application</h3>
                  <p>React, NodeJS, PostgreSQL</p>
                </div>
                <Button>Learn more</Button>
              </Overlay>
            </PortfolioFeature>
            <Title>Staff Shift Scheduling Application</Title>
          </PortfolioFeatureBlock>
        </PortfolioContent>
      </PortfolioBlock>
      <PortfolioBlock>
        <PortfolioTitle>
          <PortfolioTitleDecorator />
          <h2>Coding Challenges</h2>
          <PortfolioTitleDecorator />
        </PortfolioTitle>
        <PortfolioContent columns={3} rows={1}>
          <PortfolioFeatureBlock to="skunkgame">
            <img src={dice.edges[0].node.publicURL} width="100%" />
            <h3>SKUNK Game</h3>
          </PortfolioFeatureBlock>
          <div>Coming soon</div>
          <div>Coming soon</div>
        </PortfolioContent>
      </PortfolioBlock>
      <PortfolioBlock>
        <PortfolioTitle>
          <PortfolioTitleDecorator />
          <h2>Technical Expertise</h2>
          <PortfolioTitleDecorator />
        </PortfolioTitle>
        <PortfolioContent columns={3} rows={3}>
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
