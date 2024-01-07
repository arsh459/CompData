import { getQueryParamsForBlogs } from "@hooks/drawer/utils";
import { Pagination, PostOrPage } from "@tryghost/content-api";
import {
  getAuthors,
  getGhostURL,
  getPosts,
  getTags,
} from "@utils/ghost/ghostutils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type filtersType = {
  authors: { [key: string]: string };
  tags: { [key: string]: string };
};

export type urlParamsKey = "search" | "tags" | "authors" | "page";

export type urlParams = {
  search?: string;
  tags?: string;
  authors?: string;
  page?: number;
};

export const useGhostPosts = () => {
  const router = useRouter();
  const query = router.query as urlParams;

  const [pageNo, setPageNo] = useState<number>(1);
  const [searchStr, setSearchStr] = useState<string>("");
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [searchAuthors, setSearchAuthors] = useState<string[]>([]);

  const [pagination, setPagination] = useState<Pagination>();
  const [posts, setPosts] = useState<PostOrPage[]>([]);
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
    if (router.isReady) {
      if (query.search) {
        setSearchStr(decodeURI(query.search));
      } else {
        setSearchStr("");
      }

      if (query.tags) {
        setSearchTags(decodeURI(query.tags).split(" "));
      } else {
        setSearchTags([]);
      }

      if (query.authors) {
        setSearchAuthors(decodeURI(query.authors).split(" "));
      } else {
        setSearchAuthors([]);
      }

      if (query.page) {
        setPageNo(query.page);
      } else {
        query.page = 1;
        router.replace(getQueryParamsForBlogs(query), undefined, {
          shallow: true,
        });
      }
    }
  }, [router, query]);

  useEffect(() => {
    const getFunc = async () => {
      const ghostResponce = await getPosts(
        getGhostURL(searchStr, searchTags, searchAuthors),
        pageNo
      );

      // console.log("g", ghostResponce);

      if (ghostResponce?.posts) {
        // for (let i: number = 0; i <= ghostResponce.posts.length; i++) {
        //   console.log(
        //     `${i} ^ ${ghostResponce.posts[i]?.title} ^ ${ghostResponce.posts[
        //       i
        //     ]?.tags
        //       .map((i) => i.name)
        //       .join(", ")} ^ ${ghostResponce.posts[i]?.meta_title} ^ ${
        //       ghostResponce.posts[i]?.meta_description
        //     } ^ ${ghostResponce.posts[i]?.slug} ^ ${
        //       ghostResponce.posts[i]?.og_title
        //     } ^ ${ghostResponce.posts[i]?.og_image} ^ ${
        //       ghostResponce.posts[i]?.canonical_url
        //     }`
        //   );
        // }

        ghostResponce.meta.pagination &&
          setPagination(ghostResponce.meta.pagination);
        setPosts(ghostResponce.posts);
      }
    };

    getFunc();
  }, [pageNo, searchStr, searchTags, searchAuthors]);

  const onPageChange = (newVal: number) => {
    query.page = newVal;
    router.push(getQueryParamsForBlogs(query), undefined, { shallow: true });

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);
  };

  const onSearchStrChange = (newVal: string) => {
    if (newVal !== "") {
      query.search = encodeURI(newVal);
    } else {
      delete query.search;
    }
    query.page = 1;
    router.push(getQueryParamsForBlogs(query), undefined, { shallow: true });
  };

  const onSearchTagsChange = (newVal: string) => {
    const isSelected = searchTags.includes(newVal);
    const tempArr = isSelected
      ? searchTags.filter((each) => each !== newVal)
      : [...searchTags, newVal];
    if (tempArr.length) {
      query.tags = encodeURI(`${tempArr.join(" ")}`);
    } else {
      delete query.tags;
    }
    query.page = 1;
    router.push(getQueryParamsForBlogs(query), undefined, { shallow: true });
  };

  const onSearchAuthorsChange = (newVal: string) => {
    const isSelected = searchTags.includes(newVal);
    const tempArr = isSelected
      ? searchTags.filter((each) => each !== newVal)
      : [...searchTags, newVal];
    if (tempArr.length) {
      query.authors = encodeURI(`${tempArr.join(" ")}`);
    } else {
      delete query.authors;
    }
    query.page = 1;
    router.push(getQueryParamsForBlogs(query), undefined, { shallow: true });
  };

  const clearFilters = () => {
    delete query.search;
    delete query.tags;
    delete query.authors;
    query.page = 1;
    router.push(getQueryParamsForBlogs(query), undefined, { shallow: true });
  };

  return {
    posts,
    filters,
    pagination,
    onPageChange,
    onSearchStrChange,
    onSearchTagsChange,
    onSearchAuthorsChange,
    clearFilters,
    searchTags,
  };
};
