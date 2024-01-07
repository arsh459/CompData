export const ghostPostsBaseURL = `${process.env.NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/?key=${process.env.NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors`;

export const getPosts = async (url: string, number: number) => {
  try {
    const res = await fetch(
      `${url}&order=published_at%20desc&page=${number}&limit=10`
    ).then((res) => res.json());
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getTags = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BLOG_URL}/ghost/api/content/tags/?key=${process.env.NEXT_PUBLIC_GHOST_API_KEY}&filter=visibility:public&limit=all`;
    const res = await fetch(url).then((res) => res.json());

    return res.tags;
  } catch (error) {
    console.error(error);
  }
};

export const getAuthors = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BLOG_URL}/ghost/api/content/authors/?key=${process.env.NEXT_PUBLIC_GHOST_API_KEY}&filter=visibility:public&limit=all`;
    const res = await fetch(url).then((res) => res.json());

    return res.authors;
  } catch (error) {
    console.error(error);
  }
};

export const getSinglePost = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BLOG_URL}/ghost/api/content/posts/${id}/?key=${process.env.NEXT_PUBLIC_GHOST_API_KEY}&include=tags,authors`;
    const res = await fetch(url).then((res) => res.json());

    return res.posts[0];
  } catch (error) {
    console.error(error);
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
    console.log(tempStr);
    return `${ghostPostsBaseURL}&filter=${encodeURI(tempStr)}`;
  } else {
    return ghostPostsBaseURL;
  }
};
