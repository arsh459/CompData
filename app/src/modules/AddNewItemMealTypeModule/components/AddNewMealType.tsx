import { MealTypes, MealTypesArray } from "@models/Tasks/Task";
import { View, Text } from "react-native";
import MealTypeItem from "./MealTypeItem";

interface Props {
  mealType?: MealTypes;
  setMealType: (newMealType: MealTypes) => void;
}
const AddNewMealType: React.FC<Props> = ({ mealType, setMealType }) => {
  return (
    <>
      <View className="flex-1 px-4">
        <Text
          className="text-white px-4 text-lg pb-3"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Select Meal Time
        </Text>

        <View className="px-4 rounded-xl mt-6 mb-2">
          {MealTypesArray.map((item: MealTypes) => {
            return (
              <MealTypeItem
                item={item}
                key={item}
                mealType={mealType}
                setMealType={setMealType}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};

export default AddNewMealType;
