import { useEffect, useState } from "react";
import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";

export interface BadgeSection {
  sectionId: string;
  sectionName: string;
  nbTasks: number;
  nbFp: number;
}

export const useBadgeSections = (gameId?: string, prizeId?: string) => {
  const [badgeSections, setBadgeSections] = useState<BadgeSection[]>();

  useEffect(() => {
    const getBadgeSections = async () => {
      if (gameId && prizeId) {
        const ref = firebase
          .firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("badges")
          .doc(prizeId)
          .collection("badgeSections")
          .orderBy("priority", "asc");

        const docs = await ref.get();
        const remoteSections: BadgeSection[] = [];
        docs.forEach((doc) => {
          remoteSections.push(doc.data() as BadgeSection);
        });

        setBadgeSections(remoteSections);
      }
    };

    getBadgeSections();
  }, [gameId, prizeId]);

  return {
    badgeSections,
  };
};
