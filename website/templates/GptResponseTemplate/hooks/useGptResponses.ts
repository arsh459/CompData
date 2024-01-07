import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@config/firebase";
import { archiveResponse } from "@models/AppConfiguration/Config";

export const useGptResponses = () => {
  const [gptResponses, setGptResponses] = useState<archiveResponse[]>([]);

  useEffect(() => {
    const getAllResponses = async () => {
      const docs = await getDocs(collection(db, "gptResponses"));

      const remotePrompts: archiveResponse[] = [];
      for (const doc of docs.docs) {
        remotePrompts.push(doc.data() as archiveResponse);
      }

      setGptResponses(remotePrompts);
    };

    getAllResponses();
  }, []);

  return {
    gptResponses,
  };
};
