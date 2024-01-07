// import CirclePercent from "@components/CirclePercent";
import MediaTile from "@components/MediaCard/MediaTile";
// import SvgIcons from "@components/SvgIcons";
// import { workoutBgNew } from "@constants/imageKitURL";
// import { getDataToday, getTasksToday } from "@hooks/program/utils";
import { WorkoutLevel } from "@models/Prizes/Prizes";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import StepComponentV2 from "./StepComponentV2";
import { ITEM_WIDTH } from "./StepComponentV2";

interface Props {
  setSelectedStep: (newDay: number) => void;
  selectedStep: number;
  linear?: string[];
  isNutrition?: boolean;
}

const NewHeaderV2: React.FC<Props> = ({
  selectedStep,
  setSelectedStep,
  linear,
  isNutrition,
}) => {
  const ref = useRef<FlatList>(null);
  const [unscrolled, setInitialScrollStatus] = useState<boolean>(false);
  const { badgeProgress } = useBadgeProgressContext();
  const { badge } = useSignleBadgeContext();
  const { user } = useUserContext();

  const num = badge?.workoutLevels?.length ? badge?.workoutLevels?.length : 0;
  const doneTill = badgeProgress?.currentDay ? badgeProgress?.currentDay : 0;
  // const wkTasks = getTasksToday(badgeProgress, badge);
  // const wkTasksData = getDataToday(badgeProgress, badge);

  useEffect(() => {
    if (!unscrolled && ref.current && typeof selectedStep === "number") {
      setTimeout(
        () =>
          ref?.current?.scrollToIndex({
            animated: true,
            index: selectedStep,
            viewPosition: 0,
          }),
        500
      );
      setInitialScrollStatus(true);
    }
  }, [unscrolled, selectedStep]);

  const getItemLayout = (_: any, index: number) => {
    return {
      length: ITEM_WIDTH,
      offset: ITEM_WIDTH * index,
      index,
    };
  };

  const renderItem = ({ item }: { item: WorkoutLevel }) => {
    const isDone = item.day <= doneTill ? true : false;
    const nbWorkouts = item.nbWorkouts ? item.nbWorkouts : 0;
    // const nbFP = item.nbFitpoints ? item.nbFitpoints : 0;
    const progElement = badgeProgress?.progress.filter(
      (item) => item.day === selectedStep
    );

    // let fpEarnt: number = 0;
    let workoutsDone: number = 0;
    if (progElement?.length) {
      // fpEarnt = progElement[0].nbFPEarnt;
      workoutsDone = progElement[0].nbWorkoutsDone;
    }

    const title = `Done ${workoutsDone}/${nbWorkouts} Tasks`;
    // const title = "Completed";
    const subTitle = ""; // `Earnt ${fpEarnt}/${nbFP} FPs`;

    const onDayPress = () => {
      setSelectedStep(item.day);

      weEventTrack("workoutSelect_clickDay", { dayNumber: item.day });
    };

    return (
      <StepComponentV2
        text={item.day}
        isDone={isDone}
        isLast={item.day === num}
        isUnlocked={
          item.day <=
          (badgeProgress?.currentDay ? badgeProgress?.currentDay : -1)
        }
        isSelected={item.day === selectedStep}
        currentlyAtStep={item.day === badgeProgress?.currentDay}
        onPress={onDayPress}
        tooltipContent={{ title, subTitle }}
      />
    );
  };

  return (
    <>
      <View className="relative z-0">
        <View className="absolute left-0 right-0 top-0 bottom-0">
          <MediaTile
            fluid={true}
            media={
              user?.gender === "male"
                ? badge?.bgImageMale
                : badge?.bgImageFemale
            }
            fluidResizeMode="cover"
          />
          {/* <Image source={{ uri: workoutBgNew }} className="absolute left-0 right-0 top-0 bottom-0" /> */}
        </View>
        <LinearGradient
          colors={linear ? linear : ["transparent", "transparent"]}
          start={{ x: 0.45, y: 0 }}
          end={{ x: 0.55, y: 1 }}
          className="w-full aspect-[420/215] flex justify-end items-end"
        >
          {badge?.workoutLevels ? (
            <FlatList
              ref={ref}
              getItemLayout={getItemLayout}
              data={badge.workoutLevels}
              renderItem={renderItem}
              ListHeaderComponent={<View className="w-16" />}
              ListFooterComponent={<View className="w-16" />}
              contentContainerStyle={{
                alignItems: "flex-end",
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bounces={false}
            />
          ) : null}
        </LinearGradient>
      </View>
      {/* <View className="flex flex-row flex-1 items-center justify-evenly pt-4">
        <View className=" w-1/3 flex items-center ">
          <CirclePercent
            circleSize={90}
            percent={wkTasks.progress}
            activeColor={isNutrition ? "#FE930A" : "#1991FF"}
            strokeWidth={6}
            padding={2}
            inActiveColor="#373747"
            showInactive={true}
          >
            <View className="flex items-center justify-center absolute left-0 right-0 top-0 bottom-0">
              <View className="w-10 aspect-[37/43] ">
                <SvgIcons
                  iconType={isNutrition ? "nutrition" : "exercise"}
                  color={isNutrition ? "#FE930A" : "#1991FF"}
                />
              </View>
            </View>
          </CirclePercent>
        </View>
        <Text
          className={clsx("text-xs w-1/2  iphoneX:text-sm ", "text-white")}
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          {`Great going ! You have completed ${wkTasksData.nbWorkoutsDone}/${wkTasksData.nbWorkouts} exercises Complete all exercises to complete your goal of ${wkTasksData.nbFitpoints} fitpoints`}
        </Text>
      </View> */}
      <Text
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        className="text-white text-xl p-4"
      >
        Select a task
      </Text>
    </>
  );
};

export default NewHeaderV2;
