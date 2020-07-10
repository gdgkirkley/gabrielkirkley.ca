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
import JavascriptLogo from "../../images/javascript-logo.svg"
import RLogo from "../../images/r-logo.svg"
import Button from "../components/button"
import Card from "../components/card"
import useExamples from "../hooks/useExamples"

const PortfolioBlock = styled.div`
  padding: 20px 0px;
`

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
  border-top: 1px solid ${props => props.theme.grey10};
  width: 100%;
`

const Portfolio = () => {
  const examples = useExamples()

  return (
    <Layout colour={"portfolio"} invert={true}>
      <main>
        <PortfolioBlock>
          <PortfolioTitle>
            <PortfolioTitleDecorator />
            <h2>Projects</h2>
            <PortfolioTitleDecorator />
          </PortfolioTitle>
          <PortfolioContent columns={2} rows={2}>
            {examples.map(example => {
              if (example.type !== "project") return null
              return (
                <Card
                  key={example.title}
                  image={example.image}
                  title={example.title}
                  description={example.excerpt}
                  url={example.slug}
                />
              )
            })}
          </PortfolioContent>
        </PortfolioBlock>
        <PortfolioBlock>
          <PortfolioTitle>
            <PortfolioTitleDecorator />
            <h2>Coding Challenges</h2>
            <PortfolioTitleDecorator />
          </PortfolioTitle>
          <PortfolioContent columns={3} rows={1}>
            {examples.map(example => {
              if (example.type !== "challenge") return null
              return (
                <Card
                  key={example.title}
                  image={example.image}
                  title={example.title}
                  description={example.excerpt}
                  url={example.slug}
                />
              )
            })}
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
              <JavascriptLogo />
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
              <RLogo />
              <h3>R</h3>
            </div>
          </PortfolioContent>
        </PortfolioBlock>
      </main>
    </Layout>
  )
}

export default Portfolio
