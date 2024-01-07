import { appSearchIndex } from "@modules/UserMain/FitPointExpanderMain/hooks/algolia";
import { AlgoliaAppSearch } from "../../models/AppSearch/interface";
import { useState, useEffect } from "react";

const algoliaFetch = async (
  query: string,
  pageNum: number,
  filter: string
): Promise<AlgoliaAppSearch[]> => {
  try {
    if (!query) {
      return [];
    }
    const response = await appSearchIndex.search(query, {
      hitsPerPage: 5,
      page: pageNum,
      filters: filter,
    });

    if (response.hits) {
      const remoteTasks = response.hits as AlgoliaAppSearch[];
      return remoteTasks;
    }

    return [];
  } catch (error) {
    console.log("errorn in algolia appSearchIndex", error);
    return [];
  }
};

const delay = 300;

const useAlgoliaNutrition = () => {
  const [tasks, setTasks] = useState<AlgoliaAppSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setPage(0);
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const fetchResults = async () => {
      const result = await algoliaFetch(
        query,
        0,
        filter ? `taskType:${filter}` : ""
      );
      console.log(result.length);

      setTasks(result.length ? result : []);
      setLoading(false);
    };

    const debounceFetchResults = () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(fetchResults, delay);
    };

    const handleQueryChange = () => {
      setTasks([]);
      setLoading(true);
      debounceFetchResults();
    };

    // const handleFilterChange = () => {
    //   setTasks([]);
    //   setLoading(true);
    //   debounceFetchResults();
    // };

    handleQueryChange();
    // handleFilterChange();

    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [query, filter]);

  const search = (newQuery: string) => {
    setQuery(newQuery);
    setPage(0);
  };

  const onNext = async () => {
    const nextPage = page + 1;
    const results = await algoliaFetch(
      query,
      nextPage,
      filter ? `taskType:${filter}` : ""
    );

    if (results.length) {
      setTasks((prevTasks) => [...prevTasks, ...results]);
      setPage(nextPage);
    }
  };

  return { tasks, loading, search, onNext, query, filter, setFilter };
};

export default useAlgoliaNutrition;
