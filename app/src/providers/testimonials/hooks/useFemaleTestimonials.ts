import { Testimonial } from "@models/Testimonial/interface";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useFemaleTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [mediaTestimonials, setMediaTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const remoteDocs = await firestore()
        .collection("testimonials")
        .orderBy("priority", "asc")
        .get();

      const remoteTestimonials: Testimonial[] = [];
      const remoteMediaTestimonials: Testimonial[] = [];

      if (remoteDocs?.docs && remoteDocs.docs.length) {
        for (const test of remoteDocs.docs) {
          const testimonial = test.data() as Testimonial;

          if (testimonial.isFemale) {
            if (
              testimonial.isTransformation &&
              (testimonial.video || testimonial.thumbnail || testimonial.image)
            ) {
              remoteMediaTestimonials.push(testimonial);
            } else {
              remoteTestimonials.push(testimonial);
            }
          }
        }
      }

      setTestimonials(remoteTestimonials);
      setMediaTestimonials(remoteMediaTestimonials);
    };

    getTestimonials();
  }, []);

  return {
    testimonials,
    mediaTestimonials,
  };
};
