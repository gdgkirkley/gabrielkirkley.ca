import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const TechSkill = ({ skill }) => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)

  const [image] = data.allImageSharp.edges.filter(edge => {
    return edge.node.fluid.src.includes(skill.image)
  })

  return (
    <div>
      {image?.node.fluid && <Img fluid={image?.node.fluid} alt={skill.title} />}
      <p>{skill.title}</p>
    </div>
  )
}

export default TechSkill
