import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/button";
import Columns from "../components/columns";

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <SEO title="Home" />
        <Content>
          <Title>
            <MainTitle>Gabe Kirkley</MainTitle>
            <p style={{ color: "var(--primary5)" }}>
              Creative Full-Stack Software Developer
            </p>
            <p>
              Using React, Gatsby, Next.js, Node and Java daily. Currently at
              the Arts Club. I love building React applications, front end
              architecture, REST/GraphQL APIs and database schemas.
            </p>
          </Title>
          <Columns
            span={1}
            smSpan={2}
            columnMapping={[2, 1]}
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem auto",
            }}
          >
            <Button as={Link} to="/portfolio" bgColour="primary5">
              See my portfolio
            </Button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/contact">Get in touch</Link>
            </div>
          </Columns>
        </Content>
      </main>
    </Layout>
  );
};

const MainTitle = styled.h1`
  font-weight: 800;
  text-align: center;
  margin-bottom: 0px;
  font-size: var(--fontSize-banner);
`;

const Title = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    & p {
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

export default IndexPage;
