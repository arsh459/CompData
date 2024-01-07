import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { LevelInterface } from "@models/Level/interface";
import { useUserStore } from "@providers/user/store/useUserStore";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

export interface LevelsObjInterface {
  [lvlNumber: number]: LevelInterface;
}

export const useLevels = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // const [levels, setLevels] = useState<LevelInterface[]>([]);
  // const [levelsObj, setLevelsObj] = useState<LevelsObjInterface>({});

  const setLevelsCache = useUserStore((state) => state.setLevelsCache, shallow);

  useEffect(() => {
    const getLevel = async () => {
      try {
        setLoading(true);

        const levelsDocs = await firestore()
          .collection("sbEvents")
          .doc(TEAM_ALPHABET_GAME)
          .collection("level")
          .orderBy("lvlNumber", "asc")
          .get();

        const remoteLevels: LevelInterface[] = [];
        const remoteLevelsObj: { [lvlNumber: string]: LevelInterface } = {};

        for (const levelDoc of levelsDocs.docs) {
          if (levelDoc.exists) {
            const remoteLevel = levelDoc.data() as LevelInterface;

            remoteLevels.push(remoteLevel);
            remoteLevelsObj[remoteLevel.lvlNumber] = remoteLevel;
          }
        }

        // setLevels(remoteLevels);
        setLevelsCache(remoteLevelsObj, remoteLevels);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getLevel();
  }, []);

  return { loading };
};
