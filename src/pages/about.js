import React from "react";
import styled from "styled-components";
import Layout from "../components/layout";
import SEO from "../components/seo";

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  line-height: 2.2;
`;

const About = () => {
  return (
    <Layout colour="about">
      <SEO title="About" />
      <main>
        <h1>Hi, I'm Gabe!</h1>
        <TwoCol>
          <div>
            <p>
              I'm a creative software developer who loves to make useful things
              with code. As a teenager, I designed and built my first websites
              for friends. But at the time, I had different goals. So, after
              graduating high school, I went to the{" "}
              <a
                href="https://ufv.ca"
                target="_blank"
                rel="noreferrer noopener"
              >
                University of the Fraser Valley
              </a>{" "}
              where I graduated with a Bachelor of Arts degree, majoring in
              History and minoring in Theatre. I built a few more websites along
              the way for various companies and even developed a few Wordpress
              themes, but ultimately, my coding skills became mainly a
              "nice-to-have" and a hobby.
            </p>

            <p>
              Three and a half years ago, hoping to find a solution to some
              tricky sales forecasting problems at work, I learned R and fell in
              love with coding. Since then I've worked hard to learn everything
              I can about software development. That's led me from R to
              Javascript, from React to NodeJS, and even to doing a part-time
              certificate in Software Application Development at{" "}
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
              I've acted, directed, designed, or produced 90+ productions all
              over the Lower Mainland since I was about 12 years old.
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
              photography, videography, growing plants, cooking, and building
              games in Unity.
            </p>
          </div>
        </TwoCol>
      </main>
    </Layout>
  );
};

export default About;
