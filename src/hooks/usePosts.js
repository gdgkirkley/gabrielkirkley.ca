import { graphql, useStaticQuery } from "gatsby";

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { frontmatter: { templateKey: { eq: "post" } } }) {
        edges {
          node {
            frontmatter {
              title
              slug
              author
              date
              image {
                sharp: childImageSharp {
                  fluid(maxWidth: 900, maxHeight: 400, toFormat: PNG) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            excerpt
          }
        }
      }
    }
  `);

  return data.allMdx.edges.map(post => ({
    title: post.node.frontmatter.title,
    author: post.node.frontmatter.author,
    slug: post.node.frontmatter.slug,
    image: post.node.frontmatter.image,
    excerpt: post.node.excerpt,
  }));
};

export default usePosts;
