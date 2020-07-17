import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import ReactLogo from "../../images/react-icon.svg";
import NodeJS from "../../images/node.js_logo.svg";
import PostgreSQL from "../../images/postgresql_elephant.svg";
import Java from "../../images/java_logo.svg";
import CSS from "../../images/CSS3_logo.svg";
import HTML5 from "../../images/HTML5_logo.svg";
import JavascriptLogo from "../../images/javascript-logo.svg";
import RLogo from "../../images/r-logo.svg";
import Card from "../components/card";
import useExamples from "../hooks/useExamples";
import SEO from "../components/seo";

const PortfolioBlock = styled.div`
  padding: 20px 0px;
`;

const PortfolioContent = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  @media (min-width: 768px) {
  }
`;

const PortfolioTech = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  & svg {
    width: 50%;
    transition: all 0.4s ease-in-out;
    filter: grayscale(1);

    &:hover {
      filter: grayscale(0);
      transform: scale(1.1);
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

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
`;

const PortfolioTitleDecorator = styled.div`
  border-top: 1px solid ${props => props.theme.grey10};
  width: 100%;
`;

const Portfolio = () => {
  const examples = useExamples();

  return (
    <Layout colour={"portfolio"} invert={true}>
      <SEO title="Portfolio" />
      <main>
        <PortfolioBlock>
          <PortfolioTitle>
            <PortfolioTitleDecorator />
            <h2>Projects</h2>
            <PortfolioTitleDecorator />
          </PortfolioTitle>
          <PortfolioContent columns={2} rows={2}>
            {examples.map(example => {
              if (example.type !== "project") return null;
              return (
                <Card
                  key={example.title}
                  image={example.image}
                  title={example.title}
                  description={example.excerpt}
                  url={example.slug}
                  source={example.source}
                />
              );
            })}
          </PortfolioContent>
        </PortfolioBlock>
        <PortfolioBlock>
          <PortfolioTitle>
            <PortfolioTitleDecorator />
            <h2>Challenges</h2>
            <PortfolioTitleDecorator />
          </PortfolioTitle>
          <PortfolioContent columns={3} rows={1}>
            {examples.map(example => {
              if (example.type !== "challenge") return null;
              return (
                <Card
                  key={example.title}
                  image={example.image}
                  title={example.title}
                  description={example.excerpt}
                  url={example.slug}
                  source={example.source}
                />
              );
            })}
          </PortfolioContent>
        </PortfolioBlock>
        <PortfolioBlock>
          <PortfolioTitle>
            <PortfolioTitleDecorator />
            <h2>Technical Expertise</h2>
            <PortfolioTitleDecorator />
          </PortfolioTitle>
          <PortfolioTech>
            <div>
              <JavascriptLogo />
              <p>Javascript</p>
            </div>
            <div>
              <ReactLogo />
              <p>React</p>
            </div>
            <div>
              <NodeJS />
              <p>NodeJS</p>
            </div>
            <div>
              <PostgreSQL />
              <p>PostgreSQL</p>
            </div>
            <div>
              <Java />
              <p>Java</p>
            </div>
            <div>
              <HTML5 />
              <p>HTML5</p>
            </div>
            <div>
              <CSS />
              <p>CSS</p>
            </div>
            <div>
              <RLogo />
              <p>R</p>
            </div>
          </PortfolioTech>
        </PortfolioBlock>
      </main>
    </Layout>
  );
};

export default Portfolio;
