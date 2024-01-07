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

import { FAQDATA } from "@templates/joinBoatTemplate/utils";
import { uuidv4 } from "@firebase/util";

export const useBadgeFAQs = (gameId: string, prizeId: string) => {
  const [faq, setFAQ] = useState<FAQDATA[]>([]);

  useEffect(() => {
    if (prizeId && gameId) {
      const ref = collection(
        doc(doc(db, "sbEvents", gameId), "badges", prizeId),
        "faq"
      );

      const list = onSnapshot(ref, (faqList) => {
        const remList: FAQDATA[] = [];
        for (const doc of faqList.docs) {
          remList.push(doc.data() as FAQDATA);
        }

        setFAQ(remList);
      });

      return () => {
        list();
      };
    }
  }, [gameId, prizeId]);

  const addFAQ = async () => {
    const newFAQ: FAQDATA = {
      heading: "",
      text: "",
      id: uuidv4(),
    };

    await setDoc(
      doc(
        doc(doc(db, "sbEvents", gameId), "badges", prizeId),
        "faq",
        newFAQ.id
      ),
      newFAQ
    );
  };

  const updateFAQ = async (faqToUpdate: FAQDATA) => {
    await updateDoc(
      doc(
        doc(doc(db, "sbEvents", gameId), "badges", prizeId),
        "faq",
        faqToUpdate.id
      ),
      { ...faqToUpdate }
    );
  };

  const deleteFAQ = async (id: string) => {
    await deleteDoc(
      doc(doc(doc(db, "sbEvents", gameId), "badges", prizeId), "faq", id)
    );
  };

  const updateLocalFAQ = (
    index: number,
    key: "heading" | "text",
    value: string
  ) => {
    // console.log("index", index, key, value);
    setFAQ((p) => {
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
    faq,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    updateLocalFAQ,
  };
};
