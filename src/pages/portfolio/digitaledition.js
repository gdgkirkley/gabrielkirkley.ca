import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"

const DigitalEdition = () => {
  return (
    <Layout>
      <h1>Arts Club: Digital Edition</h1>
      <p>Content coming soon!</p>
      <Link to="/portfolio" replace>
        &larr; Go Back
      </Link>
    </Layout>
  )
}

export default DigitalEdition
