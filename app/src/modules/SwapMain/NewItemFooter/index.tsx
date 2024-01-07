import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import useAddNewItem from "@providers/AddNewItem/useAddNewItem";
import { shallow } from "zustand/shallow";
import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { MealTypes } from "@models/Tasks/Task";

interface Props {
  taskId?: string;
  dayRecommendationId: string;
  mealType?: MealTypes;
}

const NewItemFooter: React.FC<Props> = ({
  taskId,
  dayRecommendationId,
  mealType,
}) => {
  const navigation = useNavigation();

  const { onInit } = useAddNewItem(
    (state) => ({
      onInit: state.onInit,
    }),
    shallow
  );

  const q = useAlgoliaStore((state) => state.query);

  const onAddItem = () => {
    onInit(q, mealType);

    weEventTrack("AddNewItemSearchScreen_addNewItem", {});
    navigation.navigate("AddNewItemSearchScreen", {
      taskId,
      dayRecommendationId,
    });
  };

  return (
    <View className="bg-[#343150] absolute bottom-0 left-0 right-0 py-4 flex flex-row items-center justify-between px-6 ">
      <View className="flex items-start justify-center flex-[1]">
        <Text
          className="text-white/80 text-xs text-left "
          style={{ fontFamily: "Nunito-Medium" }}
        >
          Can’t Find the item that your are looking for ?
        </Text>
      </View>
      <TouchableOpacity
        onPress={onAddItem}
        className="bg-[#6D55D1] px-6 flex items-center justify-center py-2.5 rounded-lg  "
      >
        <Text
          className="text-white/80 text-sm "
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Add New Item
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewItemFooter;
