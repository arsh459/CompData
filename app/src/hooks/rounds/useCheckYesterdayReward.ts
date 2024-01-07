import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { format, subDays } from "date-fns";

const useCheckYesterdayDoc = (uid?: string) => {
  const [docExists, setDocExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean | null>(null);

  useEffect(() => {
    const checkYesterdayDoc = async () => {
      try {
        const yesterdayDate = subDays(new Date(), 1); // Calculate yesterday's date
        const formattedYesterday = format(yesterdayDate, "yyyy-MM-dd");

        const querySnapshot = await firestore()
          .collection("users")
          .doc(uid)
          .collection("dailyReward")
          .where("date", "==", formattedYesterday)
          .limit(1)
          .get();

        const docCount = querySnapshot.size;
        setDocExists(docCount > 0);
        setLoading(false);

        // Check if it's the user's first time without a document for yesterday
        if (docCount === 0) {
          const earlierQuerySnapshot = await firestore()
            .collection("users")
            .doc(uid)
            .collection("dailyReward")
            .orderBy("date", "desc") // Order by date in descending order
            .limit(1)
            .get();

          const earlierDocCount = earlierQuerySnapshot.size;
          setIsFirstTimeUser(earlierDocCount === 0);
        } else {
          setIsFirstTimeUser(false);
        }
      } catch (error) {
        console.error("Error checking document:", error);
        setDocExists(null); // Set to null in case of an error
        setIsFirstTimeUser(null); // Set to null in case of an error
        setLoading(false);
      }
    };
    if (uid) {
      checkYesterdayDoc();
    }
  }, [uid]);

  return { docExists, loading, isFirstTimeUser };
};

export default useCheckYesterdayDoc;
