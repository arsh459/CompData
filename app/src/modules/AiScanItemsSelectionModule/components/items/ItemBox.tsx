import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";
import Item from "./Item";
interface Props {
  item: string[];
  index: number;
}

const ItemBox: React.FC<Props> = ({ item, index }) => {
  const { selectedItems } = useCameraImage(
    (state) => ({
      selectedItems: state.selectedItems,
    }),
    shallow
  );

  const selectedItem = item.filter((stringItem, stringIndex) => {
    return selectedItems[stringItem] === true;
  });

  return (
    <View className=" mt-4 ">
      <View className="border-b border-[#ffffff33] px-8 flex flex-row justify-center items-center bg-[#2F2C4D]">
        <View className="flex-1 justify-center items-center">
          <Text
            className="text-sm text-[#f1f1f1b3] py-5"
            style={{ fontFamily: "Poppins-Medium" }}
            numberOfLines={1}
          >
            {selectedItem.length > 0 ? selectedItem[0] : "Select Item"}
          </Text>
        </View>
      </View>
      {item.map((subItem, subIndex) => {
        return (
          <Item
            key={`${index}-${subIndex}`}
            subItem={subItem}
            index={index}
            subIndex={subIndex}
          />
        );
      })}
    </View>
  );
};

export default ItemBox;
