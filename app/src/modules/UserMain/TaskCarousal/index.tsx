import useUserTasks from "@hooks/task/useUserTasks";
import { Task } from "@models/Tasks/Task";
import { useUserContext } from "@providers/user/UserProvider";
import { getGameNameReadable } from "@utils/challange/utils";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import SuggestedTaskCard from "../../HomeScreen/SuggestedTasksContainer/SuggestedTaskCard";

const TaskCarousal = () => {
  const { user } = useUserContext();
  const { userTasks, onNext } = useUserTasks(user?.uid, 2);
  const [cardWidth, setCardWidth] = useState(0);
  const renderItem = ({ item }: { item: Task }) => {
    return (
      <View style={{ width: cardWidth }} className="p-2">
        <SuggestedTaskCard
          task={item}
          challengeName={item.games ? getGameNameReadable(item?.games[0]) : ""}
          maxHeight={280}
        />
      </View>
    );
  };
  return (
    <>
      {userTasks?.length ? (
        <FlatList
          data={userTasks}
          className="flex-1 mx-2"
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          //   onEndReachedThreshold={50}
          onEndReached={onNext}
          bounces={false}
          numColumns={2}
          onLayout={(e) => setCardWidth(e.nativeEvent.layout.width / 2)}
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
export default TaskCarousal;
