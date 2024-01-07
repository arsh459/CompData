import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { View, ScrollView } from "react-native";
import { shallow } from "zustand/shallow";
import ItemAddButton from "./ItemAddButton";
import ItemBox from "./ItemBox";
import ItemHeader from "./ItemHeader";
const ItemList = () => {
  const { itemsStringArray } = useCameraImage(
    (state) => ({
      itemsStringArray: state.itemsStringArray,
    }),
    shallow
  );
  return (
    <View className="flex-1 bg-[#232136]">
      <View className="pt-24 flex-1">
        <View className="flex-1 ">
          <ItemHeader />
          <ItemAddButton />
          <ScrollView>
            {itemsStringArray &&
              itemsStringArray.length > 0 &&
              itemsStringArray.map((item, index) => {
                return <ItemBox key={index} item={item} index={index} />;
              })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ItemList;
