import React from "react";
import styled from "styled-components";

export const ButtonStyles = styled.button`
  display: inline-flex;
  background-color: var(--bgColour);
  border: 2px solid var(--bgColour);
  justify-content: center;
  align-items: center;
  font-size: var(--fontSize-emphasis);
  line-height: 1;
  cursor: pointer;
  user-select: none;
  padding: 1.6rem 3.2rem;
  text-decoration: none;
  color: var(--fontColour);
  position: relative;
  box-shadow: var(--level-2);
  border-radius: 0.25rem;
  transition: 0.2s linear;

  &:hover {
    background: var(--fontColour);
    color: var(--bgColour);
  }

  & svg {
    width: var(--fontSize-information);
    margin: 0;
    margin-left: 16px;
  }

  &.grey {
    border: none;
    color: #999;
    background-color: #fff;
    &:hover {
      background-color: #fff;
      color: #222;
    }
  }

  &:disabled {
    color: #999;
    border-color: #999;
    &:hover {
      background-color: #fff;
      color: #999;
      cursor: initial;
    }
  }
`;

const Button = ({
  classes = "",
  onClick,
  name,
  type,
  disabled,
  id,
  buttonText,
  children,
  fontColour = "white",
  bgColour = "buttonColor",
  style = {},
  ...rest
}) => {
  return (
    <ButtonStyles
      className={`Button ${classes}`}
      onClick={onClick}
      name={name}
      type={type || "button"}
      disabled={disabled}
      id={id}
      style={{
        "--fontColour": `var(--${fontColour})`,
        "--bgColour": `var(--${bgColour})`,
      }}
      {...rest}
    >
      {children}
    </ButtonStyles>
  );
};

export default Button;
