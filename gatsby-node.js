exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    {
      allMdx {
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
  `)

  if (result.errors) {
    reporter.panic("failed to create posts", result.errors)
  }

  const posts = result.data.allMdx.edges

  posts.forEach(post => {
    actions.createPage({
      path: `${post.node.frontmatter.slug}`,
      component: require.resolve(
        `./src/templates/${post.node.frontmatter.templateKey}.js`
      ),
      context: {
        slug: post.node.frontmatter.slug,
      },
    })
  })
}
