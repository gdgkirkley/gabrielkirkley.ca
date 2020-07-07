import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"

const SecondaryCharacters = () => {
  return (
    <Layout>
      <h1>Secondary Characters</h1>
      <p>Content coming soon!</p>
      <Link to="/portfolio" replace>
        &larr; Go Back
      </Link>
    </Layout>
  )
}

export default SecondaryCharacters
