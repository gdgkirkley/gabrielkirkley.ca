import React from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";

const LineNumber = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`;

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, "") : "";
  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => {
            return (
              <div key={i} {...getLineProps({ line, key: i })}>
                <LineNumber>{i + 1}</LineNumber>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
