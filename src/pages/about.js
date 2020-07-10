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
  const getAge = () => {
    let diff_ms = Date.now() - new Date("1991-09-26").getTime()
    let age_dt = new Date(diff_ms)
    return Math.abs(age_dt.getFullYear() - 1970)
  }

  return (
    <Layout colour="about">
      <main>
        <h1>Hi, I'm Gabe!</h1>
        <TwoCol>
          <div>
            <p>
              I'm a software/web developer and theatre nerd. I'm {getAge()}{" "}
              years old and grew up just outside of Vancouver. As a teenager, I
              designed and built my first websites for friends. But at the time,
              I had different goals. So, after graduating high school, I went to{" "}
              <a
                href="https://ufv.ca"
                target="_blank"
                rel="noreferrer noopener"
              >
                UFV
              </a>{" "}
              where I graduated with a Bachelor of Arts degree, majoring in
              History and minoring in Theatre. I built a few more websites along
              the way for various companies and even developed a few Wordpress
              themes, but ultimately, my coding skills became mainly a
              "nice-to-have" and a hobby.
            </p>

            <p>
              Three and a half years ago, I picked up where I left off and fell
              back in love with coding. Since then I've worked my{" "}
              <span role="img" aria-label="peach">
                🍑
              </span>{" "}
              off to learn everything I can about software development. That's
              led me from R to Javascript, from React to NodeJS, and even to
              doing a part-time certificate in Software Application Development
              at{" "}
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
              reading challenge goal, improving Wikipedia pages on history,
              growing plants, cooking, and building games in Unity. My partner,
              Paige, and I would also desperately love to be cat parents, but...
              Vancouver.
            </p>
          </div>
        </TwoCol>
      </main>
    </Layout>
  )
}

export default About
