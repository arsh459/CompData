// import { GoalObject } from "./Goal";
// import { v4 as uuidv4 } from "uuid";
import {
  // arrayRemove,
  // arrayUnion,
  doc,
  // setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { GameKPITarget } from "@models/Event/Event";

// export const createGoal = (): GoalObject => {
//   return {
//     targetVal: 0,
//     unitLabel: "",
//     iconType: "reps",
//     taskId: "",
//     level: 1,
//     name: "",
//     id: uuidv4(),
//   };
// };

// export const saveGoal = async (goal: GoalObject) => {
//   await setDoc(doc(db, "goals", goal.id), goal);
// };

export const updateEventGoal = async (id: string, values: GameKPITarget[]) => {
  await updateDoc(doc(db, "sbEvents", id), {
    [`configuration.kpis`]: values,
  });
};

// export const removeEventGoal = async (id: string, kpi: string) => {
//   await updateDoc(doc(db, "sbEvents", id), {
//     [`configuration.kpis`]: arrayRemove(kpi),
//   });
// };
