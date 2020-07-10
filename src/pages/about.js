import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  line-height: 2.2;
`

const About = () => {
  return (
    <Layout colour="about">
      <main>
        <h1>Hi, I'm Gabe!</h1>
        <TwoCol>
          <div>
            <p>
              I'm a software/web developer and theatre nerd. I was born in 1991
              and grew up just outside of Vancouver, BC. After graduating high
              school, I went to{" "}
              <a
                href="https://ufv.ca"
                target="_blank"
                rel="noreferrer noopener"
              >
                UFV
              </a>{" "}
              where I graduated with a Bachelor of Arts degree, majoring in
              History and minoring in Theatre.
            </p>

            <p>
              Over the last three years, I fell in love with and worked my{" "}
              <span role="img" aria-label="peach">
                🍑
              </span>
              off to learn everything I can about writing code. That's led me
              from R to Javascript, from React to NodeJS, and even to doing a
              part-time certificate in Software Application Development at{" "}
              <a
                href="https://www.bcit.ca/"
                target="_blank"
                rel="noreferrer noopener"
              >
                BCIT
              </a>{" "}
              which mainly focuses on Java. I owe a huge debt of gratitude to
              some amazing people who share their knowledge on the internet,
              like{" "}
              <a
                href="https://wesbos.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Wes Bos
              </a>
              ,{" "}
              <a
                href="https://www.leveluptutorials.com/tutorials"
                target="_blank"
                rel="noreferrer noopener"
              >
                Scott Tolinski
              </a>
              ,{" "}
              <a
                href="https://kentcdodds.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Kent C. Dodds
              </a>
              , and more.
            </p>
            <p>
              I'm the Sales Systems Specialist for the{" "}
              <a
                href="https://artsclub.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                Arts Club Theatre Company
              </a>
              , which is Canada's largest non-profit theatre company outside of
              the Stratford or Shaw Festivals in Ontario. I build dashboards,
              reports, and trackers with R, help manage the SQL database, and,
              mainly, develop internal and external applications.
            </p>
            <p>
              I've also acted, directed, designed, or produced 90+ productions
              all over the Lower Mainland since I was about 12 years old.
            </p>
            <p>
              In my spare time, I love trying and failing to reach my{" "}
              <a
                href="https://www.goodreads.com/user_challenges/19697781"
                target="_blank"
                rel="noreferrer noopener"
              >
                Goodreads
              </a>{" "}
              reading challenge goal (seriously, how do people read 100 books
              per year?!), improving Wikipedia pages on history, growing plants,
              cooking, and building games in Unity. My partner, Paige, and I
              would also desperately love to be cat parents, but... Vancouver.
            </p>
          </div>
        </TwoCol>
      </main>
    </Layout>
  )
}

export default About
