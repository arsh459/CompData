import { WorkoutLevel } from "@models/Prizes/Prizes";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useBadgeProgressContext } from "@providers/BadgeProgressProvider/BadgeProgressProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import StepComponent, { ITEM_WIDTH } from "./StepComponent";

interface Props {
  headerHeight?: number;
  setSelectedStep: (newDay: number) => void;
  selectedStep: number;
  uriImg?: string;
  linear?: string[];
}

const NewHeader: React.FC<Props> = ({
  headerHeight,
  selectedStep,
  setSelectedStep,
  uriImg,
  linear,
}) => {
  const ref = useRef<FlatList>(null);
  const [unscrolled, setInitialScrollStatus] = useState<boolean>(false);
  const { badgeProgress } = useBadgeProgressContext();
  const { badge } = useSignleBadgeContext();

  const num = badge?.workoutLevels?.length ? badge?.workoutLevels?.length : 0;
  const doneTill = badgeProgress?.currentDay ? badgeProgress?.currentDay : 0;

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
    // const nbWorkouts = item.nbWorkouts ? item.nbWorkouts : 0;
    // const nbFP = item.nbFitpoints ? item.nbFitpoints : 0;
    const progElement = badgeProgress?.progress.filter(
      (item) => item.day === selectedStep
    );

    // let fpEarnt: number = 0;
    // let workoutsDone: number = 0;
    if (progElement?.length) {
      // fpEarnt = progElement[0].nbFPEarnt;
      // workoutsDone = progElement[0].nbWorkoutsDone;
    }

    // const title = `Done ${workoutsDone}/${nbWorkouts} Tasks`;
    // const subTitle = `Earnt ${fpEarnt}/${nbFP} FPs`;
    const subTitle = "";

    const onDayPress = () => {
      setSelectedStep(item.day);

      weEventTrack("workoutSelect_clickDay", { dayNumber: item.day });
    };

    return (
      <StepComponent
        text={item.day}
        isDone={isDone}
        isLast={item.day === num}
        isSelected={item.day === selectedStep}
        isUnlocked={
          item.day <=
          (badgeProgress?.currentDay ? badgeProgress?.currentDay : -1)
        }
        currentlyAtStep={item.day === badgeProgress?.currentDay}
        onPress={onDayPress}
        tooltipContent={{ subTitle }}
      />
    );
  };

  return (
    <>
      <View className="relative z-0">
        <Image
          source={{ uri: uriImg }}
          className="absolute left-0 right-0 top-0 bottom-0"
        />
        <LinearGradient
          colors={linear ? linear : ["transparent", "transparent"]}
          start={{ x: 0.45, y: 0 }}
          end={{ x: 0.55, y: 1 }}
          style={{ paddingTop: headerHeight }}
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
              className="aspect-[2] py-4"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              bounces={false}
            />
          ) : null}
        </LinearGradient>
      </View>
      <Text
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        className="text-white text-xl p-4"
      >
        Select a task
      </Text>
    </>
  );
};

export default NewHeader;
