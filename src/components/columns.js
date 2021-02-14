import React from "react";
import styled from "styled-components";

const ColumnStyle = styled.div`
  display: grid;
  grid-template-columns: var(--columns);
  grid-gap: var(--gap);
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    grid-template-columns: var(--columns-md);
  }

  @media (min-width: 1125px) {
    grid-template-columns: var(--columns-md);
  }

  @media (min-width: 1400px) {
    grid-template-columns: var(--columns-lg);
  }
`;

const Columns = ({
  children,
  span = 1,
  smSpan = span,
  mdSpan = smSpan,
  lgSpan = mdSpan,
  gap = "2rem",
  columnMapping = [],
  style = {},
}) => {
  function getUnits(cols) {
    let final = "";
    let count = 0;

    while (count < cols) {
      let fraction;

      if (columnMapping.length && columnMapping.length === cols) {
        fraction = columnMapping[count] + "fr";
      } else {
        fraction = "1fr";
      }

      final += fraction;

      count++;

      if (count !== cols) {
        final += " ";
      }
    }

    return final;
  }

  return (
    <ColumnStyle
      style={{
        "--columns": getUnits(span),
        "--columns-sm": getUnits(smSpan),
        "--columns-md": getUnits(mdSpan),
        "--columns-lg": getUnits(lgSpan),
        "--gap": gap,
        ...style,
      }}
    >
      {children}
    </ColumnStyle>
  );
};

export default Columns;
