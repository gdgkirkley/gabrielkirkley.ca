import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import Button from "./button";
import Source from "../../images/code-branch-light.svg";

const CardLink = styled(Link)`
  display: flex;
  transition: 0.1s linear;
  border-radius: 4px;
  border: 3px solid white;
  position: relative;
  overflow: hidden;
  background-color: #f2f8f9;
  z-index: 0;
  height: 100%;
  margin-top: 10px;
`;
const CardContainer = styled.div`
  width: 400px;
  height: 100%;
  background: url(${props => props.background}) center center/cover;
  transition: 0.4s linear;
`;

const CardContent = styled.div`
  padding: 16px 16px;
`;

const CardButtons = styled.div`
  display: grid;
  grid-gap: 16px;
  margin: 0px 10px;
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

          <CardButtons>
            <Button>See More</Button>
            {source ? (
              <Button
                as="a"
                onClick={handleSourceClick}
                bgColour={"#866BFF"}
                fontColour={"#fff"}
              >
                View Code <Source />
              </Button>
            ) : (
              <SourceUnavailable>
                Source Unavailable <Source />
              </SourceUnavailable>
            )}
          </CardButtons>
        </CardContent>
      </CardContainer>
    </CardLink>
  );
};

export default Card;
