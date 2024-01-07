import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { createNewTestimonial } from "@models/Testimonial/createUtils";
import { Testimonial } from "@models/Testimonial/interface";
import { useCallback, useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export type mediaType = "media" | "video" | "image" | "thumbnail";

// SHUBHAM: useNewTask
export const useNewTestimonial = (uid: string, id?: string) => {
  const [testimonial, setTestimonial] = useState<Testimonial>();
  useEffect(() => {
    if (id) {
      const ref = doc(db, "testimonials", id);

      const unsubscribe = onSnapshot(ref, (testimonial) => {
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
    (newFiles: (CloudinaryMedia | AWSMedia)[], key: mediaType) => {
      setTestimonial((prev) => {
        if (prev) {
          const rest = { ...prev };
          delete rest[key];
          return newFiles.length ? { ...rest, [key]: newFiles[0] } : rest;
        }
      });
    },
    []
  );

  const onMediaDelete = useCallback((key: mediaType) => {
    setTestimonial((prev) => {
      if (prev) {
        const rest = { ...prev };
        delete rest[key];
        return rest;
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
  const onUpdateYoutubeId = (newVal: string) => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          youtubeId: newVal,
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
  const onToggleTransformation = (newVal: boolean) => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          isTransformation: newVal,
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

  const onUpdateShortAchiev = (newVal: string) => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          shortAchievement: newVal,
        };
      }
    });
  };

  const onUpdatePriority = (newVal: string) => {
    setTestimonial((prev) => {
      if (prev) {
        return {
          ...prev,
          priority: parseInt(newVal),
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
    onToggleTransformation,
    onUpdateYoutubeId,
    onUpdatePriority,
    onUpdateShortAchiev,
  };
};
