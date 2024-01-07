import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { collection, query, limit, orderBy, getDocs } from "firebase/firestore";
import { Testimonial } from "@models/Testimonial/interface";

export const useTestimonials = (num?: number) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [videoTestimonials, setVideoTestimonials] = useState<Testimonial[]>([]);
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  useEffect(() => {
    const getTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("priority", "asc"),
          limit(numToFetch ? numToFetch : 100)
        );

        const testimonialsDocs = await getDocs(q);
        const remoteTestimonials: Testimonial[] = [];
        const remoteVideoTestimonials: Testimonial[] = [];

        for (const doc of testimonialsDocs.docs) {
          const testimonial = doc.data() as Testimonial;
          if (testimonial.isTransformation && testimonial.youtubeId) {
            remoteVideoTestimonials.push(testimonial);
          } else if (testimonial.isFemale) {
            remoteTestimonials.push(testimonial);
          }
        }

        setNextMembersExist(remoteTestimonials.length === numToFetch);
        setVideoTestimonials(remoteVideoTestimonials);
        setTestimonials(remoteTestimonials);
      } catch (error) {
        console.log("error", error);
      }
    };

    getTestimonials();
  }, [numToFetch]);

  const onNext = () => {
    setToFetch((prev) => (prev ? prev + 10 : prev));
  };

  return {
    onNext,
    nextExists,
    testimonials,
    videoTestimonials,
  };
};
