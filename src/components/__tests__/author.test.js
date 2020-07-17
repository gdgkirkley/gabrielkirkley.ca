import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { useStaticQuery, graphql } from "../../../tests/gatsby";
import Author from "../author";

afterEach(() => {
  cleanup();
});

test("<Author /> renders", () => {
  const data = {
    image: {
      sharp: {
        fluid: {
          base64: "Gabe-Headshotbw.jpg",
          aspectRatio: "Gabe-Headshotbw.jpg",
          src: "Gabe-Headshotbw.jpg",
          srcSet: "Gabe-Headshotbw.jpg",
          sizes: "Gabe-Headshotbw.jpg",
        },
      },
    },
  };

  render(<Author data={data} />);

  expect(screen.getByRole("img")).toBeTruthy();
});
