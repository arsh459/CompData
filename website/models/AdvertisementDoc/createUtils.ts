import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "@config/firebase";
import { AdvertisementDoc } from ".";

export const createNewAdvertisement = (): AdvertisementDoc => {
  const now = Date.now();
  return {
    id: uuidv4(),
    createdOn: now,
    updatedOn: now,
    link: "",
  };
};

export const saveNewAdvertisement = async (
  eventId: string,
  advertisement: AdvertisementDoc
) => {
  const now = Date.now();
  const eventRef = doc(
    doc(db, "sbEvents", eventId),
    "advertisementDoc",
    advertisement.id
  );
  await setDoc(eventRef, { ...advertisement, updatedOn: now });
};
