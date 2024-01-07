import { Task } from "@models/Tasks/Task";
import { Text, useWindowDimensions } from "react-native";
import Swiper from "@components/Swiper";
import ExerciseCard from "./ExerciseCard";

interface Props {
  task?: Task;
}

const Exercises: React.FC<Props> = ({ task }) => {
  const { width } = useWindowDimensions();

  return task?.subTasks?.length ? (
    <>
      <Text
        className="text-sm p-4 iphoneX:text-sm text-white"
        style={{
          fontFamily: "BaiJamjuree-SemiBold",
        }}
      >
        {task.subTasks.length} Exercises in this video
      </Text>
      <Swiper slideWidth={width / 1.8} spaceBetween={28} marginX={4}>
        {task.subTasks.map((item, index) => (
          <ExerciseCard
            key={item.subTaskId}
            subTaskId={item.subTaskId}
            index={index}
          />
        ))}
      </Swiper>
    </>
  ) : null;
};

export default Exercises;
