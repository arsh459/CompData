import { TEAM_ALPHABET_GAME } from "@constants/gameStats";
import { LevelInterface } from "@models/Level/interface";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export const useLevel = (lvlNumber: number) => {
  const [loading, setLoading] = useState<boolean>();
  const [level, setLevel] = useState<LevelInterface>();

  useEffect(() => {
    const getLevel = async () => {
      setLoading(true);

      const levels = await firestore()
        .collection("sbEvents")
        .doc(TEAM_ALPHABET_GAME)
        .collection("level")
        .where("lvlNumber", "==", lvlNumber)
        .get();

      if (levels.docs.length && levels.docs[0].data()) {
        const remoteLevel = levels.docs[0].data() as LevelInterface;

        setLevel(remoteLevel);
      }

      setLoading(false);
    };

    getLevel();
  }, [lvlNumber]);

  return { level, loading };
};
