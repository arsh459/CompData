import { proLogoNew } from "@constants/imageKitURL";
import useConsumptionNutrition from "../hooks/useConsumptionNutrition";
import ProgressContribution from "./ProgressContribution";
import { useEffect, useState } from "react";
import { getMeterColor } from "@modules/Nutrition/V2/NutritionMeters/utils";
import useContributionLeaderboard from "../store/useContributionLeaderboard";

const ProgressContributionComponent = () => {
  const { selectedViewRange, selectedView } = useContributionLeaderboard(
    (state) => ({
      selectedViewRange: state.selectedViewRange,
      selectedView: state.selectedView,
    })
  );

  const [progress, setProgress] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>("");
  const { consumedNutrition, targetNutrition } =
    useConsumptionNutrition(selectedViewRange);

  useEffect(() => {
    if (consumedNutrition && targetNutrition) {
      let consumedNutritionValue =
        consumedNutrition[selectedView === "fibre" ? "fiber" : selectedView];
      let targetNutritionValue =
        targetNutrition[selectedView === "fibre" ? "fiber" : selectedView];

      if (targetNutritionValue && consumedNutritionValue) {
        setProgress((prev) => {
          return (
            (consumedNutritionValue ? consumedNutritionValue : 0) /
            (targetNutritionValue ? targetNutritionValue : 0)
          );
        });
      }
      setProgressText(
        `${consumedNutritionValue ? consumedNutritionValue.toFixed(2) : 0}gm/${
          targetNutritionValue ? targetNutritionValue.toFixed(2) : 0
        }gm`
      );
    }
  }, [consumedNutrition, targetNutrition, selectedView, selectedViewRange]);

  return (
    <ProgressContribution
      colors={["transparent", "transparent"]}
      text={progressText}
      subText={`Total ${selectedView} Consumed`}
      progress={progress ? progress : 0}
      imgUrl={proLogoNew}
      onPress={() => {}}
      isLocked={false}
      activeColor={getMeterColor(progress)}
      inActiveColor="#444254"
      textColors={[
        progress > 1 ? getMeterColor(progress) : "#FFFFFFCC",
        progress > 1 ? getMeterColor(progress) : "#FFFFFFCC",
      ]}
      textPercent={
        progress ? (progress > 1 ? 100 : Math.round(progress * 100)) : 0
      }
      textColor={getMeterColor(progress)}
    />
  );
};

export default ProgressContributionComponent;
