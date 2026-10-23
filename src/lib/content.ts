import { getCollection } from "astro:content";

/** Published blog posts, newest first. Posts are published unless `published: false`. */
export async function getPosts() {
  const posts = await getCollection("posts", ({ data }) => data.published);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Published portfolio entries by `sortOrder`. Entries must opt in with `published: true`. */
export async function getPortfolio() {
  const entries = await getCollection("portfolio", ({ data }) => data.published);
  return entries.sort(
    (a, b) =>
      (a.data.sortOrder ?? Infinity) - (b.data.sortOrder ?? Infinity),
  );
}
