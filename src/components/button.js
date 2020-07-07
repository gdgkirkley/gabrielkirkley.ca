import React from "react"
import styled from "styled-components"

const ButtonStyles = styled.button`
  display: inline-block;
  font-size: ${props => props.theme.fontSize.emphasis};
  line-height: 1;
  cursor: pointer;
  user-select: none;
  padding: 8px 16px;
  border-radius: 1000px;
  text-decoration: none;
  transition: 0.5s all;
  color: #fff;
  border: none;
  border: 2px solid ${props => props.theme.accent1};
  background-color: ${props => props.theme.accent1};

  &:hover {
    background-color: ${props => props.theme.accent5};
    border: 2px solid ${props => props.theme.accent5};
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
`

const ButtonStylesLink = styled.a`
  display: inline-block;
  text-transform: uppercase;
  font-size: 27px;
  line-height: 1;
  cursor: pointer;
  user-select: none;
  padding: 8px 22px;
  border-radius: 2px;
  text-decoration: none;
  border-bottom: none;
  transition: 0.5s all;
  color: #f23c34;
  border: 2px solid #f23c34;
  background-color: #fff;

  &:hover {
    color: #fff;
    background-color: #f23c34;
    border-bottom: 2px solid #f23c34;
  }

  &:disabled {
    color: #999;
    border-color: #999;
  }
`

const Button = ({
  classes,
  onClick,
  name,
  type,
  disabled,
  id,
  buttonText,
  children,
  href,
  ...rest
}) => {
  if (href) {
    return (
      <ButtonStylesLink
        className={`Button ${classes}`}
        onClick={onClick}
        name={name}
        type={type || "button"}
        disabled={disabled}
        id={id}
        href={href}
        {...rest}
      >
        {children}
      </ButtonStylesLink>
    )
  }

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
  )
}

export default Button
