exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { published: { ne: false } } }) {
        edges {
          node {
            frontmatter {
              slug
              templateKey
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("failed to create posts", result.errors);
  }

  const posts = result.data.allMdx.edges;

  posts.map(post => {
    actions.createPage({
      path: `${post.node.frontmatter.slug}`,
      component: require.resolve(
        `./src/templates/${post.node.frontmatter.templateKey}.js`
      ),
      context: {
        slug: post.node.frontmatter.slug,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
    });
  }
};
