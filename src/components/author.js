import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

const AuthorBox = styled.div`
  margin: 20px 0px;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid ${props => props.theme.grey8};
  padding: 20px 0px;
  align-items: center;
  justify-content: center;
  width: 100%;

  & .gatsby-image-wrapper {
    width: 160px;
    height: 160px;
    border-radius: 1000px;
    justify-self: center;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2.5fr;

    & .gatsby-image-wrapper {
      width: 160px;
      height: 160px;
      border-radius: 1000px;
    }
  }
`;

const Author = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "Gabe-Headshotbw.jpg" }) {
        sharp: childImageSharp {
          fluid(quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <AuthorBox>
      <Img fluid={image.sharp.fluid} alt="Gabe Kirkley" />
      <div>
        <h3>Gabe Kirkley</h3>
        <p>
          Gabe is a software developer from Vancouver, B.C. I make websites with
          React, but I'm also into data analysis, REST/GraphQL APIs and database
          schemas.
        </p>
      </div>
    </AuthorBox>
  );
};

export default Author;
