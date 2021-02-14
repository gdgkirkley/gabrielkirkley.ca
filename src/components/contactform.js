import React, { useState } from "react";
import styled from "styled-components";
import Button from "./button";

export const Form = styled.form`
  display: grid;
  grid-gap: 16px;
  & label {
    width: 100%;
    margin: 8px 0px;
    font-weight: bold;
    font-family: "Inter", Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
  & input,
  textarea {
    width: 100%;
    margin: 8px 0px;
    padding: 16px 24px;
    min-height: 36px;
    border: 1px solid var(--grey6);
    border-radius: 4px;
    background: var(--white);
    transition: 0.3s linear;
    font-family: "Inter", Arial, Helvetica, sans-serif;
    font-weight: 400;
    font-size: var(--fontSize-reading);
    box-shadow: var(--level-2);
    &:hover,
    :focus {
      border: 1px solid var(--grey3);
      background: white;
    }
    &:focus {
      outline: none;
    }
  }
  & textarea {
    min-height: 150px;
  }
  &.checkbox {
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: center;
    margin: 16px 0px;
  }
`;

const ContactForm = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form name="Contact Form" method="POST" data-netlify="true">
      <input type="hidden" name="form-name" value="Contact Form" />
      <label htmlFor="name">
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="message">
        Message
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          required
        />
      </label>
      <Button type="submit">Send your message!</Button>
    </Form>
  );
};

export default ContactForm;
