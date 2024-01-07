import { View, Text } from "react-native";
import React from "react";
import ProgressBar from "@components/ProgressBar";
import { getIconsNutrients } from "@modules/Nutrition/Components/V2/utils";
import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";
import { getBottomMeterColor } from "../../NutritionMeters/utils";
import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import { shallow } from "zustand/shallow";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { nutritionConsumptionKeys } from "@models/User/User";
interface Props {
  text: nutritionConsumptionKeys;
  // progress?: number;
  target: number;
}
const NutritientTargetProgress: React.FC<Props> = ({ text, target }) => {
  // console.log(
  //   "getBottomMeterColor(meterPerc)",
  //   meterPerc,
  //   getBottomMeterColor(meterPerc)
  // );

  const { activeDate } = useDietCalendar(
    (state) => ({ activeDate: state.active?.currentDate }),
    shallow
  );
  const { badgeId } = useSignleBadgeContext();
  const { consumedKPI } = useUserStore((state) => {
    const val =
      state?.recCache[`${badgeId}-${activeDate}`] &&
      state?.recCache[`${badgeId}-${activeDate}`]?.consumedNutrition &&
      state?.recCache[`${badgeId}-${activeDate}`]?.consumedNutrition?.[text]
        ? state?.recCache[`${badgeId}-${activeDate}`]?.consumedNutrition?.[text]
        : 0;

    return {
      consumedKPI: val ? val : 0,
    };
  }, shallow);
  const progress = Math.ceil((consumedKPI / target) * 100);
  const meterPerc = progress && progress > 100 ? 100 : progress ? progress : 0;

  return (
    <View className="flex-1">
      <View className="flex flex-row pb-2 items-center">
        <View className="flex flex-row flex-1 items-center ">
          <ImageWithURL
            source={{ uri: getIconsNutrients(text) }}
            className="w-4 aspect-square"
            resizeMode="contain"
          />
          <Text
            className={clsx("text-[#C8C8C8]", "pl-1.5 text-xs capitalize ")}
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {text}
          </Text>
        </View>
        <Text
          style={{ fontFamily: "Nunito-Medium" }}
          className={clsx("text-[#C8C8C8]", "pl-1.5 text-[10px] ")}
          // className={clsx("text-[#C8C8C8]", "pl-1.5 text-xs font-bold")}
        >
          {consumedKPI.toFixed(1)} / {target.toFixed(1)} g
          {/* {progress || 0}% */}
        </Text>
      </View>
      <View className="flex-1">
        <ProgressBar
          height={1}
          progress={meterPerc}
          activeColor={getBottomMeterColor(progress)} // "#6BFF8C"
          inActiveColor="#4A4672"
        />
      </View>
    </View>
  );
};

export default NutritientTargetProgress;
