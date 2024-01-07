import { View, Text } from "react-native";

// import { Task } from "@models/Tasks/Task";
import { EarnedTaskInterface } from "./EarnedTaskCard";
import { format } from "date-fns";
import { FlashList } from "@shopify/flash-list";
import ActivityCardNew from "./ActivityCardNew";
import { useNavigation } from "@react-navigation/native";
// import { Dimensions } from "react-native";
// import { Activity } from "@models/Activity/Activity";
// const { width: WIDTH } = Dimensions.get("window");
interface Props {
  userTasks?: EarnedTaskInterface[];
  onNext?: () => void;
}
export const ActivityList_Item_Height = 115;
const ActivityList: React.FC<Props> = ({ userTasks, onNext }) => {
  //   const [cardWidth, setCardWidth] = useState(0);

  const navigation = useNavigation();

  const renderItem = ({ item }: { item: EarnedTaskInterface }) => {
    const gainedFp = item?.fitPoints ? item.fitPoints : 0;
    // const totalFp = item?.totalFP ? item.totalFP : 1;
    const size = ActivityList_Item_Height - 40;
    // const hexWidth = WIDTH / 6;
    // const hexHeight = hexWidth + 60;
    // const taskName =
    const tName =
      item.name === "Daily Walking Steps" ? "Daily Steps" : item.name;
    // const totalFPToShow =
    // item.name === "Daily Walking Steps" ? 0 : item.totalFP;
    const onPress = () => {
      navigation.navigate("WorkoutDoneScreen", {
        taskId: item.taskId,
        // actId: item.id,
        attemptedDate: item.attemptedDate,
      });
    };

    return (
      <ActivityCardNew
        size={size}
        gainedFp={gainedFp}
        onPress={onPress}
        totalFp={item.totalFP}
        width={size}
        height={size}
        media={item.media}
        name={tName}
        progress={item?.progress ? item.progress : 0}
        subText={item.unix ? `${format(new Date(item.unix), "do LLL")}` : ""}
      />
    );
  };
  return (
    <>
      {userTasks?.length ? (
        <FlashList
          data={userTasks}
          className="flex-1 "
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // keyExtractor={(item, index) => `${item.id}-${index}`}
          estimatedItemSize={ActivityList_Item_Height}
          onEndReached={onNext}
          bounces={false}
          ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
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

export default ActivityList;
