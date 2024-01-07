import { BLOG_URL, GHOST_API_KEY } from "react-native-dotenv";
import crashlytics from "@react-native-firebase/crashlytics";

export const ghostPostsBaseURL = `${BLOG_URL}/ghost/api/content/posts/?key=${GHOST_API_KEY}&include=tags,authors`;

export const getPosts = async (url?: string, number?: number) => {
  try {
    const res = await fetch(
      `${url}&order=published_at%20desc&page=${number || 1}&limit=10`
    ).then((res) => res.json());
    return res;
  } catch (error: any) {
    console.error(error);
    crashlytics().recordError(error);
  }
};

export const getTags = async () => {
  try {
    const url = `${BLOG_URL}/ghost/api/content/tags/?key=${GHOST_API_KEY}&filter=visibility:public&limit=all`;
    const res = await fetch(url).then((res) => res.json());

    return res.tags;
  } catch (error: any) {
    console.error(error);
    crashlytics().recordError(error);
  }
};

export const getAuthors = async () => {
  try {
    const url = `${BLOG_URL}/ghost/api/content/authors/?key=${GHOST_API_KEY}&filter=visibility:public&limit=all`;
    const res = await fetch(url).then((res) => res.json());

    return res.authors;
  } catch (error: any) {
    console.error(error);
    crashlytics().recordError(error);
  }
};

export const getSinglePost = async (id: string) => {
  try {
    const url = `${BLOG_URL}/ghost/api/content/posts/${id}/?key=${GHOST_API_KEY}&include=tags,authors`;
    const res = await fetch(url).then((res) => res.json());

    return res.posts[0];
  } catch (error: any) {
    console.error(error);
    crashlytics().recordError(error);
  }
};

export const getGhostURL = (
  search?: string,
  tags?: string[],
  authors?: string[]
) => {
  let tempStr = "";
  if (
    search &&
    search !== "" &&
    tags &&
    tags.length &&
    authors &&
    authors.length
  ) {
    tempStr = `tags:[${search.split(" ").join(", ")}, ${tags.join(
      ", "
    )}],authors:[${authors.join(", ")}]`;
  } else if (tags && tags.length && authors && authors.length) {
    tempStr = `tags:[${tags.join(", ")}],authors:[${authors.join(", ")}]`;
  } else if (search && search !== "" && tags && tags.length) {
    tempStr = `tags:[${search.split(" ").join(", ")}, ${tags.join(", ")}]`;
  } else if (search && search !== "" && authors && authors.length) {
    tempStr = `tags:[${search.split(" ").join(", ")}],authors:[${authors.join(
      ", "
    )}]`;
  } else if (search && search !== "") {
    tempStr = `tags:[${search.split(" ").join(", ")}]`;
  } else if (tags && tags.length) {
    tempStr = `tags:[${tags.join(", ")}]`;
  } else if (authors && authors.length) {
    tempStr = `authors:[${authors.join(", ")}]`;
  }

  if (tempStr !== "") {
    return `${ghostPostsBaseURL}&filter=${encodeURI(tempStr)}`;
  } else {
    return ghostPostsBaseURL;
  }
};

export const getRelatedPostsUsingTags = async (tags: string[]) => {
  try {
    if (tags.length) {
      const relatedTagResponse = await fetch(
        `${BLOG_URL}/ghost/api/content/posts/?key=${GHOST_API_KEY}&filter=tags:[${tags.join(
          ", "
        )}]&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,html,id&limit=5`
      );

      const relatedPostsResponse = await relatedTagResponse.json();

      const relatedPosts = relatedPostsResponse?.posts;

      return relatedPosts ? relatedPosts : [];
    } else {
      const relatedTagResponse = await fetch(
        `${BLOG_URL}/ghost/api/content/posts/?key=${GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,html,id&limit=5`
      );

      const relatedPostsResponse = await relatedTagResponse.json();

      const relatedPosts = relatedPostsResponse?.posts;

      return relatedPosts ? relatedPosts : [];

      return [];
    }
  } catch (error: any) {
    console.error(error);
    crashlytics().recordError(error);
  }
};
