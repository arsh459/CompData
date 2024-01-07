import { Story } from "@models/Stories/interface";

export const getStoriesOnServerSide = async () => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteDocs = await db.collection("stories").get();

  const stories: Story[] = [];

  for (const test of remoteDocs.docs) {
    const story = test.data() as Story;
    stories.push(story);
  }

  return {
    stories,
  };
};
