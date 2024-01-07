import { useFirestoreSearch } from "./firestore/useFirestoreSearch";
import { collection } from "firebase/firestore";
import { db } from "@config/firebase";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
// import { EventInterface } from "@models/Event/Event";
import { Task } from "@models/Tasks/Task";

const ref = collection(db, "tasks");

export const useTaskSearch = (initString?: string, noAutoSuggest?: boolean) => {
  const { fetchedData, searchString, setSearchString } = useFirestoreSearch(
    ref,
    "name",
    undefined,
    initString,
    noAutoSuggest,
    15
  );

  return {
    searchString,
    setSearchString,
    fetchedData: fetchedData.map((item) => item as Task),
  };
};
