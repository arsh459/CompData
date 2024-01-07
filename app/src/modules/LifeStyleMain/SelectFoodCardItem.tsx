import { View, Text, TouchableOpacity } from "react-native";

import clsx from "clsx";
import SvgIcons from "@components/SvgIcons";
interface Props {
  item: string;
  isSelected: boolean;

  onPress: () => void;
  isInDb?: boolean;
  color?: string;
}
const SelectFoodCardItem: React.FC<Props> = ({
  onPress,
  item,

  isSelected,
  isInDb,
  color,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="relative z-0">
        <View
          className={clsx(
            "flex flex-row items-center px-3 py-1.5 m-2 mx-1  rounded-full ",
            isSelected && "border-2  "
          )}
          style={{
            backgroundColor: color ? `${color}40` : "#3ACFFF",

            borderColor:
              isSelected && color ? color : isSelected ? "#3ACFFF" : undefined,
          }}
        >
          <Text
            className="text-sm iphoneX:text-base text-white capitalize"
            style={{
              fontFamily: "Nunito-Bold",
            }}
          >
            {item.replaceAll("_", "")}
          </Text>
        </View>
        {isSelected && isInDb ? (
          <View
            className={clsx(
              "absolute bottom-1 right-1 rounded-full flex justify-center items-center w-4 aspect-square "
            )}
            style={{
              backgroundColor: color ? color : "#3ACFFF",
            }}
          >
            <View className="w-full p-1">
              <SvgIcons iconType="minus" color={"#000"} />
            </View>
          </View>
        ) : isSelected ? (
          <View
            className={clsx(
              "absolute bottom-1 right-1 rounded-full  flex justify-center items-center w-4 aspect-square "
            )}
            style={{
              backgroundColor: color ? color : "#3ACFFF",
            }}
          >
            <View className="w-full p-1">
              <SvgIcons iconType="tickCheck" color={"#000"} />
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default SelectFoodCardItem;
