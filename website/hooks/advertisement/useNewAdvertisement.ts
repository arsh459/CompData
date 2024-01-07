import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useCallback, useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { createNewAdvertisement } from "@models/AdvertisementDoc/createUtils";
import { AdvertisementDoc } from "@models/AdvertisementDoc";

export const useNewAdvertisement = (
  eventId: string,
  advertisementId?: string
) => {
  const [advertisementDoc, setAdvertisementDoc] = useState<AdvertisementDoc>();

  useEffect(() => {
    if (advertisementId) {
      const ref = doc(
        doc(db, "sbEvents", eventId),
        "advertisementDoc",
        advertisementId
      );

      const unsubscribe = onSnapshot(ref, (advertisement) => {
        setAdvertisementDoc(advertisement.data() as AdvertisementDoc);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setAdvertisementDoc(createNewAdvertisement());
    }
  }, [eventId, advertisementId]);

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setAdvertisementDoc((prev) => {
        if (prev) {
          return {
            ...prev,
            image: newFiles.length ? newFiles[0] : undefined,
          };
        }
      });
    },
    []
  );

  const onMediaDelete = useCallback(() => {
    setAdvertisementDoc((prev) => {
      if (prev) {
        return {
          ...prev,
          image: undefined,
        };
      }
    });
  }, []);

  const onUpdateLink = (newVal: string) => {
    setAdvertisementDoc((prev) => {
      if (prev) {
        return {
          ...prev,
          link: newVal,
        };
      }
    });
  };

  return {
    advertisementDoc,
    onMediaDelete,
    onMediaUpload,
    onUpdateLink,
  };
};
