import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { Award } from "@models/awards/interface";

export const createNewAward = (): Award => {
  return {
    id: uuidv4(),
  };
};

export const saveAward = async (award: Award) => {
  await setDoc(doc(db, "awards", award.id), award);
};
