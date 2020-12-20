import React from "react";
import { animated } from "react-spring";
import useBoop from "../hooks/useBoop";

// Using an awesome tutorial from Josh W. Comeau
// Head to https://www.joshwcomeau.com/react/boop/ to check it out

const Boop = ({ children, ...boopConfig }) => {
  const [style, trigger] = useBoop(boopConfig);

  return (
    <animated.span onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
};

export default Boop;
