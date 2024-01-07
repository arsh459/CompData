import { View, Text, FlatList } from "react-native";

import { Task } from "@models/Tasks/Task";
// import EarnedTaskCard from "./EarnedTaskCard";
interface Props {
  userTasks?: Task[];
  onNext?: () => void;
}
const TaskLists: React.FC<Props> = ({ userTasks, onNext }) => {
  // const [cardWidth, setCardWidth] = useState(0);

  const renderItem = ({ item }: { item: Task }) => {
    return (
      <View className="p-2">
        {/* <EarnedTaskCard task={item} maxHeight={280} cardWidth={cardWidth} /> */}
      </View>
    );
  };
  return (
    <>
      {userTasks?.length ? (
        <FlatList
          data={userTasks}
          className="flex-1 "
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          //   onEndReachedThreshold={50}
          onEndReached={onNext}
          // onLayout={(e) => setCardWidth(e.nativeEvent.layout.width / 3)}
          bounces={false}
        />
      ) : (
        <View className="flex-1 flex items-center justify-center">
          <Text className="text-3xl text-gray-700 text-center font-bold">
            No Tasks to show
          </Text>
        </View>
      )}
    </>
  );
};

export default TaskLists;
