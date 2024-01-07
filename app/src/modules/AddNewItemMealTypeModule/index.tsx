import { View } from "react-native";
import Header from "@modules/Header";
import AddButton from "@modules/AddNewItem/components/searchScreen/AddButton";
import AddNewMealType from "./components/AddNewMealType";
import { MealTypes } from "@models/Tasks/Task";

interface Props {
  onProceed: () => void;
  mealType?: MealTypes;
  setMealType: (newMealType: MealTypes) => void;
}
const AddNewItemMealTypeModule: React.FC<Props> = ({
  onProceed,
  mealType,
  setMealType,
}) => {
  return (
    <View className="flex-1 bg-[#232136]">
      <Header back={true} headerColor="#232136" tone="dark" />
      <AddNewMealType mealType={mealType} setMealType={setMealType} />
      <AddButton onPress={onProceed} cta={"Proceed"} />
    </View>
  );
};

export default AddNewItemMealTypeModule;
