import { algoliaType } from "@models/AppSearch/interface";
import firestore from "@react-native-firebase/firestore";

export const addToPreviousSearches = async (
  userId?: string,
  newValue?: string
) => {
  if (!userId || !newValue) {
    console.error("Invalid userId or newValue provided");
    return;
  }

  try {
    const userRef = firestore().collection("users").doc(userId);

    const userDoc = await userRef.get();

    const previousSearches = userDoc.data()?.previousSearches || [];

    if (previousSearches.length >= 5) {
      previousSearches.pop();
    }

    previousSearches.unshift(newValue);

    await userRef.update({
      previousSearches: previousSearches,
    });
  } catch (error) {
    console.error("Error adding to previousSearches:", error);
  }
};

export const taskTypesToFilterObj: Partial<Record<algoliaType, string>> = {
  all: "#324A6D",
  workout: "#324A6D",
  recipee: "#6D4331",
  reel: "#4F3150",
  blog: "#343150",
};
