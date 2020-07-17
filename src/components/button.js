import React from "react";
import styled from "styled-components";

export const ButtonStyles = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.fontSize.emphasis};
  line-height: 1;
  cursor: pointer;
  user-select: none;
  padding: 16px 32px;
  text-decoration: none;
  color: ${props =>
    props.fontColour ? props.fontColour : props.theme.grey3} !important;
  border: none;
  background-color: transparent;
  position: relative;

  & svg {
    width: ${props => props.theme.fontSize.information};
    margin: 0;
    margin-left: 16px;
  }

  &::after {
    content: "";
    padding: 16px 32px;
    transition: 0.5s all;
    background-color: ${props => (props.bgColour ? props.bgColour : "#fff")};
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
    border-radius: 4px;
    z-index: -1;
  }

  &:hover {
    &::after {
      transform: scale(1.1);
    }
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
  classes,
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
