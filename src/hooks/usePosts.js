import { graphql, useStaticQuery } from "gatsby";

const usePosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        # prettier-ignore
        filter: {frontmatter: { templateKey: { eq: "post" }, published: { ne: false }}}
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              slug
              author
              date
              keywords
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
    date: post.node.frontmatter.date,
    slug: post.node.frontmatter.slug,
    image: post.node.frontmatter.image,
    excerpt: post.node.excerpt,
  }));
};

export default usePosts;
