import { useEffect, useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { format } from "date-fns";
import { AchievementPathDataItem } from "../utils/interface";
import { fetchMonthsData } from "../utils/utils";

interface AchieverSectionV2 {
  targetMonth: string;
  data: AchievementPathDataItem[][];
}

export const useAwardFromRoadmap = () => {
  const [awardItems, setAwardItems] = useState<AchieverSectionV2[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  const { uid } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
    };
  }, shallow);

  useEffect(() => {
    const getData = async () => {
      if (uid) {
        const data = await fetchMonthsData(uid);

        const userItems: AchieverSectionV2[] = [];
        for (const month of data) {
          const monthStTime = month.startTime;
          if (month.items && monthStTime) {
            const label = format(new Date(monthStTime), "MMM yy");
            const newAchieverLabel: AchieverSectionV2 = {
              targetMonth: label,
              data: [],
            };

            for (const item of month.items) {
              //   console.log(
              //     "newAchieverLabel.data",
              //     newAchieverLabel.data.length,
              //     newAchieverLabel.data.length
              //       ? newAchieverLabel.data[newAchieverLabel.data.length - 1]
              //           .length
              //       : "NA"
              //   );

              if (newAchieverLabel.data.length === 0) {
                newAchieverLabel.data.push([item]);
              } else if (
                newAchieverLabel.data[newAchieverLabel.data.length - 1] &&
                newAchieverLabel.data[newAchieverLabel.data.length - 1].length <
                  2
              ) {
                newAchieverLabel.data[newAchieverLabel.data.length - 1].push(
                  item
                );
              } else {
                newAchieverLabel.data.push([item]);
              }
            }

            // console.log(newAchieverLabel.data.map((i) => i.length));

            userItems.push(newAchieverLabel);
          }
        }

        setAwardItems(userItems);
        setFetching(false);
      }
    };

    getData();
  }, [uid]);

  return {
    awardItems,
    fetching,
  };
};
