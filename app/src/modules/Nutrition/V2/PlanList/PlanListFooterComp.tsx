import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";

import ScanIcon from "../StageComponents/ScanIcon";
import SearchIcon from "../StageComponents/SearchIcon";
import LineIconV1 from "./LineIconV1";
import LineIconV2 from "./LineIconV2";
import { horizontalItemHeight, ItemWidth } from "./PlanList";
import PlanListFooterImages from "./PlanListFooterImages";
interface Props {
  onAddPress: () => void;
  tasksLength: number;
  navigationOnAiScanPress: () => void;
}
const PlanListFooterComp: React.FC<Props> = ({
  onAddPress,
  tasksLength,
  navigationOnAiScanPress,
}) => {
  let widthObject =
    tasksLength > 0
      ? {
          width: ItemWidth,
        }
      : {};
  return (
    <View
      className={clsx(
        "flex justify-center",
        tasksLength === 0 ? "mx-6" : "mx-4"
      )}
      style={{ height: horizontalItemHeight + 70, ...widthObject }}
    >
      <View className="flex-1">
        {/* Copied from meal card for design purpose */}
        <View className={clsx("px-3", tasksLength === 0 ? "pb-4" : "pb-2")}>
          {tasksLength > 0 && (
            <Text
              className="text-white/40 text-sm tracking-wider"
              style={{ fontFamily: "Poppins-Light" }}
            ></Text>
          )}
        </View>

        {/* Card component */}
        <View
          className={clsx(
            "rounded-2xl flex-1 justify-around relative",
            "bg-[#654DC8] rounded-b-2xl -z-10"
          )}
        >
          <View className="relative z-20">
            <View className={clsx("px-7", tasksLength === 0 ? "pr-24" : "")}>
              <Text
                className="text-[#fff] text-[26px]"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                Want To Track a New Meal ?
              </Text>
            </View>
            <View className="px-7 flex">
              <View className="  h-[5px] aspect-[127/5]">
                <LineIconV1 />
              </View>
            </View>
            <View className="px-10 pt-0.5 flex">
              <View className="h-[3px] aspect-[91/3]">
                <LineIconV2 />
              </View>
            </View>
          </View>
          <View className="mx-6 flex flex-row items-center justify-center rounded-lg z-20 backdrop-blur-[5.30px] ">
            <TouchableOpacity
              className="w-full flex items-center justify-center"
              onPress={onAddPress}
            >
              <View className="w-4 absolute left-3.5 z-30 ">
                <SearchIcon />
              </View>
              <View className="w-full px-10 py-4 rounded-lg text-white text-sm bg-[#232136E6] flex justify-center">
                <View className="">
                  <View className="absolute border-l border-white h-full left-0 flex justify-center"></View>
                  <Text
                    className="text-white/30 text-xs px-1"
                    style={{ fontFamily: "Nunito-Bold" }}
                  >
                    Search for food
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-5 absolute right-3.5 z-30"
              onPress={navigationOnAiScanPress}
            >
              <ScanIcon />
            </TouchableOpacity>
          </View>
          <PlanListFooterImages />
        </View>

        {/*  Copied from Meal Card V3 for design purpose similar to other cards */}
        <View
          className={clsx(
            "flex flex-row items-center rounded-b-2xl justify-between px-4"
          )}
        >
          <View>
            <Text
              className={clsx("text-white/80 py-2.5 text-[10px]")}
              style={{ fontFamily: "Poppins-Medium" }}
            ></Text>
          </View>
          <View>
            <Text
              className="text-white/80 py-2.5  text-[10px]"
              style={{ fontFamily: "Poppins-Medium" }}
            ></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlanListFooterComp;
