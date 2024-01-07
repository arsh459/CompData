import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "@config/firebase";
import { Story } from "./interface";

export const createNewStories = (): Story => {
  const now = Date.now();
  return {
    createdOn: now,
    updatedOn: now,

    id: uuidv4(),
    priority: 0,
  };
};

export const saveNewStories = async (story: Story) => {
  const now = Date.now();
  const eventRef = doc(db, "stories", story.id);
  await setDoc(eventRef, { ...story, updatedOn: now });
};
