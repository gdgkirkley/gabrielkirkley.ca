import React, { useEffect } from "react";
import styled from "styled-components";
import { setUpGame } from "./challenges/SKUNK";

const Game = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 10px;
  border: 2px solid #866bff;
  border-radius: 4px;

  & .game-root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  & p {
    margin: 5px 0px;
  }

  & button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
    line-height: 1;
    cursor: pointer;
    user-select: none;
    padding: 16px 32px;
    text-decoration: none;
    color: #535353;
    border: none;
    background-color: transparent;
    position: relative;

    & svg {
      width: 14px;
      margin: 0;
      margin-left: 16px;
    }

    &::after {
      content: "";
      padding: 16px 32px;
      transition: 0.5s all;
      background-color: #fff;
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
  }

  & input,
  textarea {
    width: 100%;
    margin: 8px 0px;
    padding: 16px 24px;
    min-height: 36px;
    border: 1px solid #a1a1a1;
    border-radius: 4px;
    background: #f6f6f6;
    transition: 0.3s linear;
    font-family: "Inter", Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: 17px;
    &:hover,
    :focus {
      border: 1px solid #535353;
      background: white;
    }
    &:focus {
      outline: none;
    }
  }
`;
// consider improving with https://codesandbox.io/s/xjk3xqnprw?file=/styles.css:274-4246

const SkunkGame = () => {
  useEffect(() => {
    setUpGame();
  }, []);

  return <Game id="game" />;
};

export default SkunkGame;
