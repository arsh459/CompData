import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";
import { Testimonial } from "@models/Testimonial/interface";

export const useTestimonialsV2 = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const remoteDocs = await firestore()
        .collection("testimonials")
        .where("isFemale", "==", true)
        .orderBy("priority", "asc")
        .get();

      const remoteTestimonials: Testimonial[] = [];

      if (remoteDocs.docs.length) {
        for (const test of remoteDocs.docs) {
          const testimonial = test.data() as Testimonial;

          if (testimonial.isFemale) {
            remoteTestimonials.push(testimonial);
          }
        }
      }

      setTestimonials(remoteTestimonials);
    };

    getTestimonials();
  }, []);

  return {
    testimonials,
  };
};
