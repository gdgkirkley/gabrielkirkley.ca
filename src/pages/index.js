import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${props => props.theme.gridGap};

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`

const MainTitle = styled.h1`
  text-align: center;
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
    <Layout>
      <SEO title="Home" />
      <MainTitle>Hi, I'm Gabe!</MainTitle>
      <MainContent>
        <div>
          <Img
            fluid={image.sharp.fluid}
            alt="It's me with a churro at Disneyland!"
          />
        </div>
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
    </Layout>
  )
}

export default IndexPage
