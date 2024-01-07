import ImageWithURL from "@components/ImageWithURL";
import { MealTypeIcon, MealTypes } from "@models/Tasks/Task";

import clsx from "clsx";
import { View, Text } from "react-native";
interface Props {
  text?: string;
  mealType: MealTypes;
  isSelected: boolean;
}
const ListItem: React.FC<Props> = ({ text, mealType, isSelected }) => {
  // const { isSelected } = useAddNewItem((state) => ({
  //   isSelected: state.mealType === mealType,
  // }));
  return (
    <View className={clsx("flex flex-row items-center p-5 justify-between")}>
      <View className="flex flex-row items-center justify-center  ">
        <View className="w-6 aspect-square mr-1">
          <ImageWithURL
            source={{
              uri: MealTypeIcon[mealType],
            }}
          />
        </View>
        <Text
          className={clsx(
            "text-base pl-1 flex-1",
            isSelected ? "text-[#232136]" : "text-[#f1f1f1]"
          )}
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {text}
        </Text>
        <View
          className={clsx(
            "rounded-full",
            isSelected ? "" : "border border-white"
          )}
        >
          <ImageWithURL
            source={{
              uri: isSelected
                ? "https://ik.imagekit.io/socialboat/Frame%201000001315%20(1)_skI1XF-pi.png?updatedAt=1697811548491"
                : "",
            }}
            className={clsx(" aspect-square", isSelected ? "w-5" : "w-4")}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default ListItem;
