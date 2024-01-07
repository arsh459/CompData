import { Text, View } from "react-native";
import {
  CookingType,
  cookingTypeArr,
} from "@providers/AddNewItem/useAddNewItem";
import CookingTypeItem from "./components/ItemsScreen/CookingTypeItem";

const AddNewItem = () => {
  return (
    <>
      <View className=" flex-1 px-4">
        <Text
          className="text-white px-4 text-lg pb-3"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Where did you eat this meal?
        </Text>

        <View className="px-4 rounded-xl mt-6 mb-2">
          {cookingTypeArr.map((item: CookingType) => {
            return <CookingTypeItem item={item} key={item} />;
          })}
        </View>
      </View>
    </>
  );
};

export default AddNewItem;
