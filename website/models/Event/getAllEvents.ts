import { Cohort, EventInterface } from "./Event";

export const getUserEvents = async (
  db: FirebaseFirestore.Firestore,
  uid: string
) => {
  const userEvents = await db
    .collection("sbEvents")
    .where("ownerUID", "==", uid)
    .orderBy("updatedOn", "desc")
    .get();

  // console.log("userEvents", userEvents);

  const sbEvents: EventInterface[] = [];
  for (const userEvent of userEvents.docs) {
    sbEvents.push(userEvent.data() as EventInterface);
  }

  return sbEvents;
};

export const getUserEventCohorts_server = async (
  db: FirebaseFirestore.Firestore,
  eventId: string
) => {
  const userCohorts = await db
    .collection("sbEvents")
    .doc(eventId)
    .collection("cohorts")
    .get();

  // console.log("userEvents", userEvents);

  const remoteCohorts: { [cohortId: string]: Cohort } = {};
  for (const cohort of userCohorts.docs) {
    const tmp = cohort.data() as Cohort;
    remoteCohorts[tmp.id] = tmp;
  }

  return remoteCohorts;
};
