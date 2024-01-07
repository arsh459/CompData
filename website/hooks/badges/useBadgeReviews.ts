import { useEffect, useState } from "react";
import { db } from "@config/firebase";
import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { uuidv4 } from "@firebase/util";
import { CourseReview } from "@models/Prizes/PrizeV2";

export const useBadgeReviews = (gameId: string, prizeId: string) => {
  const [reviews, setReviews] = useState<CourseReview[]>([]);

  useEffect(() => {
    if (prizeId && gameId) {
      const ref = collection(
        doc(doc(db, "sbEvents", gameId), "badges", prizeId),
        "reviews"
      );

      const list = onSnapshot(ref, (faqList) => {
        const remList: CourseReview[] = [];
        for (const doc of faqList.docs) {
          remList.push(doc.data() as CourseReview);
        }

        setReviews(remList);
      });

      return () => {
        list();
      };
    }
  }, [gameId, prizeId]);

  const addReview = async () => {
    const newReview: CourseReview = {
      name: "",
      text: "",
      id: uuidv4(),
    };

    await setDoc(
      doc(
        doc(doc(db, "sbEvents", gameId), "badges", prizeId),
        "reviews",
        newReview.id
      ),
      newReview
    );
  };

  const updateReview = async (reviewToUpdate: CourseReview) => {
    await updateDoc(
      doc(
        doc(doc(db, "sbEvents", gameId), "badges", prizeId),
        "reviews",
        reviewToUpdate.id
      ),
      { ...reviewToUpdate }
    );
  };

  const deleteReview = async (id: string) => {
    await deleteDoc(
      doc(doc(doc(db, "sbEvents", gameId), "badges", prizeId), "reviews", id)
    );
  };

  const updateLocalReview = (
    index: number,
    key: "name" | "text",
    value: string
  ) => {
    // console.log("index", index, key, value);
    setReviews((p) => {
      return [
        ...p.slice(0, index),
        {
          ...p[index],
          [key]: value,
        },
        ...p.slice(index + 1, p.length),
      ];
    });
  };

  return {
    reviews,
    updateReview,
    updateLocalReview,
    deleteReview,
    addReview,
  };
};
