import React from "react";
import Layout from "../components/layout";
import ContactForm from "../components/contactform";
import SEO from "../components/seo";

const Contact = () => {
  return (
    <Layout colour="contact" invert={true}>
      <SEO title="Contact Me" />
      <main>
        <h1>Contact</h1>
        <ContactForm />
      </main>
    </Layout>
  );
};

export default Contact;
