import { Testimonial } from "@models/Testimonial/interface";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "@config/firebase";

export const createNewTestimonial = (uid: string): Testimonial => {
  const now = Date.now();
  return {
    createdOn: now,
    updatedOn: now,
    submittedBy: uid,
    id: uuidv4(),
  };
};

export const saveNewTestimonial = async (testimonial: Testimonial) => {
  const now = Date.now();
  const eventRef = doc(db, "testimonials", testimonial.id);
  await setDoc(eventRef, { ...testimonial, updatedOn: now }, { merge: true });
};
