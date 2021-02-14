import React from "react";
import styled from "styled-components";

export const ButtonStyles = styled.button`
  display: inline-flex;
  background-color: var(--buttonColor);
  border: 2px solid var(--buttonBorderColor);
  justify-content: center;
  align-items: center;
  font-size: var(--fontSize-emphasis);
  line-height: 1;
  cursor: pointer;
  user-select: none;
  padding: 1.6rem 3.2rem;
  text-decoration: none;
  color: var(--buttonTextColor);
  position: relative;
  box-shadow: var(--level-2);
  border-radius: 1rem;
  transition: 0.2s linear;

  &:hover {
    background: var(--buttonHoverColor);
    color: var(--buttonHoverTextColor);
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
      {...rest}
    >
      {children}
    </ButtonStyles>
  );
};

export default Button;
