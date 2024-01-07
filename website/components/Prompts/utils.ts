import { gptPrompts } from "@models/AppConfiguration/Config";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@config/firebase";
export const saveNewPrompt = async (gptPrompt: gptPrompts) => {
  try {
    await setDoc(doc(db, "gptPrompts", gptPrompt.id), gptPrompt);
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const validateGptPrompt = (gptPrompt: gptPrompts) => {
  // if (gptPrompt.prompt.length === 0) {
  //   return false;
  // }

  let filter = gptPrompt.prompt.filter((each) => {
    return !each.content;
  });
  if (filter.length > 0) {
    return false;
  }
  if (!gptPrompt.type) {
    return false;
  }

  return true;
};
