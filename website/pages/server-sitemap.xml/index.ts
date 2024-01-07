import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";
import { Task } from "@models/Tasks/Task";
import { PostOrPage } from "@tryghost/content-api";
const { BLOG_URL, GHOST_API_KEY } = process.env;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const response = await fetch(
    `${BLOG_URL}/ghost/api/content/posts/?key=${GHOST_API_KEY}&fields=slug&limit=all`
  );
  let items: any = {};
  items = await response.json();

  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteDocs = await db
    .collection("tasks")
    .where("isReel", "==", true)
    .orderBy("priority", "desc")
    .get();

  //   console.log(items.posts, "items server");

  const fields: ISitemapField[] = items?.posts?.map((item: PostOrPage) => ({
    loc: `https://www.socialboat.live/blog/post/${item.slug}`,
    lastmod: item.created_at
      ? new Date(item.created_at).toISOString()
      : new Date().toISOString(),
    changefreq: "daily",
    priority: "0.7",
  }));

  for (const doc of remoteDocs.docs) {
    const tk = doc.data() as Task;

    const isRecipe = tk.tags?.includes("Recipes");

    fields.push({
      loc: `https://www.socialboat.live/blog/${isRecipe ? "recipe" : "reel"}/${
        tk.id
      }`,
      lastmod: new Date(tk.createdOn).toISOString(),
      changefreq: "daily",
      priority: 0.9,
    });
  }

  fields.push({
    loc: "https://socialboat.live",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  });

  fields.push({
    loc: "https://socialboat.live/transform",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  });

  fields.push({
    loc: "https://socialboat.live/reviews",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  });

  fields.push({
    loc: "https://socialboat.live/plans",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  });

  fields.push({
    loc: "https://socialboat.live/start",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  });

  fields.push({
    loc: "https://socialboat.live/starttwo",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  });

  fields.push({
    loc: "https://socialboat.live/blog",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  });

  fields.push({
    loc: "https://socialboat.live/about/company-details",
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 1,
  });

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
