import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import usePosts from "../hooks/usePosts"
import PostPreview from "../components/postpreview"

const Blog = () => {
  const posts = usePosts()

  return (
    <Layout>
      <h1>Blog</h1>
      {posts.map(post => (
        <PostPreview key={post.slug} post={post} />
      ))}
    </Layout>
  )
}

export default Blog
