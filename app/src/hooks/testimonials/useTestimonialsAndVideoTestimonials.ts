import { Testimonial } from "@models/Testimonial/interface";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useTestimonialsAndVideoTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [videoTestimonials, setVideoTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const getTestimonials = async () => {
      const remoteDocs = await firestore()
        .collection("testimonials")
        .orderBy("priority", "asc")
        .get();

      const remoteTestimonials: Testimonial[] = [];
      const remoteVideoTestimonials: Testimonial[] = [];

      if (remoteDocs.docs.length) {
        for (const test of remoteDocs.docs) {
          const testimonial = test.data() as Testimonial;

          if (testimonial.isTransformation && testimonial.video) {
            remoteVideoTestimonials.push(testimonial);
          } else {
            remoteTestimonials.push(testimonial);
          }
        }
      }

      setTestimonials(remoteTestimonials);
      setVideoTestimonials(remoteVideoTestimonials);
    };

    getTestimonials();
  }, []);

  return {
    testimonials,
    videoTestimonials,
  };
};
