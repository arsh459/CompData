import TaskCardV3 from "./TaskCards/TaskCardV3";
import { useDayContext } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import { useDayRec } from "@hooks/dayRecs/useDayRec";
import { TaskRec } from "@models/User/User";
import Footer from "./Footer";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { getPastText } from "@hooks/dayRecs/utils";
import { useTasksMain } from "@hooks/dayRecs/useTasksMain";
import { Task } from "@models/Tasks/Task";
import DaySelectorV3 from "@modules/Nutrition/V2/DaySelector/V3";
import { Day, useWorkoutPreference } from "@hooks/task/useWorkoutPreference";
import { format } from "date-fns";
import { useOnboardContext } from "@modules/Workout/GuidedOnboard/OnboardProvider";
import { FlashList } from "@shopify/flash-list";
import { shouldSetProps } from "../GuidedOnboard/DemoComps/utils";
import {
  View,
  ViewToken,
  ViewabilityConfig,
  useWindowDimensions,
} from "react-native";
import { usePreviewContext } from "./PreviewProvider/PreviewProvider";
import { getTaskFromViewTocken } from "./PreviewProvider/hooks/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import {
  imgTaskCardHeight,
  renderTaskCardHeight,
  renderTaskCardWidth,
} from ".";

interface Props {
  accessDueToBootcamp: boolean;
}

const TaskList: React.FC<Props> = ({ accessDueToBootcamp }) => {
  const { setTarget } = usePreviewContext();
  const { selectedtDate, startUnix, selectedUnix } = useDayContext();
  const { badge } = useSignleBadgeContext();
  const { width } = useWindowDimensions();
  const estimatedItemSize = width * 0.78;
  const { recomendation, error, fetch } = useDayRec(
    selectedtDate,
    "workout",
    badge?.id
  );

  const { workoutDays } = useWorkoutPreference();
  const targetDay = format(new Date(selectedUnix), "EEEE").toLowerCase() as Day;
  const restDay = !workoutDays.includes(targetDay);
  const { flashListRef, taskCard, daySelector, setTaskCardProp } =
    useOnboardContext();

  const { workoutCardOnboard, workoutProgOnboard, workoutDoneOnboard } =
    useUserStore((state) => {
      return {
        workoutCardOnboard: state.user?.flags?.workoutCardOnboard,
        workoutProgOnboard: state.user?.flags?.workoutProgOnboard,
        workoutDoneOnboard: state.user?.flags?.workoutDoneOnboard,
      };
    }, shallow);

  const { tasks } = useTasksMain(
    false,
    recomendation?.manual && recomendation.overrideBadgeId
      ? recomendation.overrideBadgeId
      : recomendation?.badgeId,
    recomendation?.manual && typeof recomendation.overrideDay === "number"
      ? recomendation.overrideDay
      : recomendation?.day,
    recomendation?.tasks,
    restDay
  );

  const pastText = getPastText(selectedUnix, startUnix);

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const props = shouldSetProps(
      item.id,
      index,
      workoutCardOnboard,
      workoutProgOnboard,
      workoutDoneOnboard
    )
      ? {
          ref: taskCard,
          collapsable: false,
          onLayout: () =>
            setTaskCardProp({
              task: item,
              height: renderTaskCardHeight,
              width: renderTaskCardWidth,
              imgHeight: imgTaskCardHeight,
            }),
        }
      : {};

    return (
      <View
        {...props}
        style={{ width: renderTaskCardWidth, height: renderTaskCardHeight }}
        className="mx-auto"
      >
        <TaskCardV3
          task={item}
          accessDueToBootcamp={accessDueToBootcamp}
          width={renderTaskCardWidth}
          height={renderTaskCardHeight}
          imgHeight={imgTaskCardHeight}
        />
      </View>
    );
  };

  const keyExtractor = (item: TaskRec) => item.id;

  const config: ViewabilityConfig = {
    minimumViewTime: 1000,
    itemVisiblePercentThreshold: 100,
    waitForInteraction: false,
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    const targets = getTaskFromViewTocken(viewableItems);
    // const previewTaskObj = recusiveFunc(targets, 0, targets.length);
    if (targets.length && targets[0].id) {
      setTarget({ taskId: targets[0].id });
    }
    // setTarget(previewTaskObj);
  };

  return (
    <FlashList
      ref={flashListRef}
      data={tasks}
      renderItem={renderItem}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={config}
      estimatedItemSize={estimatedItemSize}
      ListHeaderComponent={
        <View ref={daySelector} collapsable={false}>
          <DaySelectorV3 recomendation={recomendation} type="workout" />
        </View>
      }
      ListFooterComponent={
        <Footer
          fetch={fetch}
          error={error}
          restDay={restDay}
          future={!recomendation}
          pastText={pastText}
          restString=""
          futureText="Socialboat AI will generate your workouts as per your daily activities"
        />
      }
      ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
      scrollEventThrottle={16}
      keyExtractor={keyExtractor}
      className="flex-1 "
      bounces={false}
    />
  );
};

export default TaskList;
