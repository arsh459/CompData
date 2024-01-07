import { db } from "@config/firebase";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { UserInterface } from "@models/User/User";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useLocalCreator = (uid: string) => {
  const router = useRouter();
  const [localCreator, setLocalCreator] = useState<UserInterface>();
  const [tempStr, settempStr] = useState<{
    awards: string;
  }>({ awards: "" });

  useEffect(() => {
    const getCreator = async () => {
      const creatorDoc = await getDoc(doc(db, "users", uid));

      if (creatorDoc) {
        setLocalCreator(creatorDoc.data() as UserInterface);
      }
    };

    getCreator();
  }, [uid]);

  const onUserDescriptionUpdate = (newVal?: string) => {
    setLocalCreator((prev) => {
      if (prev) {
        return {
          ...prev,
          description: newVal,
        };
      }
    });
  };

  const onAddStringToArray = (key: "awards", data: string) => {
    setLocalCreator((prev) => {
      if (prev) {
        const target = prev[key];
        if (target && target.length) {
          return { ...prev, [key]: [...target, data] };
        } else {
          return { ...prev, [key]: [data] };
        }
      }
    });
    settempStr((p) => ({ ...p, [key]: "" }));
  };

  const onRemoveStringFromArray = (key: "awards", data: string) => {
    setLocalCreator((prev) => {
      if (prev) {
        const rest = prev;
        const target = prev[key]?.filter((each) => each !== data);
        delete rest[key];

        if (target && target.length) {
          return { ...rest, [key]: target };
        } else {
          return { ...rest };
        }
      }
    });
  };

  const onUploadSingleMedia = (
    key: "profileImgWithoutBG",
    media: (CloudinaryMedia | AWSMedia | undefined)[]
  ) => {
    setLocalCreator((prev) => {
      if (prev) {
        if (media && media.length) {
          return { ...prev, [key]: media[0] };
        } else {
          return { ...prev };
        }
      }
    });
  };

  const onDeleteSingleMedia = (
    key: "profileImgWithoutBG",
    media: CloudinaryMedia | AWSMedia
  ) => {
    setLocalCreator((prev) => {
      if (prev) {
        const rest = prev;
        delete rest[key];

        return rest;
      }
    });
  };

  const onSave = async () => {
    const now = Date.now();
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, { ...localCreator, updatedOn: now }, { merge: true });
    router.back();
  };

  return {
    tempStr,
    settempStr,
    localCreator,
    onUserDescriptionUpdate,
    onAddStringToArray,
    onRemoveStringFromArray,
    onUploadSingleMedia,
    onDeleteSingleMedia,
    onSave,
  };
};
