import { SbPlans } from "@models/SbPlans/interface";
import { Testimonial } from "@models/Testimonial/interface";

export const getSbPlans = async () => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteDocs = await db
    .collection("sbplans")
    .orderBy("priority", "asc")
    .get();

  const remoteSbPlans: SbPlans[] = [];

  for (const doc of remoteDocs.docs) {
    const activity = doc.data() as SbPlans;
    remoteSbPlans.push(activity);
  }

  return remoteSbPlans;
};

export const getPriorityTestimonialsOnServerSide = async () => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  const remoteDocs = await db
    .collection("testimonials")
    // .where("isFemale", "==", true)
    .orderBy("priority", "asc")
    // .limit(30)
    .get();

  const testimonials: Testimonial[] = [];
  const videoTestimonials: Testimonial[] = [];

  for (const test of remoteDocs.docs) {
    const testimonial = test.data() as Testimonial;

    if (testimonial.isTransformation && testimonial.youtubeId) {
      videoTestimonials.push(testimonial);
    } else if (testimonial.isFemale) {
      testimonials.push(testimonial);
    }
  }

  // console.log("tes", testimonials.length);

  return {
    testimonials,
    videoTestimonials,
  };
};
