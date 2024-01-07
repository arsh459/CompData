import { useEffect, useState } from "react";
import { gptPrompts } from "../Config";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@config/firebase";

export const useGPTPrompts = () => {
  const [gptPrompts, setGPTPrompts] = useState<gptPrompts[]>([]);

  useEffect(() => {
    const getAllPrompts = async () => {
      const docs = await getDocs(collection(db, "gptPrompts"));

      const remotePrompts: gptPrompts[] = [];
      for (const doc of docs.docs) {
        remotePrompts.push(doc.data() as gptPrompts);
      }

      setGPTPrompts(remotePrompts);
    };

    getAllPrompts();
  }, []);

  return {
    gptPrompts,
  };
};
