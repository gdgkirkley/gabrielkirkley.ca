import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import Button from "../../components/button"
import { setUpGame } from "../../components/skunkgame/SKUNK"

const SkunkGame = () => {
  const handleClick = e => {
    setUpGame()
  }

  return (
    <Layout>
      <h1>Java SKUNK game</h1>
      <p>
        This is a console game written in Java which was built for BCIT's
        Introduction to Software Development II course. It was built before we
        learned about polymorphism, abstract classes, interfaces, etc. so it's
        mainly meant to demonstrate our understanding of inheritance.
      </p>
      <p>
        You can see the original Java code{" "}
        <a href="https://github.com/gdgkirkley/bcit-comp1451-skunk">here</a>.
        But I've rewritten it in Javascript so that you can play it below!
      </p>
      <Button onClick={handleClick}>Play!</Button>
      <div id="game" />
      <Link to="/portfolio" replace>
        &larr; Go Back
      </Link>
    </Layout>
  )
}

export default SkunkGame
