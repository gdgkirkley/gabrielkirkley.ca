import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import { RightArrow } from "../components/icons"

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${props => props.theme.gridGap};
  margin-top: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const HeroImage = styled(Img)`
  border-radius: 50px;
`

const MainTitle = styled.h1`
  font-weight: 800;
  text-align: center;
  margin-bottom: 0px;
`

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
`

const MainList = styled.ul`
  border-top: 1px solid ${props => props.theme.grey5};
  border-bottom: 1px solid ${props => props.theme.grey5};
  padding: 20px 0px;
  list-style: none;
  display: grid;
  align-items: center;

  & li {
    padding: 10px 0px;
    line-height: 1.8;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`

const IndexPage = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "churro.jpg" }) {
        sharp: childImageSharp {
          fluid(quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

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
          <MainContent>
            <HeroImage
              fluid={image.sharp.fluid}
              alt="It's me with a churro at Disneyland!"
            />
            <MainList>
              <li>
                <strong>I am</strong> a software developer with 3+ years of
                experience
              </li>
              <li>
                <strong>I love</strong> problem solving, math, coffee, and books
              </li>
              <li>
                <strong>I am interested</strong> in animation, game development,
                performing, and film production
              </li>
              <li>
                <strong>I studied</strong> History, Theatre, and English at the
                University of the Fraser Valley
              </li>
              <li>
                <strong>I would walk 500 miles</strong> for stawberry yogurt
              </li>
            </MainList>
          </MainContent>
        </Content>
      </main>
    </Layout>
  )
}

export default IndexPage
