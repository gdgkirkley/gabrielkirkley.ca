import { graphql, useStaticQuery } from "gatsby";

const useExamples = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { frontmatter: { templateKey: { eq: "example" } } }
        sort: { fields: frontmatter___sortOrder }
      ) {
        edges {
          node {
            frontmatter {
              title
              slug
              author
              date
              using
              type
              source
              image {
                sharp: childImageSharp {
                  fluid(maxWidth: 900, maxHeight: 400) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
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
    excerpt: post.node.frontmatter.using,
    type: post.node.frontmatter.type,
    source: post.node.frontmatter.source,
  }));
};

export default useExamples;
