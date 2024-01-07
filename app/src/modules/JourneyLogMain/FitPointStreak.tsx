import { StreakProvider } from "@providers/streak/StreakProvider";
import StreakDays from "@modules/HomeScreen/MyProgress/StreakDays";

const FitPointStreak = () => {
  return (
    <StreakProvider>
      <StreakDays />
    </StreakProvider>
  );
};

export default FitPointStreak;
