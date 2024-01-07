import SelectedIcon from "@components/SvgIcons/SelectedIcon";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";
import { shallow } from "zustand/shallow";
interface Props {
  subItem: string;
  index: number;
  subIndex: number;
}
const Item: React.FC<Props> = ({ subItem, index, subIndex }) => {
  const { isSelected, toggleSelectedItem } = useCameraImage(
    (state) => ({
      isSelected: state.selectedItems[subItem],
      toggleSelectedItem: state.toggleSelectedItem,
      selectedItems: state.selectedItems,
    }),
    shallow
  );
  // console.log("selected", subItem, isSelected);
  return (
    <TouchableOpacity
      onPress={() => {
        toggleSelectedItem(subItem, index, subIndex);
      }}
      className={clsx(
        "border-b border-[#ffffff33]  px-8 flex flex-row justify-between",
        isSelected ? "bg-[#8b6eff4d]" : "bg-[#2F2C4D]"
      )}
    >
      <View className="flex-1">
        <Text
          className="text-sm text-[#f1f1f1b3] py-5"
          style={{ fontFamily: "Poppins-Medium" }}
          numberOfLines={1}
        >
          {subItem}
        </Text>
      </View>
      <View className=" flex items-center justify-center">
        <View
          className={clsx(
            isSelected
              ? "w-5"
              : "rounded-full w-5 aspect-square border border-white"
          )}
        >
          {isSelected && <SelectedIcon />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
