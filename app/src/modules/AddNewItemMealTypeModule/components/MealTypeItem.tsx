import { MealTypes } from "@models/Tasks/Task";
import ListItem from "./ListItem";
import clsx from "clsx";
import { TouchableOpacity } from "react-native";

interface Props {
  item: MealTypes;
  mealType?: MealTypes;
  setMealType: (newMealType: MealTypes) => void;
}
const MealTypeItem: React.FC<Props> = ({ item, mealType, setMealType }) => {
  // const { isSelected, setMealType } = useAddNewItem(
  //   (state) => ({
  //     isSelected: state.mealType === item,
  //     setMealType: state.setMealType,
  //   }),
  //   shallow
  // );
  const isSelected = item === mealType;
  return (
    <TouchableOpacity
      onPress={() => {
        setMealType(item);
      }}
      key={item}
      className={clsx(
        isSelected ? "bg-[#FFF]" : " bg-[#343150]",
        "mb-3.5 rounded-2xl"
      )}
    >
      <ListItem text={item} mealType={item} isSelected={isSelected} />
    </TouchableOpacity>
  );
};

export default MealTypeItem;
