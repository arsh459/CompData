import { LevelInterface } from "@models/Level/interface";
import { useCallback, useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { TEAM_ALPHABET_GAME } from "@constants/gameStats";

export type mediaKeys = "earnedImg" | "lockedImg";
export type stringKeys = "title" | "description" | "howToAchieve" | "textColor";
export type numberKeys =
  | "lvlNumber"
  | "minFP"
  | "maxFP"
  | "promotionCutoff"
  | "maintainCutoff";

export const useLevel = (id: string) => {
  const [loading, setLoading] = useState<boolean>();
  const [level, setLevel] = useState<LevelInterface>();

  useEffect(() => {
    const getLevel = async () => {
      setLoading(true);

      const levelDocs = await getDoc(
        doc(doc(db, "sbEvents", TEAM_ALPHABET_GAME), "level", id)
      );

      if (levelDocs.data()) {
        const remoteLevel = levelDocs.data() as LevelInterface;

        setLevel(remoteLevel);
      } else {
        setLevel({
          id: uuidv4(),
          lvlNumber: 1,
          description: "",
          title: "",
          promotionCutoff: 10,
        });
      }

      setLoading(false);
    };

    getLevel();
  }, [id]);

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[], key: mediaKeys) => {
      setLevel((prev) => {
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

  const onMediaDelete = useCallback((key: mediaKeys) => {
    setLevel((prev) => {
      if (prev) {
        const remoteTask = { ...prev };
        delete remoteTask[key];
        return remoteTask;
      }
    });
  }, []);

  const onStringUpdate = useCallback((key: stringKeys, newVal: string) => {
    setLevel((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: newVal,
        };
      }
    });
  }, []);

  const onNumberUpdate = useCallback((key: numberKeys, newVal: number) => {
    setLevel((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: newVal,
        };
      }
    });
  }, []);

  return {
    level,
    loading,
    onMediaUpload,
    onMediaDelete,
    onStringUpdate,
    onNumberUpdate,
  };
};
