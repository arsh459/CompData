import { useCallback, useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Award } from "@models/awards/interface";
import { createNewAward } from "./createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export type mediaKeys = "img" | "lockedImg";
export type stringKeys = "groupId" | "name" | "description" | "themeColor";
export type stringArrayKeys = "howToAchieve";

export const useAward = (Id: string) => {
  const [award, setAward] = useState<Award>();

  // console.log("award", award);

  useEffect(() => {
    const getRemoteAward = async () => {
      if (Id) {
        const remaward = await getDoc(doc(db, "awards", Id));

        const remoteAward = remaward.data() as Award | undefined;

        if (remoteAward) {
          setAward(remoteAward);
        } else {
          setAward(createNewAward());
        }
      } else {
        setAward(createNewAward());
      }
    };

    getRemoteAward();
  }, [Id]);

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[], key: mediaKeys) => {
      setAward((prev) => {
        if (prev) {
          return {
            ...prev,
            [key]: newFiles.length ? newFiles[0] : undefined,
          };
        }
      });
    },
    []
  );

  const onStringUpdate = useCallback((key: stringKeys, newVal: string) => {
    setAward((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: newVal,
        };
      }
    });
  }, []);

  const onNumberUpdate = useCallback(
    (key: "tierLower" | "tierUpper", newVal: number) => {
      setAward((prev) => {
        if (prev) {
          return {
            ...prev,
            [key]: newVal,
          };
        }
      });
    },
    []
  );

  const onMediaDelete = useCallback((key: mediaKeys) => {
    setAward((prev) => {
      if (prev) {
        const remoteTask = { ...prev };
        delete remoteTask[key];
        return remoteTask;
      }
    });
  }, []);

  const onStringAddInArray = useCallback(
    (newStr: string, key: stringArrayKeys, strIndex?: number) => {
      setAward((prev) => {
        if (prev) {
          const remoteAward = { ...prev };
          const remoteTarget = remoteAward[key]?.map((str, index) =>
            index === strIndex ? newStr : str
          );
          delete remoteAward[key];

          return {
            ...remoteAward,
            [key]: remoteTarget?.length
              ? strIndex
                ? remoteTarget
                : [...remoteTarget, newStr]
              : [newStr],
          };
        }
      });
    },
    []
  );

  const onStringDeleteInArray = useCallback(
    (targetStr: string, key: stringArrayKeys) => {
      setAward((prev) => {
        if (prev) {
          const remoteAward = { ...prev };
          const remoteTarget = remoteAward[key]?.filter(
            (str) => str !== targetStr
          );
          delete remoteAward[key];

          return remoteTarget?.length
            ? {
                ...remoteAward,
                [key]: remoteTarget,
              }
            : remoteAward;
        }
      });
    },
    []
  );

  return {
    award,
    onMediaUpload,
    onMediaDelete,
    onStringUpdate,
    onNumberUpdate,
    onStringAddInArray,
    onStringDeleteInArray,
  };
};
