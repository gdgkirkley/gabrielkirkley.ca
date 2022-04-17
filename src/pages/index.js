import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Button from "../components/button";
import Columns from "../components/columns";
import Fox from "../../images/gk-fox.svg";

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <main>
        <SEO title="Home" />
        <Content>
          <Title>
            <MainTitle>Gabe Kirkley</MainTitle>

            <p style={{ color: "var(--primary5)" }}>
              Creative Software Developer
            </p>

            <Fox />
            <p>
              Writing Go, Scala/Java, and Typescript these days. Working at{" "}
              <a
                href="https://bench.co/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Bench Accounting.
              </a>{" "}
              Learning more about DevOps and cloud architecture.
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
            <Button as={Link} to="/portfolio">
              See my portfolio &rarr;
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

  & svg {
    width: 30%;
    height: auto;
  }
`;

export default IndexPage;
