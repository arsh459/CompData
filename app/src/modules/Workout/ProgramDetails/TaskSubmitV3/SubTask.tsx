import {
  Animated,
  // Easing
} from "react-native";
import { SubTaskElement } from "@models/Tasks/Task";
// import ExerciseCardV2 from "../CourseTaskPreview/ExerciseCardV2";
// import { useContentContext } from "./utils/ContentProvider";
import {
  //  useEffect,
  useRef,
} from "react";

// const dur = 500;

interface Props {
  item: SubTaskElement;
  index: number;
  onPress: () => void;
}

const SubTask: React.FC<Props> = ({ item, index, onPress }) => {
  const heightVal = useRef(new Animated.Value(0)).current;

  // const { subTasksObj, selectedSubTaskIndex } = useContentContext();

  const height = heightVal.interpolate({
    inputRange: [0, 1],
    outputRange: ["70%", "95%"],
  });

  // useEffect(() => {
  //   if (selectedSubTaskIndex === index) {
  //     Animated.timing(heightVal, {
  //       toValue: 1,
  //       duration: dur,
  //       easing: Easing.linear,
  //       useNativeDriver: false,
  //     }).start();
  //   } else {
  //     Animated.timing(heightVal, {
  //       toValue: 0,
  //       duration: dur,
  //       easing: Easing.linear,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // }, [index, selectedSubTaskIndex]);

  return (
    <Animated.View
      style={{ height }}
      className="aspect-[180/130] px-0.5 flex justify-end"
    >
      {/* <ExerciseCardV2
        subTask={subTasksObj[item.subTaskId]}
        index={index}
        onPress={onPress}
      /> */}
    </Animated.View>
  );
};

export default SubTask;
