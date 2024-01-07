// import { getQueryParamsForBlogs } from "@hooks/drawer/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type URLState = {
  searchString?: string;
  tag?: string;
  pgNo?: number;
};

export const useBlogPost = () => {
  const [urlState, setURLState] = useState<URLState>();
  const [search, setSearch] = useState(urlState?.searchString || "");
  const [selectedTag, setSelectedTag] = useState(urlState?.tag || "");
  const router = useRouter();
  const query = router.query as URLState;

  useEffect(() => {
    if (router.isReady) {
      setURLState(query);
    }
  }, [router.isReady, query]);

  const updateURL = (updatedState: URLState) => {
    router.push(
      {
        pathname: "/blog",
        query: {
          ...query,
          ...updatedState,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  const onTagChange = async (tag?: string) => {
    query.tag = tag;
    // router.push(getQueryParamsForBlogs(query), undefined, { shallow: true });
  };
  const onSearchStringChange = async (searchStr?: string) => {
    query.searchString = searchStr;
    // router.push(getQueryParamsForBlogs(query), undefined, { shallow: true });
  };
  const onPageChange = async (pgNo?: number) => {
    query.pgNo = pgNo;
    // router.push(getQueryParamsForBlogs(query), undefined, { shallow: true });
  };
  return {
    urlState,
    updateURL,
    search,
    selectedTag,
    setSearch,
    setSelectedTag,
    onPageChange,
    onSearchStringChange,
    onTagChange,
  };
};
