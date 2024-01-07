import { db } from "@config/firebase";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { SbPlans } from "./interface";

export const createNewSbPlan = (): SbPlans => {
  return {
    id: uuidv4(),
    cost: 0,
    currency: "INR",
    usdCost: 0,
    usdBaseCost: 0,
    duration: "Monthly",
    appSubId: "0cPvVrnphNJBnvvOM9Zf",
    descList: [],
  };
};

export const saveNewSbPlan = async (sbplan: SbPlans) => {
  const eventRef = doc(db, "sbplans", sbplan.id);
  await setDoc(eventRef, { ...sbplan });
};
