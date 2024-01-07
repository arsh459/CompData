import { View, TextInput } from "react-native";
import ItemHeader from "@modules/AiScanItemsSelectionModule/components/items/ItemHeader";
interface Props {
  text: string;
  setText: (text: string) => void;
}
const AddItem: React.FC<Props> = ({ text, setText }) => {
  return (
    <View className="flex-1 bg-[#232136]">
      <View className="pt-24 flex-1">
        <View className="flex-1 ">
          <ItemHeader title={"Add new item"} />
          <View className="pb-4">
            <TextInput
              className="w-full px-4 py-4  text-white text-sm bg-[#F4753F]"
              value={text}
              onChangeText={(e) => {
                setText(e);
              }}
              placeholder="Add an new item to list"
              placeholderTextColor="#ffffff80"
              cursorColor={"#fff"}
              blurOnSubmit
              autoFocus
              style={{ fontFamily: "Poppins-Medium" }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddItem;
