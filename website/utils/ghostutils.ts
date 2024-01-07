import { Nullable, PostOrPage, Pagination } from "@tryghost/content-api";

const { NEXT_PUBLIC_BLOG_URL, NEXT_PUBLIC_GHOST_API_KEY } = process.env;

// const api = new GhostContentAPI({
//   url: BLOG_URL ? BLOG_URL : "",
//   key: GHOST_API_KEY ? GHOST_API_KEY : "", // replace this with your API key

//   version: "v5.0",
// });
// console.log(BLOG_URL, GHOST_API_KEY);

export const getPosts = async (number?: number) => {
  try {
    const url = number
      ? `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id&page=${number}`
      : `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id&limit=7`;
    const res = await fetch(url).then((res) => res.json());
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getPostsAndUniqueTags = async (number?: number) => {
  try {
    const url = number
      ? `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id&page=${number}`
      : `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id&limit=7`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    const data = await response.json();
    const posts = data?.posts?.filter(
      (post: PostOrPage) => "tags" in post
    ) as PostOrPage[];
    const uniqueTags = posts
      ? Array.from(new Set(posts.flatMap((post) => post.tags)))
      : [];
    const pagination = data?.meta?.pagination;
    return {
      posts,
      uniqueTags,
      pagination,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getSinglePost = async (slug: Nullable<string>) => {
  try {
    const url = `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/slug/${slug}?key=${process.env.GHOST_API_KEY}&include=tags,authors`;
    const res = await fetch(url).then((res) => res.json());

    return res.posts[0] as PostOrPage;
  } catch (error) {
    console.error(error);
  }
};
export const getTags = async () => {
  try {
    const allTagsRes = await fetch(
      `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/tags/?key=${NEXT_PUBLIC_GHOST_API_KEY}&filter=visibility:public&fields=title,slug,name&limit=all`
    );
    const allTags = await allTagsRes.json();

    return allTags;
  } catch (error) {
    console.error(error);
  }
};

export const getNumberOfPostsV2 = async (limit: number) => {
  try {
    const url = `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,feature_image,id&limit=${limit}`;

    const res = await fetch(url).then((res) => res.json());

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getNumberOfPosts = async (limit?: number) => {
  try {
    const url = limit
      ? `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,html,id&limit=${limit}`
      : `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id`;
    const res = await fetch(url).then((res) => res.json());

    return res;
  } catch (error) {
    console.error(error);
  }
};

export interface urlParams {
  searchString?: string;
  tag?: string;
  pgNo?: number;
}
export type urlParamsKey = "searchString" | "tag" | "pgNo";
export const getPostsAndUniqueTagsTest = async (urlParams: urlParams) => {
  try {
    let url = "";
    if (urlParams.searchString || urlParams.tag || urlParams.pgNo) {
      let queryString = "";
      if (urlParams.searchString) {
        queryString += `&filter=title:${urlParams.searchString}`;
      }
      if (urlParams.tag) {
        queryString += `&filter=tags:${urlParams.tag}`;
      }
      if (urlParams.pgNo) {
        queryString += `&page=${urlParams.pgNo}`;
      }
      url = `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id${queryString}`;
    } else {
      url = `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id&limit=7`;
    }
    const response = await fetch(url);
    const data = await response.json();
    const posts = data?.posts
      ? (data.posts.filter(
          (post: PostOrPage) => (post as PostOrPage).tags !== undefined
        ) as PostOrPage[])
      : [];
    const uniqueTags = posts
      ? Array.from(new Set(posts.flatMap((post) => post.tags)))
      : [];
    const pagination = data?.meta?.pagination;
    return {
      posts,
      uniqueTags,
      pagination,
    };
  } catch (error) {
    console.error(error);
  }
};
export interface quParams {
  tag: string;
  search: string;
}
export const getPostsAndUniqueTagsNew = async ({ tag, search }: quParams) => {
  try {
    // let url = "";
    let postsRes;
    if (tag) {
      postsRes = `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&filter=tags:[${tag}]&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id`;
    } else if (search) {
      postsRes = `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&filter=title:${search}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id`;
    } else {
      postsRes = `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,id`;
    }

    const response = await fetch(postsRes);
    const data = await response.json();
    const posts = data?.posts ? (data.posts as PostOrPage[]) : [];
    const allTagsRes = await fetch(
      `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/tags/?key=${NEXT_PUBLIC_GHOST_API_KEY}&filter=visibility:public&limit=all`
    );
    const allTags = await allTagsRes.json();

    // const uniqueTags = posts
    //   ? Array.from(new Set(posts.flatMap((post) => post.tags)))
    //   : [];
    const uTags = allTags?.tags ? allTags.tags : [];
    const pagination = data?.meta?.pagination;
    return {
      posts,
      tags: uTags,
      tag,
      searchStr: search,
      pagination: pagination ? (pagination as Pagination) : undefined,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getRelatedPostsUsingTags = async (
  currentPostTag?: string,
  currentPostId?: string
) => {
  if (currentPostId && currentPostTag) {
    try {
      const relatedTagResponse = await fetch(
        `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${NEXT_PUBLIC_GHOST_API_KEY}&filter=tag:${currentPostTag}&include=tags,authors&fields=title,slug,excerpt,reading_time,primary_tag,published_at,primary_author,feature_image,feature_image_alt,html,id&limit=5`
      );
      const relatedPostsResponse = await relatedTagResponse.json();
      // console.log({ relatedPostsResponse });

      const relatedPosts = relatedPostsResponse?.posts;

      // console.log({ relatedPosts });
      return relatedPosts ? relatedPosts : [];
    } catch (error) {
      console.error(error);
    }
  }
};

export const getAuthorById = async (id: string) => {
  try {
    if (id) {
      const remoteAuthor = await fetch(
        `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/authors/${id}/?key=${NEXT_PUBLIC_GHOST_API_KEY}&filter=visibility:public&fields=title,slug,name`
      );
      const author = await remoteAuthor.json();

      return author;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getPostsByAuthor = async (authorId: string) => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${
        process.env.NEXT_PUBLIC_GHOST_API_KEY
      }&include=tags,authors&filter=authors:${encodeURI(
        `[${authorId}]`
      )}&limit=5`
    ).then((res) => res.json());

    return res;
  } catch (error) {
    console.error(error);
  }
};
