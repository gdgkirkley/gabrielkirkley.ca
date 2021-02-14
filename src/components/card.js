import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import Button from "./button";
import Source from "../../images/code-branch-light.svg";
import Columns from "./columns";

const CardLink = styled(Link)`
  --linkColor: var(--textColor);
  display: flex;
  transition: 0.1s linear;
  border: 2px solid var(--background);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  background-color: var(--background);
  z-index: 0;
  height: 100%;
  /* margin-top: 4rem; */
  box-shadow: var(--level-3);
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  justify-self: center;
  max-width: 400px;

  &:nth-of-type(1) {
    margin-top: 0;
  }
`;

const CardContainer = styled.div`
  width: 400px;
  height: 100%;
  transition: 0.4s linear;
  padding-bottom: 1rem;
`;

const CardContent = styled.div`
  display: grid;
  grid-gap: 2rem;
  padding: 2rem;

  & h3 {
    font-size: var(--fontSize-highLevel);
  }
`;

export const SourceUnavailable = styled.p`
  font-size: ${props => props.theme.fontSize.information};
  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const Card = ({ image, title, description, url, source }) => {
  const handleSourceClick = e => {
    e.preventDefault();
    window.open(source, "_blank");
  };

  return (
    <CardLink to={url}>
      <CardContainer>
        {image && <Img fluid={image.sharp.fluid} />}
        <CardContent>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>

          <Columns span={2}>
            {source ? (
              <Button as="a" onClick={handleSourceClick}>
                Code <Source />
              </Button>
            ) : (
              <SourceUnavailable>
                Source Unavailable <Source />
              </SourceUnavailable>
            )}
            <Button>View &rarr;</Button>
          </Columns>
        </CardContent>
      </CardContainer>
    </CardLink>
  );
};

export default Card;
