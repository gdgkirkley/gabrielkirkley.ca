import React from "react"
import Layout from "../components/layout"
import ContactForm from "../components/contactform"

const Contact = () => {
  return (
    <Layout colour="contact" invert={true}>
      <main>
        <h1>Contact</h1>
        <ContactForm />
      </main>
    </Layout>
  )
}

export default Contact
