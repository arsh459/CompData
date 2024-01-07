import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "config/firebase";
import { EventInterface, InviteCode } from "./Event";
import { WorkoutSeries } from "@models/Workouts/Series";
import { Workout } from "@models/Workouts/Workout";

const checkCodeValidity = (code: InviteCode) => {
  if (typeof code.maxUse === "number" && typeof code.timesUsed === "number") {
    if (code.maxUse > code.timesUsed) {
      return true;
    } else {
      return false;
    }
  }

  return true;
};

export const checkoutCodeVerify = async (eventId: string, id: string) => {
  if (id.trim().toLowerCase() === "socialboatwfh") {
    return {
      codeValid: true,
      discount: 1,
      codeId: "producthunt",
    };
  }

  //   console.log("eventId", eventId);
  // console.log("id", id.trim().toLowerCase());

  const eventRef = doc(db, `sbEvents`, eventId);
  //   console.log("eventRef", eventRef);
  const inviteRef = collection(eventRef, "inviteCodes");

  const inviteQuery = query(
    inviteRef,
    where("code", "==", id.trim().toLowerCase())
  );

  // console.log("inviteQuery", inviteQuery);

  const querySnapshot = await getDocs(inviteQuery);
  if (querySnapshot.docs.length > 0) {
    const codeId = querySnapshot.docs[0].id;
    const inviteCode = querySnapshot.docs[0].data() as InviteCode;

    return {
      codeValid: checkCodeValidity(inviteCode),
      codeId: codeId,
      discount: inviteCode.discount ? inviteCode.discount : 1,
    };
  }
  //   console.log("querySnapshot", querySnapshot);
  return {
    codeValid: false,
    discount: 0,
    codeId: "",
  };
};

export const videoKeyVerify = async (
  key: string,
  id: string,
  seriesId: string
) => {
  //   console.log("eventId", eventId);
  //   console.log("id", id.trim().toLowerCase());
  //   console.log("eventRef", eventRef);
  const keyRef = collection(doc(db, "workouts", seriesId), "exercises");

  const eventKeyRef = query(
    keyRef,
    where("videoKey", "==", key.trim().toLowerCase())
  );

  //   console.log("inviteQuery", inviteQuery);

  const querySnapshot = await getDocs(eventKeyRef);

  if (querySnapshot.docs.length === 0) {
    return true;
  }

  if (querySnapshot.docs.length === 1) {
    return (querySnapshot.docs[0].data() as Workout).id === id ? true : false;
  }

  //   console.log("querySnapshot", querySnapshot);
  return false;
};

export const liveKeyVerify = async (
  key: string,
  id: string,
  seriesId: string
) => {
  // console.log("eventId", id);
  //   console.log("id", id.trim().toLowerCase());
  //   console.log("eventRef", eventRef);
  const keyRef = collection(doc(db, "workouts", seriesId), "lives");

  const eventKeyRef = query(
    keyRef,
    where("liveKey", "==", key.trim().toLowerCase())
  );

  //   console.log("inviteQuery", inviteQuery);

  const querySnapshot = await getDocs(eventKeyRef);

  if (querySnapshot.docs.length === 0) {
    return true;
  }

  if (querySnapshot.docs.length === 1) {
    return (querySnapshot.docs[0].data() as Workout).id === id ? true : false;
  }

  //   console.log("querySnapshot", querySnapshot);
  return false;
};

export const planKeyVerify = async (
  key: string,
  id: string,
  seriesId: string
) => {
  // console.log("eventId", id);
  //   console.log("id", id.trim().toLowerCase());
  //   console.log("eventRef", eventRef);
  const keyRef = collection(doc(db, "workouts", seriesId), "nutrition");

  const eventKeyRef = query(
    keyRef,
    where("planKey", "==", key.trim().toLowerCase())
  );

  //   console.log("inviteQuery", inviteQuery);

  const querySnapshot = await getDocs(eventKeyRef);

  if (querySnapshot.docs.length === 0) {
    return true;
  }

  if (querySnapshot.docs.length === 1) {
    return (querySnapshot.docs[0].data() as Workout).id === id ? true : false;
  }

  //   console.log("querySnapshot", querySnapshot);
  return false;
};

export const seriesKeyVerify = async (key: string, id: string) => {
  //   console.log("eventId", eventId);
  //   console.log("id", id.trim().toLowerCase());
  //   console.log("eventRef", eventRef);
  const keyRef = collection(db, "workouts");

  const eventKeyRef = query(
    keyRef,
    where("seriesKey", "==", key.trim().toLowerCase())
  );

  //   console.log("inviteQuery", inviteQuery);

  const querySnapshot = await getDocs(eventKeyRef);

  if (querySnapshot.docs.length === 0) {
    return true;
  }

  if (querySnapshot.docs.length === 1) {
    return (querySnapshot.docs[0].data() as WorkoutSeries).id === id
      ? true
      : false;
  }

  //   console.log("querySnapshot", querySnapshot);
  return false;
};

export const eventKeyVerify = async (key: string, id: string) => {
  //   console.log("eventId", eventId);
  //   console.log("id", id.trim().toLowerCase());
  //   console.log("eventRef", eventRef);
  const keyRef = collection(db, "sbEvents");

  const eventKeyRef = query(
    keyRef,
    where("eventKey", "==", key.trim().toLowerCase())
  );

  //   console.log("inviteQuery", inviteQuery);

  const querySnapshot = await getDocs(eventKeyRef);

  if (querySnapshot.docs.length === 0) {
    return true;
  }

  if (querySnapshot.docs.length === 1) {
    return (querySnapshot.docs[0].data() as EventInterface).id === id
      ? true
      : false;
  }

  //   console.log("querySnapshot", querySnapshot);
  return false;
};
