import { useEffect, useState } from "react";
import { UserInterface } from "@models/User/User";
import { fetchMonthsData, refactorData } from "../utils/utils";
import { db } from "@config/firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import {
  recaliberateBadge,
  updateUserBadgeIdV2,
} from "@models/User/updateUtils";
import { GetDataType } from "../utils/constants";
import { AchievementPathData } from "../utils/interface";

export const useGoalAchievments = (type: GetDataType, user?: UserInterface) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AchievementPathData[]>([]);
  const [rawData, setRawData] = useState<AchievementPathData[]>([]);
  const [reRun, setReRun] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      let data: AchievementPathData[] = [];
      if (type === "genrate" && user) {
        await updateUserBadgeIdV2(user.uid);
        data = await fetchMonthsData(user);
      } else {
        data = await fetchMonthsData(user);
      }

      setRawData(data);
      setData(refactorData(data));

      setLoading(false);
    };

    getData();
  }, [type, user, reRun]);

  const onRegenrate = async () => {
    if (user) {
      await updateUserBadgeIdV2(user.uid);
      setReRun(reRun + 1);
    }
  };

  const onEdit = async (target: AchievementPathData) => {
    if (user?.uid && target.id) {
      setLoading(true);
      await setDoc(
        doc(doc(db, "users", user.uid), "goalAchievementPath", target.id),
        target
      );
      await recaliberateBadge(user.uid).catch((e) => {
        alert("Recaliberation failed. Contact Admin");
        console.log("e", e);
      });
      setLoading(false);

      setReRun(reRun + 1);
    }
  };

  const onDelete = async (targetId: string) => {
    if (user?.uid && targetId) {
      await deleteDoc(
        doc(doc(db, "users", user.uid), "goalAchievementPath", targetId)
      );
      setReRun(reRun + 1);
    }
  };

  const onAddNew = (): AchievementPathData => {
    return {
      id: uuidv4(),
    };
  };

  return { data, rawData, loading, onRegenrate, onEdit, onAddNew, onDelete };
};
