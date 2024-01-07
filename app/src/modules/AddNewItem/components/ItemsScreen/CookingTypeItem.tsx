import ListMealType from "@modules/AddNewItem/ListMealType";
import useAddNewItem, {
  CookingType,
} from "@providers/AddNewItem/useAddNewItem";
import clsx from "clsx";
import { TouchableOpacity } from "react-native";
import { shallow } from "zustand/shallow";
interface Props {
  item: CookingType;
}
const CookingTypeItem: React.FC<Props> = ({ item }) => {
  const { setCookingType, isSelected } = useAddNewItem(
    (state) => ({
      isSelected: state.cookingType === item,
      setCookingType: state.setCookingType,
    }),
    shallow
  );
  return (
    <TouchableOpacity
      onPress={() => {
        setCookingType(item);
      }}
      key={item}
      className={clsx(
        isSelected ? "bg-[#FFF]" : " bg-[#343150]",
        "mb-3.5 rounded-2xl"
      )}
    >
      <ListMealType text={item.split("_").join(" ")} cookingType={item} />
    </TouchableOpacity>
  );
};

export default CookingTypeItem;
