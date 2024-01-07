import { Testimonial } from "@models/Testimonial/interface";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
// import { doc, setDoc } from "@firebase/firestore";
// import { db } from "@config/firebase";
import firestore from "@react-native-firebase/firestore";

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
  const eventRef = firestore().collection("testimonials").doc(testimonial.id); //doc(db, "testimonials", testimonial.id);
  await eventRef.set({ ...testimonial, updatedOn: now });
};
