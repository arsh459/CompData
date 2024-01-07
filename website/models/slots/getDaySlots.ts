import { db } from "@config/firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  Query,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { dayTypes, SlotBooking, SlotCollection } from "./Slot";
import { v4 as uuidv4 } from "uuid";
import { slotP } from "@hooks/slots/useBookings";

export const getDaySlots = async (day: string) => {
  const remoteDocs = await getDocs(
    query(collection(db, "slots"), where("day", "==", day))
  );

  if (remoteDocs.docs.length) {
    return remoteDocs.docs[0].data() as SlotCollection;
  }

  return undefined;
};

export const getStartEnd = (str: slotP) => {
  const st = new Date().setHours(0, 0, 0, 0);
  // console.log("str", str);
  if (str === "Today") {
    const en = st + 24 * 60 * 60 * 1000;

    return {
      st,
      en,
    };
  } else if (str === "Tomorrow") {
    return {
      st: st + 24 * 60 * 60 * 1000,
      en: st + 2 * 24 * 60 * 60 * 1000,
    };
  } else if (str === "Later") {
    return {
      st: st + 2 * 24 * 60 * 60 * 1000,
    };
  } else if (str === "Yesterday") {
    return {
      st: st - 24 * 60 * 60 * 1000,
      en: st,
    };
  } else if (str === "Day before") {
    return {
      st: st - 2 * 24 * 60 * 60 * 1000,
      en: st - 24 * 60 * 60 * 1000,
    };
  } else {
    return {
      en: st,
    };
  }
};

export const getAllBookings = async (slot: slotP) => {
  const { st, en } = getStartEnd(slot);

  // console.log("st", st, new Date(st));
  // console.log("en", en, new Date(en));

  let q: Query | undefined = undefined;
  if (st && en) {
    q = query(
      collectionGroup(db, "slotBooking"),
      where("startUnix", ">=", st),
      where("startUnix", "<=", en)
    );
  } else if (st && !en) {
    q = query(collectionGroup(db, "slotBooking"), where("startUnix", ">=", st));
  } else if (!st && en) {
    q = query(collectionGroup(db, "slotBooking"), where("startUnix", "<=", en));
  } else {
    q = query(collectionGroup(db, "slotBooking"));
  }

  const remoteBookings = await getDocs(q);

  const books: SlotBooking[] = [];
  for (const book of remoteBookings.docs) {
    // console.log(book.);
    const slotId = book.ref.path.split("/")[1];

    books.push({ ...(book.data() as SlotBooking), slotId });
  }

  return books.sort((a, b) => b.startUnix - a.startUnix);
};

export const getSlotBooking = async (slotId: string, bookingId: string) => {
  const remoteDoc = await getDoc(
    doc(doc(db, "slots", slotId), "slotBooking", bookingId)
  );

  if (remoteDoc.data()) {
    return remoteDoc.data() as SlotBooking;
  }
  return undefined;
};

export const saveSlotCollection = async (col: SlotCollection) => {
  await setDoc(doc(db, "slots", col.id), col);
};

export const createNewSlotCollection = (day: dayTypes): SlotCollection => {
  return {
    id: uuidv4(),
    slots: [],
    day: day,
  };
};
