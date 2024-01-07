import { useEffect, useState } from "react";
import crashlytics from "@react-native-firebase/crashlytics";
import firestore from "@react-native-firebase/firestore";
import { Testimonial } from "@models/Testimonial/interface";

export const useTestimonials = (num: number) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [numToFetch, setToFetch] = useState<number | undefined>(num);
  const [nextExists, setNextMembersExist] = useState<boolean>(false);

  useEffect(() => {
    try {
      const q = firestore()
        .collection("testimonials") // query(
        // collection(db, "testimonials"),
        // where("createdOn", ">=", after),
        .orderBy("priority", "asc")
        .limit(numToFetch ? numToFetch : 100);
      // );

      const unsubscribe = q.onSnapshot((testimonials) => {
        const remoteActivities: Testimonial[] = [];

        for (const doc of testimonials.docs) {
          const activity = doc.data() as Testimonial;
          if (activity.quote) {
            remoteActivities.push(activity);
          }
        }

        setNextMembersExist(remoteActivities.length === numToFetch);

        setTestimonials(remoteActivities);
      });

      return () => {
        unsubscribe();
      };
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [numToFetch]);

  const onNext = () => {
    setToFetch((prev) => (prev ? prev + 10 : prev));
  };

  return {
    onNext,
    nextExists,
    testimonials,
  };
};
