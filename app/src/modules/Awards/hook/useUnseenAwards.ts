import firestore from "@react-native-firebase/firestore";
import { Achiever, Award } from "@models/Awards/interface";
import { useEffect, useState } from "react";

export const useUnseenAwards = (idArr?: string[]) => {
  const [awards, setAwards] = useState<{ [id: string]: Award }>({});
  const [wonAwardsData, setWonAwardsData] = useState<Achiever[]>([]);
  const [initChecked, setInitChecked] = useState<boolean>(false);
  const [awardsAnimated, setAwardsAnimated] = useState<{
    [id: string]: boolean;
  }>({});

  useEffect(() => {
    const getAwards = async () => {
      if (!initChecked && idArr) {
        const remoteWonAwardsData: Achiever[] = [];
        const remoteAwards: { [id: string]: Award } = {};
        const remoteAwardsAnimated: { [id: string]: boolean } = {};

        const rremoteAwardsPromises = idArr.map((id) => {
          return firestore().collection("achievers").doc(id).get();
        });

        const remoteAwardsDocs = await Promise.all(rremoteAwardsPromises);

        for (const doc of remoteAwardsDocs) {
          if (doc.data()) {
            const localAchiever = doc.data() as Achiever;
            remoteWonAwardsData.push(localAchiever);

            const awardDoc = await firestore()
              .collection("awards")
              .doc(localAchiever.awardId)
              .get();

            if (awardDoc.data()) {
              const localAward = awardDoc.data() as Award;
              remoteAwards[localAchiever.awardId] = localAward;
              remoteAwardsAnimated[localAchiever.id] = false;
            }
          }
        }

        setAwards(remoteAwards);
        setWonAwardsData(remoteWonAwardsData);
        setAwardsAnimated(remoteAwardsAnimated);
        setInitChecked(true);
      }
    };

    getAwards();
  }, [idArr, initChecked]);

  const setAwardsAnimatedTrue = (id: string) => {
    setAwardsAnimated((prev) => ({ ...prev, [id]: true }));
  };

  return { awards, wonAwardsData, awardsAnimated, setAwardsAnimatedTrue };
};
