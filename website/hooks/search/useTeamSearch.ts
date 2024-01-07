import { useFirestoreSearch } from "./firestore/useFirestoreSearch";
import { collection } from "firebase/firestore";
import { db } from "@config/firebase";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { EventInterface } from "@models/Event/Event";

const ref = collection(db, "sbEvents");

export const useTeamSearch = () => {
  const { fetchedData, searchString, setSearchString } = useFirestoreSearch(
    ref,
    "name"
  );

  return {
    searchString,
    setSearchString,
    fetchedData: fetchedData.map((item) => item as EventInterface),
  };
};
