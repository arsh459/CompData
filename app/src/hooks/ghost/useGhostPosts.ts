import { Pagination, PostOrPage } from "@tryghost/content-api";
import {
  getAuthors,
  getGhostURL,
  getPosts,
  getTags,
  ghostPostsBaseURL,
} from "@utils/ghost/ghostutils";
import { useEffect, useState } from "react";

export type filtersType = {
  authors: { [key: string]: string };
  tags: { [key: string]: string };
};

export const useGhostPosts = (
  search?: string,
  tags?: string[],
  authors?: string[]
) => {
  const [pagination, setPagination] = useState<Pagination>();
  const [posts, setPosts] = useState<PostOrPage[]>([]);
  const [ghostURL, setGhostURL] = useState<string>(ghostPostsBaseURL);
  const [filters, setFilters] = useState<filtersType>({
    authors: {},
    tags: {},
  });

  useEffect(() => {
    const getFilters = async () => {
      const allTags = await getTags();
      const allAuthors = await getAuthors();

      setFilters((prev) => {
        const remoteFilters: filtersType = {
          authors: {},
          tags: {},
        };

        if (allAuthors) {
          for (const author of allAuthors) {
            if (
              !prev.authors.hasOwnProperty(author) &&
              !remoteFilters.authors.hasOwnProperty(author)
            ) {
              remoteFilters.authors[author.slug] = author.name;
            }
          }
        }

        if (allTags) {
          for (const tag of allTags) {
            if (
              !prev.tags.hasOwnProperty(tag) &&
              !remoteFilters.tags.hasOwnProperty(tag)
            ) {
              remoteFilters.tags[tag.slug] = tag.name;
            }
          }
        }

        return {
          authors: { ...prev.authors, ...remoteFilters.authors },
          tags: { ...prev.tags, ...remoteFilters.tags },
        };
      });
    };

    getFilters();
  }, []);

  useEffect(() => {
    const getFunc = async () => {
      const urlToFetch = getGhostURL(search, tags, authors);

      const ghostResponce = await getPosts(urlToFetch);

      setGhostURL(urlToFetch);

      if (ghostResponce?.posts) {
        ghostResponce.meta.pagination &&
          setPagination(ghostResponce.meta.pagination);
        setPosts(ghostResponce.posts);
      }
    };

    getFunc();
  }, [search, tags, authors]);

  const onNext = async () => {
    if (pagination?.next) {
      const ghostResponce = await getPosts(ghostURL, pagination.next);

      if (ghostResponce?.posts) {
        ghostResponce.meta.pagination &&
          setPagination(ghostResponce.meta.pagination);
        setPosts((prev) => [...prev, ...ghostResponce.posts]);
      }
    }
  };

  return {
    posts,
    onNext,
    filters,
  };
};
