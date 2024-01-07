import { doc, setDoc } from "firebase/firestore";
import { Bootcamp } from "./interface";
import { v4 as uuidv4 } from "uuid";
import { db } from "@config/firebase";

export const createNewBootcamp = (): Bootcamp => {
  return {
    id: uuidv4(),
    includes: [],
    name: "New bootcamp",
    length: 5,
    start: Date.now() + 24 * 60 * 60 * 1000,
    creatorId: "",
    badgeId: "",
    nutritionBadgeId: "",
  };
};

export const saveBootcamp = async (bootcamp: Bootcamp) => {
  await setDoc(doc(db, "bootcamps", bootcamp.id), bootcamp);
};
