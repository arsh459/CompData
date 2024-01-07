import { createNewTestimonial } from "@models/Testimonial/createUtils";
import { Testimonial } from "@models/Testimonial/interface";
import { useCallback, useEffect, useState } from "react";
// import { db } from "@config/firebase";
// import { doc, onSnapshot } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";

// SHUBHAM: useNewTask
export const useNewTestimonial = (uid: string, id?: string) => {
  const [testimonial, setTestimonial] = useState<Testimonial>();
  useEffect(() => {
    if (id) {
      const ref = firestore().collection("testimonials").doc(id); //  doc(db, "testimonials", id);

      const unsubscribe = ref.onSnapshot((testimonial) => {
        setTestimonial(testimonial.data() as Testimonial);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setTestimonial(createNewTestimonial(uid));
    }
  }, [uid, id]);

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setTestimonial((prev) => {
        if (prev) {
          return {
            ...prev,
            media: newFiles.length ? newFiles[0] : undefined,
          };
        }
      });
    },
    []
  );

  const onMediaDelete = useCallback(() => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          media: undefined,
        };
      }
    });
  }, []);

  const onUpdateName = (newVal: string) => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          name: newVal,
        };
      }
    });
  };

  const onToggleFemale = (newVal: boolean) => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          isFemale: newVal,
        };
      }
    });
  };

  const onUpdateQuote = (newVal: string) => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          quote: newVal,
        };
      }
    });
  };

  const onUpdateAchiev = (newVal: string) => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          achievement: newVal,
        };
      }
    });
  };

  return {
    testimonial,
    setTestimonial,
    onMediaDelete,
    onMediaUpload,
    onUpdateAchiev,
    onUpdateName,
    onUpdateQuote,
    onToggleFemale,
  };
};
