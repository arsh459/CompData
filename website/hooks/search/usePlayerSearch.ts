import { useFirestoreSearch } from "./firestore/useFirestoreSearch";
import { collection } from "firebase/firestore";
import { db } from "@config/firebase";
// import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { UserInterface } from "@models/User/User";

const ref = collection(db, "users");

export const usePlayerSearch = (
  initialString?: string,
  num?: number,
  searchKey?: "name" | "phone"
) => {
  const { fetchedData, searchString, setSearchString } = useFirestoreSearch(
    ref,
    searchKey ? searchKey : "name",
    undefined,
    initialString,
    false,
    num
  );

  return {
    searchString,
    setSearchString,
    fetchedData: fetchedData
      .map((item) => item as UserInterface)
      .sort(
        (a, b) => (b.fpCredit ? b.fpCredit : 0) - (a.fpCredit ? a.fpCredit : 0)
      ),
  };
};
