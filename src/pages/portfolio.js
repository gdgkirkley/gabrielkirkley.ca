import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import TechSkill from "../components/techskill"
import { technicalSkills } from "../data/portfolio"

const PortfolioBlock = styled.div``

const PortfolioContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: ${props => {
      let columns = ""
      for (let i = 0; i < props.columns; i++) {
        columns += "1fr "
      }
      return columns
    }};
  }
`

const PortfolioTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr;

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
  return (
    <Layout>
      <PortfolioBlock>
        <PortfolioTitle>
          <PortfolioTitleDecorator />
          <h2>Web</h2>
          <PortfolioTitleDecorator />
        </PortfolioTitle>
        <PortfolioContent columns={2}>
          <h3>Digital Edition</h3>
          <div>
            <h3>Scheduling App</h3>
            <h3>Secondary Characters</h3>
            <h3>Cast My Show</h3>
          </div>
        </PortfolioContent>
      </PortfolioBlock>
      <PortfolioBlock>
        <PortfolioTitle>
          <PortfolioTitleDecorator />
          <h2>Technical Expertise</h2>
          <PortfolioTitleDecorator />
        </PortfolioTitle>
        <PortfolioContent columns={5}>
          {technicalSkills.map(skill => (
            <TechSkill key={skill.title} skill={skill} />
          ))}
        </PortfolioContent>
      </PortfolioBlock>
    </Layout>
  )
}

export default Portfolio
