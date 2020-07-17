import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/button";
import { RightArrow } from "../components/icons";

const MainTitle = styled.h1`
  font-weight: 800;
  text-align: center;
  margin-bottom: 0px;
`;

const Title = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    & h3 {
      max-width: 54%;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  height: 100%;
`;

const IndexPage = () => {
  return (
    <Layout colour="home">
      <main>
        <SEO title="Home" />
        <Content>
          <Title>
            <MainTitle>Hi, I'm Gabe!</MainTitle>
            <h3>
              I'm a creative software developer building websites, applications,
              and games with HTML, CSS, JS, and React.
            </h3>
            <Link to="/portfolio">
              <Button>
                See my portfolio <RightArrow />
              </Button>
            </Link>
          </Title>
        </Content>
      </main>
    </Layout>
  );
};

export default IndexPage;
