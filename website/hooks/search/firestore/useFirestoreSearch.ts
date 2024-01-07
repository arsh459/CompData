import {
  CollectionReference,
  getDocs,
  query,
  limit,
  //   QueryConstraint,
  DocumentData,
  where,
  QueryConstraint,
  Query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const DEFAULT_LIMIT = 8;

export const useFirestoreSearch = (
  ref: CollectionReference,
  //   queryC: QueryConstraint,
  key: string,
  judgeConst?: QueryConstraint,
  initString?: string,
  noAutoSuggest?: boolean,
  numResults?: number
) => {
  const [fetchedData, setFetchedData] = useState<DocumentData[]>([]);
  const [searchString, setSearchString] = useState<string>(
    initString ? initString : ""
  );

  // console.log("no auth", noAutoSuggest);

  useEffect(() => {
    if (initString) setSearchString(initString);
  }, [initString]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchResults = async () => {
        // console.log("searching");
        const queryC = where(key, ">=", searchString);
        let q: Query;
        if (judgeConst) {
          q = query(
            ref,
            queryC,
            judgeConst,
            limit(numResults ? numResults : DEFAULT_LIMIT)
          );
        } else {
          q = query(
            ref,
            queryC,
            limit(numResults ? numResults : DEFAULT_LIMIT)
          );
        }

        const returnDocs = await getDocs(q);

        const returnData: DocumentData[] = [];
        for (const returnDoc of returnDocs.docs) {
          const data = returnDoc.data();
          returnData.push(data);
        }

        setFetchedData(returnData);
      };

      if (noAutoSuggest && searchString) {
        fetchResults();
      } else if (!noAutoSuggest) {
        fetchResults();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [ref, key, searchString, judgeConst, noAutoSuggest, numResults]);

  return {
    searchString,
    setSearchString,
    fetchedData,
  };
};
