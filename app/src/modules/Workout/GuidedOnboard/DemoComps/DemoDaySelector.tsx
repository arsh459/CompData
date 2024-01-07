import CirclePercent from "@components/CirclePercent";
import SvgIcons from "@components/SvgIcons";
import { dayObj } from "@modules/Nutrition/V2/DaySelector/interface";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { Text, View, useWindowDimensions } from "react-native";
import { getDemoCalander } from "./utils";
import { dayRecommendationType } from "@models/User/User";
import { DayProvider } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import DaySelectorV3 from "@modules/Nutrition/V2/DaySelector/V3";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const dayObjArr: dayObj[] = getDemoCalander();

const DemoDaySelector: React.FC<{
  type: dayRecommendationType;
  visible?: boolean;
}> = ({ type, visible }) => {
  const { width } = useWindowDimensions();
  const color =
    type == "workout" ? "#19C8FF" : type == "nutrition" ? "#FCB750" : "#FFFFFF";

  const { badge } = useSignleBadgeContext();
  const { start, nutritionStart, badgeConfig } = useUserStore((state) => {
    return {
      start: state.user?.recommendationConfig?.start,
      nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      badgeConfig: state.user?.recommendationConfig?.badgeConfig,
    };
  }, shallow);

  const st = getStartTime(badgeConfig, badge?.id, type, start, nutritionStart);

  return (
    <>
      <DayProvider startUnix={st}>
        <DaySelectorV3 type={type} />
      </DayProvider>

      <View
        style={{ width: width, opacity: visible ? 1 : 0 }}
        className="flex flex-row"
      >
        {dayObjArr.map((each, index) => (
          <DemoCalenderDateV3
            key={each.unix}
            day={each}
            index={index}
            color={color}
            hideRest={type === "nutrition"}
          />
        ))}
      </View>
    </>
  );
};

export default DemoDaySelector;

interface Props {
  day: dayObj;
  color: string;
  index: number;
  hideRest?: boolean;
}

const DemoCalenderDateV3: React.FC<Props> = ({
  day,
  color,
  index,
  hideRest,
}) => {
  const { today } = useAuthContext();
  const { width } = useWindowDimensions();
  const itemWidth = width / 7;

  return (
    <View
      className="flex justify-center items-center rounded-xl py-8"
      style={{
        width: itemWidth,
        backgroundColor: today === day.date ? "#343150" : "",
      }}
    >
      <Text
        className="text-white text-sm font-medium"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {day.day}
      </Text>
      <View className="w-4 aspect-square" />
      {!hideRest && index === 5 ? (
        <View style={{ width: itemWidth * 0.7, aspectRatio: 1 }}>
          <SvgIcons iconType="restDay" color={color} />
        </View>
      ) : (
        <CirclePercent
          circleSize={itemWidth * 0.7}
          percent={index === 3 ? 0.65 : index === 4 ? 0.4 : 0}
          showInactive={true}
          strokeWidth={day.unix >= dayObjArr[1].unix ? 6 : 0}
          activeColor={color}
          inActiveColor={color ? `${color}33` : undefined}
          noAnimation={true}
        >
          <View className="w-full h-full flex justify-center items-center">
            <Text
              className="text-white text-xs"
              style={{ fontFamily: "Nunito-Regular" }}
            >
              {day.numStr}
            </Text>
          </View>
        </CirclePercent>
      )}
      <View className="w-1.5 aspect-square" />
      <View className="w-full h-3 flex justify-center items-center">
        {index === 1 ? (
          <View className="w-3 aspect-square">
            <SvgIcons iconType="star" />
          </View>
        ) : today === day.date ? (
          <View
            className="w-1/3 h-[5px] rounded-full"
            style={{ backgroundColor: color }}
          />
        ) : null}
      </View>
    </View>
  );
};
