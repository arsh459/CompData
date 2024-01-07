import {
  View,
  Text,
  Image,
  useWindowDimensions,
  SectionList,
} from "react-native";

import { ListFooterComponent } from "@modules/Community/Leaderboard/LeaderboardDetails/StickyItem";
import ActivityCardV2 from "@modules/UserMain/ProfileList/ActivityCardV2";
import { EarnedTaskInterface } from "@modules/UserMain/FitPointExpanderMain/EarnedTaskCard";
import {
  useEarnedTasksV2,
  workoutSectionTitleFormat,
} from "@modules/UserMain/FitPointExpanderMain/hooks/useEarnedTasksV2";
import { useAuthContext } from "@providers/auth/AuthProvider";

interface Props {
  hasTodayWorkout?: boolean;
}

const ListHeader: React.FC<Props> = ({ hasTodayWorkout }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="relative flex-1">
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_2__2__prKwarpLB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666094235222",
        }}
        style={{
          width: width,
          height: width / 2,
        }}
      />

      <View className="flex">
        <Text
          className="text-[#A5DAFF] text-xl iphoneX:text-xl p-4"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Workouts History
        </Text>
        {hasTodayWorkout ? null : (
          <>
            <View className="bg-[#A5DAFF] h-px mx-4" />
            <Text
              className="text-[#A5DAFF] text-xs iphoneX:text-sm px-4 py-2.5"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Today's Workouts
            </Text>
            <Text
              className="text-[#FFFFFF8C] text-base iphoneX:text-lg py-12 text-center"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              No Activites Today
            </Text>
          </>
        )}
        <View className="bg-[#A5DAFF] h-px mx-4" />
        <Text
          className="text-[#A5DAFF] text-xs iphoneX:text-sm px-4 py-2.5"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          Previous workouts
        </Text>
      </View>
    </View>
  );
};

const renderItem = ({ item }: { item: EarnedTaskInterface }) => {
  return <ActivityCardV2 earnedFPEl={item} key={item.id} id={item.id} />;
};

const SelectWorkoutsMain = () => {
  const { onNext, earnedTasks, extraData, loading } = useEarnedTasksV2("task");

  const { today } = useAuthContext();
  const todayDay = workoutSectionTitleFormat(
    (today ? new Date(today) : new Date()).getTime()
  );

  const hasTodayWorkout = earnedTasks.filter(
    (each) => each.day === todayDay && each.data.length
  ).length
    ? true
    : false;

  const renderItemM = ({
    section: { data },
    index,
  }: {
    section: { data: EarnedTaskInterface[] };
    index: number;
  }) => {
    if (index % 2) {
      return null;
    }
    const rowItems = data.slice(index, index + 2);
    return (
      <View className="flex flex-row justify-between">
        {rowItems.map((item) => renderItem({ item }))}
      </View>
    );
  };

  const keyExtractor = (item: EarnedTaskInterface) => item.id;

  const renderSectionHeader = ({
    section: { day },
  }: {
    section: { day: string };
  }) => {
    return (
      <View className="px-4">
        <View className="bg-[#A5DAFF] h-px" />
        <Text
          className="text-[#A5DAFF] text-xs iphoneX:text-sm py-2.5"
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          {todayDay === day ? "Today's Workouts" : day}
        </Text>
      </View>
    );
  };

  return (
    <View className="bg-[#13121E] flex-1">
      <SectionList
        sections={earnedTasks}
        keyExtractor={keyExtractor}
        renderItem={renderItemM}
        renderSectionHeader={renderSectionHeader}
        onEndReached={onNext}
        extraData={extraData}
        ListHeaderComponent={<ListHeader hasTodayWorkout={hasTodayWorkout} />}
        ListFooterComponent={
          earnedTasks.length > 1 ? (
            <View className="h-5" />
          ) : (
            ListFooterComponent(
              loading,
              earnedTasks.length ? undefined : "No Previous Activites",
              "#FFFFFF8C"
            )
          )
        }
      />
    </View>
  );
};

export default SelectWorkoutsMain;
