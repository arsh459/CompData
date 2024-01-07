import { downIcon } from "@constants/imageKitURL";
import {
  monthStateInterface,
  weekStateInterface,
} from "@hooks/challenge/useChallengeWeeks";
import {
  getLederboardDetailsHeading,
  getSprintRoundHeadings,
} from "@utils/community/utils";
import { periodTypes, viewTypes } from "@utils/leaderboard/utils";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, Pressable } from "react-native";

interface Props {
  selectedView: viewTypes;
  period?: periodTypes;
  setPeriod: (val: periodTypes) => void;
  setIsOpenPeriodModal: (val: boolean) => void;
  leaderboardWeeks: weekStateInterface[];
  leaderboardMonths: monthStateInterface[];
  leaderboardWeek: string;
  leaderboardMonth: string;
}

const DetailsHeader: React.FC<Props> = ({
  selectedView,
  period,
  setPeriod,
  setIsOpenPeriodModal,
  leaderboardWeeks,
  leaderboardMonths,
  leaderboardWeek,
  leaderboardMonth,
}) => {
  const leaderboardHeading = getLederboardDetailsHeading(
    period,
    leaderboardWeeks,
    leaderboardMonths,
    leaderboardWeek,
    leaderboardMonth
  );

  const { roundName, sprintName } = getSprintRoundHeadings(
    leaderboardWeeks,
    leaderboardMonths,
    leaderboardWeek,
    leaderboardMonth
  );

  return (
    <LinearGradient
      colors={
        selectedView === "players"
          ? ["#1572B580", "#2184CB80"]
          : ["#D33F6480", "#D38F3F80"]
      }
    >
      <View className={clsx("flex flex-row justify-between items-center p-4")}>
        <Text
          className={clsx(
            selectedView === "players" ? "text-[#FF9898]" : "text-[#D8FD6F]",
            "iphoneX:text-xl font-extrabold"
          )}
        >
          {leaderboardHeading}
        </Text>
        {/* <Image
          source={{ uri: expandIcon }}
          className="w-5 h-5"
          resizeMode="contain"
        /> */}
      </View>
      <View className="border-t border-white flex flex-row iphoneX:text-xl">
        <Pressable
          className={clsx(
            "flex-1 flex flex-row justify-center items-center px-4 py-2.5 border-white",
            period === "month" ? "border-b-[5px]" : "border-b mb-0.5"
          )}
          onPress={() => setPeriod("month")}
        >
          <Text className="mr-2 capitalize text-white iphoneX:text-lg">
            {sprintName}
          </Text>
          {leaderboardMonths.length > 1 ? (
            <Pressable
              onPress={() => {
                setPeriod("month");
                setIsOpenPeriodModal(true);
              }}
            >
              <Image
                source={{ uri: downIcon }}
                className="w-2.5 h-2.5"
                resizeMode="contain"
              />
            </Pressable>
          ) : null}
        </Pressable>
        <View className="w-px bg-white border-b border-white my-2.5" />
        <Pressable
          className={clsx(
            "flex-1 flex flex-row justify-center items-center px-4 py-2.5 border-white",
            period === "week" ? "border-b-[5px]" : "border-b mb-0.5"
          )}
          onPress={() => setPeriod("week")}
        >
          <Text className="mr-2 capitalize text-white iphoneX:text-lg">
            {roundName}
          </Text>
          {leaderboardWeeks.length > 1 ? (
            <Pressable
              onPress={() => {
                setPeriod("week");
                setIsOpenPeriodModal(true);
              }}
            >
              <Image
                source={{ uri: downIcon }}
                className="w-2.5 h-2.5"
                resizeMode="contain"
              />
            </Pressable>
          ) : null}
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default DetailsHeader;
