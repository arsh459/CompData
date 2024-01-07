import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import { MealTypes } from "@models/Tasks/Task";
import ListItem from "@modules/AddNewItemMealTypeModule/components/ListItem";
import clsx from "clsx";
import { TouchableOpacity } from "react-native";
import { shallow } from "zustand/shallow";

interface Props {
  item: MealTypes;
}
const AlgoliaMealTypeItem: React.FC<Props> = ({ item }) => {
  const { setOverridedMealType, isSelected } = useAlgoliaStore(
    (state) => ({
      setOverridedMealType: state.setOverridedMealType,
      isSelected: state.overridedMealType === item,
    }),
    shallow
  );

  return (
    <TouchableOpacity
      onPress={() => {
        setOverridedMealType(item);
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

export default AlgoliaMealTypeItem;
