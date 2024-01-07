import { PostOrPage, Tag } from "@tryghost/content-api";
import { AlgoliaAppSearch } from "../../../models/AppSearch/interface";
import axios from "axios";

export const ghostPostsBaseURL = `${process.env.BLOG_URL}/ghost/api/content/posts/?key=${process.env.GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,html,id&limit=all`;

export const getGhostBlogs = async () => {
  try {
    const res = await axios({
      method: "get",
      url: ghostPostsBaseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const blogPosts: PostOrPage[] = [];

    if (res.data?.posts) {
      for (const post of res.data.posts) {
        blogPosts.push(post);
      }
    }

    return blogPosts;
  } catch (error: any) {
    console.error("error in getGhostBlogs", error);
    return [];
  }
};

const filterBlogs = (blogs: PostOrPage[]): PostOrPage[] => {
  const filteredTasks: PostOrPage[] = [];
  let i: number = 0;
  for (const task of blogs) {
    if (task.title && task.published_at && task.feature_image) {
      filteredTasks.push(task);
      console.log("blog", i, task.title);
      i++;
    }
  }

  return filteredTasks;
};

export const transformBlogsToRecords = (
  blogs: PostOrPage[],
): AlgoliaAppSearch[] => {
  const filteredBlogs = filterBlogs(blogs);
  return filteredBlogs.map((blog) => ({
    objectID: blog.id,
    taskType: "blog",
    tags: getTags(blog.tags),
    name: blog.title,
    description: blog.excerpt || undefined,
    feature_image: blog.feature_image || undefined,
    author: blog.primary_author?.id,
    createdOn: blog.created_at
      ? new Date(blog.created_at).getTime()
      : undefined,
    updatedOn: blog.updated_at
      ? new Date(blog.updated_at).getTime()
      : undefined,
    published_at: blog.published_at || undefined,
    reading_time: blog.reading_time,
    slug: blog.slug,
  }));
};

const getTags = (tags: Tag[] | undefined): string[] | undefined => {
  if (tags) {
    const tagsArr: string[] = [];

    tags.forEach((each) => {
      if (each.name) {
        tagsArr.push(each.name);
      }
    });

    return tagsArr;
  }

  return undefined;
};
