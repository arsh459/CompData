import { firestore } from "firebase-admin";
import { UserInterface } from "../../User/User";

export const getNewPostUsers = async (eventId: string, cohortId?: string) => {
  if (cohortId) {
    return await getCohortUsers(cohortId);
  }

  return await getEventUsers(eventId);
};

export const getEventUsers = async (eventId: string) => {
  const userDocs = await firestore()
    .collection("users")
    .where("enrolledEvents", "array-contains", eventId)
    .get();

  const users: UserInterface[] = [];
  for (const user of userDocs.docs) {
    users.push(user.data() as UserInterface);
  }

  return users;
};
export const getCohortUsers = async (cohortId: string) => {
  const userDocs = await firestore()
    .collection("users")
    .where("enrolledCohorts", "array-contains", cohortId)
    .get();

  const users: UserInterface[] = [];
  for (const user of userDocs.docs) {
    users.push(user.data() as UserInterface);
  }

  return users;
};
