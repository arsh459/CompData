import { db } from "@config/firebase";
import { Bootcamp } from "@models/Bootcamp/interface";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useBootcamps = () => {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  useEffect(() => {
    const getBootcamps = async () => {
      const remoteDocs = await getDocs(collection(db, "bootcamps"));

      const remBootcamps: Bootcamp[] = [];
      for (const doc of remoteDocs.docs) {
        remBootcamps.push(doc.data() as Bootcamp);
      }

      setBootcamps(remBootcamps);
    };

    getBootcamps();
  }, []);

  return {
    bootcamps,
  };
};
