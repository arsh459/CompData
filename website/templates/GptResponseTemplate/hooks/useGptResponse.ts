import { archiveResponse } from "@models/AppConfiguration/Config";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@config/firebase";

export const useGptResponse = (id: string) => {
  const [gptResponse, setGptResponse] = useState<archiveResponse>();

  useEffect(() => {
    const getGptResponse = async (id: string) => {
      const remodoc = await getDocs(
        query(collection(db, "gptResponses"), where("id", "==", id))
      );

      if (remodoc && remodoc.docs && remodoc.docs.length > 0) {
        setGptResponse(remodoc.docs[0].data() as archiveResponse);
      }
    };

    getGptResponse(id);
  }, [id]);

  return {
    gptResponse,
  };
};
