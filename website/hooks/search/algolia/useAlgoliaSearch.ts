import { adminDashboardQuery } from "@hooks/dashboard/useAdminDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlgoliaSearchResponse } from "@models/Algolia/Algolia";
import { AlgoliaActivity } from "@models/Activities/Activity";

export const useAlgoliaSearch = (urlState: adminDashboardQuery) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hits, setHits] = useState<AlgoliaActivity[]>([]);
  const [nbPages, setNbPages] = useState<number>(0);
  const [nbHits, setNbHits] = useState<number>(0);
  const [refresh, setRefresh] = useState<number>(0);

  // console.log("hits", hits);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        // console.log("HERE", urlState);
        setLoading(true);
        const response = (
          await axios.get("/api/admin/search", {
            params: urlState,
          })
        ).data as AlgoliaSearchResponse;

        // console.log("resp", response);

        setNbHits(response.nbHits);
        setHits(response.hits);
        setNbPages(response.nbPages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    };

    handleSearch();
  }, [urlState, refresh]);

  const onRefresh = () => {
    setRefresh((prev) => prev + 1);
    // setLoading(true);
    // setTimeout(() => {
    //   setRefresh((prev) => prev + 1);
    // }, 3000);
    // setLoading(false);
  };

  return {
    hits,
    nbPages,
    loading,
    onRefresh,
    nbHits,
  };
};
