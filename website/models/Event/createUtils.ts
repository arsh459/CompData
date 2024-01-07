import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import {
  Cohort,
  EventInterface,
  LocalCohort,
  LocalSession,
  sessionTypes,
  SessionV2,
} from "./Event";
import { v4 as uuidv4 } from "uuid";
import {
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { db } from "@config/firebase";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { generateFormattedKey } from "@models/User/userKey";

export const createCohort = (
  cohortSize: number,
  cohortName: string,
  uid: string,
  pinned: boolean
): Cohort => {
  const date = new Date().toUTCString();
  return {
    cohortSize: cohortSize,
    registerBy: date,
    cohortStarts: date,
    // cohortStarts: date,
    seatsBooked: 0,
    cohortName: cohortName,
    id: uuidv4(),
    cohortKey: generateFormattedKey(cohortName),
    // sessions: [],
    uid: uid,
    pinned,
  };
};

export const pinCohort = async (
  eventId: string,
  cohortId: string,
  cohorts: LocalCohort[]
) => {
  for (const cohort of cohorts) {
    const eventRef = doc(db, "sbEvents", eventId);
    const cohortRef = doc(eventRef, "cohorts", cohort.id);
    updateDoc(cohortRef, {
      pinned: cohortId === cohort.id ? true : false,
    });
  }
};

export const updateCohortDateValue = async (
  eventId: string,
  cohortId: string,
  key: "registerBy" | "cohortStarts",
  dateValue: Date | null
) => {
  if (key === "registerBy" || key === "cohortStarts") {
    const eventRef = doc(db, "sbEvents", eventId);
    const cohortRef = doc(eventRef, "cohorts", cohortId);

    updateDoc(cohortRef, {
      [key]: dateValue ? dateValue.toUTCString() : null,
    });
  }
};

export const updateCohortSessionValue = async (
  eventId: string,
  cohortId: string,
  sessions?: LocalSession[] | undefined
) => {
  if (sessions) {
    const eventRef = doc(db, "sbEvents", eventId);
    const cohortRef = doc(eventRef, "cohorts", cohortId);
    updateDoc(cohortRef, {
      sessions: sessions.map((item) => {
        return {
          ...item,
          startTime: item.startTime ? item.startTime.toUTCString() : null,
        };
      }),
    });
  }
};

export const updateCohortTextValue = async (
  eventId: string,
  cohortId: string,
  key: "cohortSize" | "cohortJoinURL",
  value: number | string | null
) => {
  if (typeof value === "number" || typeof value === "string") {
    const eventRef = doc(db, "sbEvents", eventId);
    const cohortRef = doc(eventRef, "cohorts", cohortId);

    await updateDoc(cohortRef, {
      [key]: value,
    });
  }
};

export const deleteCohort = async (eventId: string, cohortId: string) => {
  const eventRef = doc(db, "sbEvents", eventId);
  const cohortRef = doc(eventRef, "cohorts", cohortId);

  await deleteDoc(cohortRef);
};

export const saveCohort = async (eventId: string, cohort: Cohort) => {
  const eventRef = doc(db, "sbEvents", eventId);
  const cohortRef = doc(eventRef, "cohorts", cohort.id);

  await setDoc(cohortRef, cohort);
};

export const createNewEvent = (
  name: string,
  description: string,
  currency: "₹",
  media: CloudinaryMedia[],
  cost: number,
  ownerUID: string
): EventInterface => {
  const timestamp = new Date().getTime();
  return {
    name: name,
    id: uuidv4(),
    description: description,
    currency: currency,
    media: media,
    cost: cost,
    ownerUID: ownerUID,
    createdOn: timestamp,
    updatedOn: timestamp,
    joinURL: "",
    earnings: 0,
    students: 0,
    views: 0,
  };
};

export const updateListValue = async (
  id: string,
  key: "whoIsItFor" | "faq" | "programDetails",
  value: ListItem[]
) => {
  await updateDoc(doc(db, "sbEvents", id), {
    [key]: value,
    updatedOn: new Date().getTime(),
  });
};

export const updateEventName = async (
  id: string,
  name: string,
  remoteEventKey?: string
) => {
  await updateDoc(doc(db, "sbEvents", id), {
    name: name,
    ...(!remoteEventKey ? { eventKey: generateEventKey(name) } : {}),
    updatedOn: new Date().getTime(),
  });
};

export const updateEventStringValue = async (
  id: string,
  key:
    | "name"
    | "description"
    | "currency"
    | "eventType"
    | "cost"
    | "joinURL"
    | "courseGoal"
    | "googleTitle"
    | "googleDescription"
    | "eventKey",
  value: string | number
) => {
  await updateDoc(doc(db, "sbEvents", id), {
    [key]: value,
    updatedOn: new Date().getTime(),
  });
};

export const updateEventSchedule = async (id: string, value: Date[]) => {
  await updateDoc(doc(db, "sbEvents", id), {
    eventDateTimeList: value.map((item) => item.toUTCString()),
    updatedOn: new Date().getTime(),
  });
};

export const updateEventMedia = async (
  id: string,
  newMedia: (CloudinaryMedia | AWSMedia)[]
) => {
  await updateDoc(doc(db, "sbEvents", id), {
    media: newMedia,
    updatedOn: new Date().getTime(),
  });
};

export const updateEventThumbnail = async (
  id: string,
  newMedia: CloudinaryMedia | AWSMedia | undefined
) => {
  if (newMedia) {
    await updateDoc(doc(db, "sbEvents", id), {
      thumbnail: newMedia,
      updatedOn: new Date().getTime(),
    });
  } else {
    await updateDoc(doc(db, "sbEvents", id), {
      thumbnail: deleteField(),
      updatedOn: new Date().getTime(),
    });
  }
};

export const updateSEOImg = async (
  id: string,
  newMedia: CloudinaryMedia | AWSMedia
) => {
  await updateDoc(doc(db, "sbEvents", id), {
    googleSEOImg: newMedia,
    updatedOn: new Date().getTime(),
  });
};

export const removeSEOImg = async (id: string) => {
  await updateDoc(doc(db, "sbEvents", id), {
    googleSEOImg: deleteField(),
    updatedOn: new Date().getTime(),
  });
};

export const addEventMedia = async (
  id: string,
  newFile: CloudinaryMedia | AWSMedia
) => {
  await updateDoc(doc(db, "sbEvents", id), {
    media: arrayUnion(newFile),
    updatedOn: new Date().getTime(),
  });
};

export const updateListItemMedia = async (
  id: string,
  newList: ListItem[],
  key: "programDetails"
) => {
  await updateDoc(doc(db, "sbEvents", id), {
    [key]: newList,
    updatedOn: new Date().getTime(),
  });
};

export const updateProgram = async (id: string, program: SessionV2[]) => {
  await updateDoc(doc(db, "sbEvents", id), {
    program: program,
    updatedOn: new Date().getTime(),
  });
};

export const saveNewEvent = async (newEvent: EventInterface) => {
  await setDoc(doc(db, "sbEvents", newEvent.id), newEvent);
};

export const deleteEvent = async (eventId: string) => {
  await deleteDoc(doc(db, "sbEvents", eventId));
};

export const generateEventKey = (newName: string) => {
  const withoutHyphen = newName.trim().replace(/-/, " ");
  const listingNameUniformSpaces = withoutHyphen.replace(/\s\s+/g, " ");
  const finalKey = listingNameUniformSpaces.replace(/\s+/g, "-").toLowerCase();

  return `${finalKey}-${Math.floor(Math.random() * 90000) + 10000}`;
};

export const createNewSessionV2 = (
  index?: number,
  sessionType?: sessionTypes,
  cohortId?: string
): SessionV2 => {
  return {
    id: uuidv4(),
    sessionType: sessionType ? sessionType : "post",
    updatedOn: Date.now(),
    name: index ? `Session-${index}` : "",
    description: "",
    live: true,
    free: false,
    ...(cohortId ? { cohortId: cohortId } : {}),
    ...(index ? { dayNumber: index } : {}),
  };
};
