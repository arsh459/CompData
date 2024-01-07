import { useEffect, useState } from "react";
import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useBadgeSections } from "@hooks/badges/useBadgeSections";
import { useAuthContext } from "@providers/auth/AuthProvider";

export const useNewHeaderData = () => {
  const { state } = useAuthContext();
  const { badgeProgress, badgeId: nutritionBadgeId } =
    useBadgeProgressContext();
  const { badgeSections } = useBadgeSections(state?.gameId, nutritionBadgeId);
  const [selectedDay, setDay] = useState<number>(
    badgeProgress?.currentDay ? badgeProgress.currentDay : 0
  );

  const [init, setInit] = useState<boolean>(false);

  // init
  useEffect(() => {
    if (!init && badgeProgress?.currentDay) {
      setDay(badgeProgress?.currentDay);
      setInit(true);
    }
  }, [badgeProgress?.currentDay, init]);

  return {
    setDay,
    selectedDay,
    // nutritionBadgeId,
    badgeSections,
  };
};
