import { useEffect, useState } from "react";
import { useBadges } from "@hooks/badges/useBadges";
import { frequencyTypes, SBPrize } from "@models/Prizes/PrizeV2";

const usePrizes = (gameId: string, frequency?: frequencyTypes) => {
  const [prizes, setPrizes] = useState<SBPrize[]>([]);
  const [isFetched, setIsFetching] = useState<boolean>(false);
  const { badges, fetched } = useBadges(gameId, undefined);

  useEffect(() => {
    if (fetched) {
      const remotePrizes: SBPrize[] = [];
      badges.forEach((each) => {
        remotePrizes.push(...each.prizes);
      });

      const filteredPrizes: SBPrize[] = [];
      const filteredPrizesMap: { [brand: string]: boolean } = {};
      for (const prize of remotePrizes) {
        if (!filteredPrizesMap[prize.brand]) {
          filteredPrizes.push(prize);
        }
      }
      // remotePrizes.filter(
      //   (item, index) => remotePrizes.indexOf(item) === index
      // );
      setPrizes(filteredPrizes);
      setIsFetching(true);
    }
  }, [badges, fetched]);

  return {
    badges,
    prizes,
    isFetched,
  };
};

export default usePrizes;
