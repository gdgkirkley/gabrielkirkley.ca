---
templateKey: post
title: Integration Testing with Cookies in NodeJS
slug: /blog/integration-testing-with-cookies
author: Gabe Kirkley
image: ./cookie.jpg
imageAltText: A dashboard with percentages and trendlines
imageCredit:
  <span>Photo by <a
  href="https://unsplash.com/@amir_v_ali?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">amirali
  mirhashemian</a> on <a
  href="https://unsplash.com/s/photos/cookie?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
date: 2020-07-31
draft: true
---

How do you do an integration test with cookie-based authentication?

It seems like a pretty straightforward question, and considering that cookies
are the recommended approach to storing JWTs on the client side, it should have
a fairly easy to find answer, right?

Wrong.

I came across this very problem recently while working on a side project. In the
application I was building, I was running an Apollo GraphQL server with Express.
I had spent hours writing solid integration tests using axios that ran against a
real database in a production-like environment.

The only problem was that all of my tests used the JWT directly, without testing
if the cookies were being set and received. I wasn't satisfied with this
approach since to my mind the goal of integration testing should be to interact
with an application as realistically as possible.

After hours of googling without coming up with any really helpful answers, I
decided to just try at my own solution. Here's how I solved it:

## Setup

To help you follow along, let's create a really basic NodeJS/Express application
with an unauthenticated and authenticated route.

First, let's install some dependencies:

```bash
yarn add express cookie-parser jsonwebtoken express-jwt jsonwebtoken
```

Once that installs, we can scaffold out a basic index.js

```js
// index.js
const express = require("express");

function startServer({port = 4000} = {}) {
    const
}

```
