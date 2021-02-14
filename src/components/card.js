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
  border-radius: 4px;
  border: 3px solid white;
  position: relative;
  overflow: hidden;
  background-color: var(--background);
  z-index: 0;
  height: 100%;
  margin-top: 10px;
  box-shadow: var(--level-3);
`;

const CardContainer = styled.div`
  width: 400px;
  height: 100%;
  transition: 0.4s linear;
`;

const CardContent = styled.div`
  padding: 16px 16px;

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
              <Button as="a" onClick={handleSourceClick} bgColour="primary1">
                Code <Source />
              </Button>
            ) : (
              <SourceUnavailable>
                Source Unavailable <Source />
              </SourceUnavailable>
            )}
            <Button bgColour="primary5" fontColour="white">
              View
            </Button>
          </Columns>
        </CardContent>
      </CardContainer>
    </CardLink>
  );
};

export default Card;
