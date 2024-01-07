// import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
import { LevelInterface } from "@models/Level/interface";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

// export const createNewLevel = (): LevelInterface => {
//   return {
//     id: uuidv4(),
//   };
// };

export const saveLevel = async (level: LevelInterface) => {
  await setDoc(
    doc(doc(db, "sbEvents", TEAM_ALPHABET_GAME), "level", level.id),
    level
  );
};
