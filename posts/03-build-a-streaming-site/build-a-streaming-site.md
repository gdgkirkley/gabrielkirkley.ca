---
templateKey: post
title:
  How to Build an Authenticated Video Streaming Site with NextJS and Apollo
  GraphQL
slug: /blog/build-a-streaming-site
author: Gabe Kirkley
image: ./deskcoding.jpg
imageAltText: A desk with a few monitors and a laptop.
imageCredt:
  <span>Photo by <a
  href="https://unsplash.com/@thisisengineering?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">ThisisEngineering
  RAEng</a> on <a
  href="https://unsplash.com/s/photos/video-streaming?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
keywords:
  - "video"
  - "streaming"
  - "developer"
  - "react"
  - "nodejs"
  - "apollo"
  - "graphql"
  - "mux"
  - "livestreaming"
  - "video streaming"
published: false
date: 2021-02-10
---

Let's face it: one of the main ways that many of us have gotten through this
pandemic is by consuming a lot of content on video streaming sites.

Even before the pandemic, there had been an explosion of companies offering
their own online streaming services: Disney+, CBS All Access, Peacock, etc.

https://twitter.com/aseitzwald/status/1358607611155910657

Well, what's one more, right? In this tutorial, I'm going to show you how to
build your own streaming service using React, NextJS, Apollo, Prisma, and
[Mux](https://mux.com/).

We'll be using Mux to handle the actual video streaming because they make it
super simple to handle all the complications of video on the web.

## Setup

To get started quickly, we'll use Create Next App for the frontend of the site.
Run the following commands in your terminal:

```bash
mkdir video-streaming
npx create-next-app ui
```

For the API, I've setup some boilerplate structure that will let us get started
quickly. For a detailed explanation of what's in the boilerplate, view the
README.

```bash
mkdir api
git clone
npm install
```
