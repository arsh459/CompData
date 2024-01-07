import { useFirestoreSearch } from "./firestore/useFirestoreSearch";
import { collection, where } from "firebase/firestore";
import { db } from "@config/firebase";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { useMemo } from "react";

const ref = collection(db, "users");

export const useJudgeSearch = () => {
  const judgeConst = useMemo(() => {
    return where("judge", "==", true);
  }, []);

  const { fetchedData, searchString, setSearchString } = useFirestoreSearch(
    ref,
    "name",
    judgeConst
  );

  return {
    searchString,
    setSearchString,
    fetchedData: fetchedData.map((item) => item as LeaderBoard),
  };
};
