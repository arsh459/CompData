import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useCallback, useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Story } from "@models/Stories/interface";
import { createNewStories } from "@models/Stories/createUtils";

export const useNewStories = (uid: string, id?: string) => {
  const [stories, setStories] = useState<Story>();
  useEffect(() => {
    const getStoryDetail = async () => {
      console.log({ id });
      if (id) {
        const document = await getDoc(doc(db, "stories", id));
        const data = document.data();
        if (data) {
          const sd = data as Story;
          setStories(sd);
        } else {
          setStories(createNewStories());
        }
      }
    };
    getStoryDetail();
  }, [uid, id]);

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setStories((prev) => {
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
    setStories((prev) => {
      if (prev) {
        return {
          ...prev,
          media: undefined,
        };
      }
    });
  }, []);

  const onUpdateTitle = (newVal: string) => {
    setStories((prev) => {
      if (prev) {
        return {
          ...prev,
          title: newVal,
        };
      }
    });
  };
  const onUpdateLink = (newVal: string) => {
    setStories((prev) => {
      if (prev) {
        return {
          ...prev,
          link: newVal,
        };
      }
    });
  };
  const onUpdateText = (newVal: string) => {
    setStories((prev) => {
      if (prev) {
        return {
          ...prev,
          text: newVal,
        };
      }
    });
  };
  const onUpdatePriority = (newVal: string) => {
    setStories((prev) => {
      if (prev) {
        return {
          ...prev,
          priority: parseInt(newVal),
        };
      }
    });
  };

  return {
    stories,
    setStories,
    onMediaDelete,
    onMediaUpload,
    onUpdateText,
    onUpdateTitle,
    onUpdatePriority,
    onUpdateLink,
  };
};
