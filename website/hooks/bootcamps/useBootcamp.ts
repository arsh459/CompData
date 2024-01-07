import { useCallback, useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { Bootcamp, inclusionType } from "@models/Bootcamp/interface";
import { createNewBootcamp } from "@models/Bootcamp/createUtils";

export type stringKeysBootcamp =
  | "name"
  | "creatorId"
  | "badgeId"
  | "nutritionBadgeId";
export type stringArrayKeysBootcamp =
  | "text"
  | "link"
  | "type"
  | "linkText"
  | "icon";

export const useBootcamp = (id: string) => {
  const [bootcamp, setBootcamp] = useState<Bootcamp>();

  // console.log("award", award);

  useEffect(() => {
    const getRemoteBootcamp = async () => {
      if (id) {
        const bootcamp = await getDoc(doc(db, "bootcamps", id));

        const remoteBoot = bootcamp.data() as Bootcamp | undefined;

        if (remoteBoot) {
          setBootcamp(remoteBoot);
        } else {
          setBootcamp(createNewBootcamp());
        }
      } else {
        setBootcamp(createNewBootcamp());
      }
    };

    getRemoteBootcamp();
  }, [id]);

  const onMediaUpload = useCallback(
    (newFile: CloudinaryMedia | AWSMedia, index: number) => {
      setBootcamp((prev) => {
        if (prev) {
          return {
            ...prev,
            includes: [
              ...prev.includes.slice(0, index),
              {
                ...prev.includes[index],
                img: newFile,
              },
              ...prev.includes.slice(index + 1, prev.includes.length),
            ],
          };
        }
      });
    },
    []
  );

  const onMainMediaUpdate = useCallback(
    (
      newFile: CloudinaryMedia | AWSMedia,
      key: "mainMedia" | "landingMedia"
    ) => {
      setBootcamp((prev) => {
        if (prev) {
          return {
            ...prev,
            [key]: newFile,
          };
        }
      });
    },
    []
  );

  const onMainMediaDelete = useCallback((key: "mainMedia" | "landingMedia") => {
    setBootcamp((prev) => {
      if (prev) {
        const { [key]: _, ...rest } = prev;
        return {
          ...rest,
        };
      }
    });
  }, []);

  const onMediaDelete = useCallback((index: number) => {
    setBootcamp((prev) => {
      if (prev) {
        const { img, ...rest } = prev.includes[index];
        return {
          ...prev,
          includes: [
            ...prev.includes.slice(0, index),
            {
              ...rest,
            },
            ...prev.includes.slice(index + 1, prev.includes.length),
          ],
        };
      }
    });
  }, []);

  const onStringUpdate = useCallback(
    (key: stringKeysBootcamp, newVal: string) => {
      setBootcamp((prev) => {
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

  const onNumberUpdate = useCallback(
    (key: "length" | "start", newVal: number) => {
      setBootcamp((prev) => {
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

  const onIncludesUpdateStr = useCallback(
    (newStr: string, key: stringArrayKeysBootcamp, strIndex: number) => {
      setBootcamp((prev) => {
        if (prev) {
          return {
            ...prev,
            includes: [
              ...prev.includes.slice(0, strIndex),
              {
                ...prev.includes[strIndex],
                [key]: newStr,
              },
              ...prev.includes.slice(strIndex + 1, prev.includes.length),
            ],
          };
        }
      });
    },
    []
  );

  const onIncludesAdd = useCallback(() => {
    setBootcamp((prev) => {
      if (prev) {
        return {
          ...prev,
          includes: [
            ...prev.includes,
            {
              text: "add text",
              type: "workout" as inclusionType,
              linkText: "",
              icon: "workout",
            },
          ],
        };
      }
    });
  }, []);

  const onIncludesRemove = useCallback((indexToRemove: number) => {
    setBootcamp((prev) => {
      if (prev) {
        return {
          ...prev,
          includes: [
            ...prev.includes.slice(0, indexToRemove),
            ...prev.includes.slice(indexToRemove + 1, prev.includes.length),
          ],
        };
      }
    });
  }, []);

  return {
    bootcamp,
    onMediaUpload,
    onMediaDelete,
    onMainMediaDelete,
    onMainMediaUpdate,
    onStringUpdate,
    onNumberUpdate,
    onIncludesRemove,
    onIncludesAdd,
    onIncludesUpdateStr,
  };
};
