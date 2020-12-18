---
templateKey: post
title: "Apple M1 Macbook Pro: Developer First Impressions"
slug: /blog/apple-m1-developer
author: Gabe Kirkley
image: ./macbook.jpg
imageAltText: Two guys look at a Macbook
imageCredt:
  <span>Photo by <a
  href="https://unsplash.com/@neonbrand?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">NeONBRAND</a>
  on <a
  href="https://unsplash.com/s/photos/macbook-m1?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
keywords:
  - "apple"
  - "apple silicon"
  - "apple m1"
  - "developer"
  - "review"
  - "tools"
published: true
date: 2020-12-17
---

Today, something awesome happened: I got my new Macbook Pro with 16GB of RAM and
the new Apple M1 processor.

Like many people, at first, I was hesitant about the M1 chip. I'd read that
there would be many advantages to Apple producing its own processors in speed
and integration, and I was also aware that the
[ARM chips](https://en.wikipedia.org/wiki/ARM_architecture) that Apple was
making for iPhone were getting faster and faster every year.

But there was no way that the new processor's first release could be any good,
right?

Wrong. Totally. Wrong.

https://www.youtube.com/watch?v=OuF9weSkS68

I've now been using the M1 for a day, and let me tell you... this thing is
incredible. As I'm writing this blog, Gatsby's compile times are clocking in at
just **0.2s** to run the page queries and rebuild the dev bundle. That means
that I can hit save, and by the time I cmd-tab to localhost on Chrome, the page
refresh has already finished.

You can probably tell where this is going... but here are my first impressions
of using the M1 chip as a developer.

## Setup

Besides installing Google Chrome and Firefox, the first thing that I did was
install developer tools that I know I'm going to be using. To start off on my
first day, I wanted to get up and running with my most common tools: XCode,
VSCode, NodeJS, PostgreSQL and some command-line tools.

**Xcode**, which runs natively on the ARM chip, took a little while to install
(it's a big download!) but runs like a breeze. I haven't had a lot of time to
try it out, but just compiling an existing project once went waaay faster than
I'm used to. Plus, one of the big advantages of installing XCode right away is
automatic native installation of command-line tools like **Git**.

**VSCode** installs and runs seamlessly using
[Rosetta 2](https://developer.apple.com/documentation/apple_silicon/about_the_rosetta_translation_environment).
Seriously, if I didn't know that it was running in Rosetta 2 right now, I would
have no way to know that anything different was happening. I quickly got it up
and running with all my favourite extensions, cloned a few git repos, and
started editing.

One thing that impressed me: the npm installs that I did in the repos that I've
cloned so far was blisteringly fast. It would take my old Macbook a few minutes
or more to get through the install on a big repo. This took maybe 20-30 seconds.

**NodeJS** was just as easy to install. After the installation, I grabbed the
installer and did a few global installs of packages like the gatsby-cli that I
know I'll be needing. Everything was fast, quick, and easy.

After that, I knew that things were going to get a bit harder. With a bit of
research beforehand, I knew that **homebrew** had caused some people trouble.
Luckily, I found what I was looking for in this StackOverflow answer:
https://stackoverflow.com/a/64883440

For those who don't want to click:

```bash
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
arch -x86_64 brew install <package>
```

As soon as I had brew installed, it was a quick and painless process to add some
critical tools like **yarn**.

However, here is where I did run into an issue: most of my projects use
**PostgreSQL** and so it's pretty critical that I get a local Postgres server
running.

As I've always done in the past, I went to the
[PostgreSQL site](https://www.postgresql.org/download/) and grabbed the
download. I ran the installer, and everything seemed to go fine. But when I
tried to run pgAdmin, it didn't open. Plus, I couldn't access the Postgres
instance via the command-line even though I could tell that it was running
because there it was on port 5432 - but it was inaccessible.

So, I uninstalled it using the provided uninstaller in the
/Library/PostgreSQL/13 folder and attempted to install it via brew, and the same
thing happened!

So, what I've done now is to use [postgres.app](https://postgresapp.com/), which
lets you run a local Postgres server and start and stop the process smoothly. I
also downloaded pgAdmin separately and can easily connect to the DB.

https://twitter.com/PeterZaitsev/status/1329931028681478144?s=20

To be honest, I kind of like this and will probably go with this method for
clean installs in the future. Command-line tools might make you feel a bit
cooler and can be a lot faster in many cases, but for stopping and starting a
Postgres server? I'm more than happy to click a button.

## Impressions

This thing is **FAST**.

I don't know if I can explain how fantastic it feels to have projects compile
and run 10x faster than before.

(Maybe the Macbook M1 is the true 10x developer?? 🤯)

But the experience of getting from a git clone, through an npm install, and a
compile took me just over a minute on a pretty large app. That's crazy.

Three more features that have stood out to me so far: the keyboard, the battery
life, and the heat.

I've always loved typing on Macbook keyboards - something about them feels so
slick in a way that no other keyboard can match. And I'm someone who otherwise
uses a mechanical keyboard full time. This keyboard, though? **It's next
level.** Typing out this post feels excellent - I almost want to keep writing
for the typing experience!

I can't wait to take this thing to a conference or a class once this pandemic is
over because the battery is pretty incredible. I took the Macbook out of the
box, and I haven't plugged it in yet. I've been working on it, installing
programs, and now writing out a decently long blog post for about 5 hours. It
was at 78% battery when I started, and it's currently sitting at 54%. After 5
hours! What is happening?!

Finally, through all of this, the Macbook has gotten a bit warm. From my lap.
Seriously, this thing is cool - not once have I heard the fan turn on, or felt
it growing hot at all. Even when my 2013 Intel Macbook was brand new, the fan
would be running just from booting up one tab on Google Chrome.

## Conclusion

Overall, I love this thing. So far, I don't have anything bad to say about it.

From a developer's perspective, some tools and open source projects will have to
adapt to the ARM architecture. I'd imagine that it will be up to a year before
many large programs have adapted, and there are some open-source tools that I
anticipate will be much harder to install and get working like PostgreSQL was.
But honestly, even running Rosetta, you don't notice.

So if you're like I was two months ago, wondering if it's worth taking the
plunge for an M1 chip, I say go for it. You won't regret it.
