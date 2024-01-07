import { useEffect, useState } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import crashlytics from "@react-native-firebase/crashlytics";
import { Clapper } from "@models/Post/Post";

const PAGE_SIZE = 10;
export const useFeedLikes = (
  postRef?: FirebaseFirestoreTypes.DocumentReference
) => {
  const [clappers, setClappers] = useState<Clapper[]>([]);
  const [lastVisible, setLastVisible] =
    useState<FirebaseFirestoreTypes.DocumentData | null>(null);
  const [isNextExists, setIsNextExists] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    try {
      setLoading(true);
      if (postRef) {
        const clapperRef = postRef
          .collection("clappers")
          .orderBy("lastClapped", "desc")
          .limit(PAGE_SIZE);

        clapperRef.get().then((clappers) => {
          const remoteClappers: Clapper[] = [];
          for (const clapper of clappers.docs) {
            remoteClappers.push(clapper.data() as Clapper);
          }
          if (clappers.size > 0) {
            const lastVisible = clappers.docs[clappers.size - 1];
            setLastVisible(lastVisible);
          }

          setIsNextExists(clappers.docs.length === PAGE_SIZE);
          setClappers(remoteClappers);
          setLoading(false);
        });

        return () => {
          setLoading(false);
        };
      }
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [postRef]);

  const onNext = () => {
    if (lastVisible && isNextExists && postRef) {
      setLoading(true);
      postRef
        .collection("clappers")
        .orderBy("lastClapped", "desc")
        .startAfter(lastVisible)
        .limit(PAGE_SIZE)
        .get()
        .then((clappers) => {
          const remoteClappers: Clapper[] = [];
          for (const clapper of clappers.docs) {
            remoteClappers.push(clapper.data() as Clapper);
          }
          if (clappers.size > 0) {
            const lastVisible = clappers.docs[clappers.size - 1];
            setLastVisible(lastVisible);
          } else {
            setLastVisible(null);
          }
          setIsNextExists(clappers.docs.length === PAGE_SIZE);
          setClappers((prev) => [...prev, ...remoteClappers]);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching more likes:", error);
          setLoading(false);
          setIsNextExists(false);
        });
    } else {
      setIsNextExists(false);
      setLoading(false);
    }
  };
  return {
    clappers,
    onNext,
    isNextExists,
    loading,
  };
};
