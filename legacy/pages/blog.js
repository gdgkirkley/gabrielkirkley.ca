import React from "react";
// import styled from "styled-components"
import Layout from "../components/layout";
import usePosts from "../hooks/usePosts";
import PostPreview from "../components/postpreview";
import SEO from "../components/seo";

const Blog = () => {
  const posts = usePosts();

  return (
    <Layout invert={true}>
      <SEO title="Blog" description="Gabe Kirkley's blog" />
      <main>
        <h1>Blog</h1>
        {posts.map(post => (
          <PostPreview key={post.slug} post={post} />
        ))}
      </main>
    </Layout>
  );
};

export default Blog;
