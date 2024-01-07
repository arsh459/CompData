import { ScrollView } from "react-native";
import FoodElementBox from "./FoodElementBox";
import { foodChoices } from "./utils";
import { MealTypesDietForm } from "@models/User/User";

interface Props {
  setSelected: React.Dispatch<
    React.SetStateAction<
      Partial<Record<MealTypesDietForm, Record<string, boolean>>> | undefined
    >
  >;
  selected?: Partial<Record<MealTypesDietForm, Record<string, boolean>>>;
}
const SelectFoodCard: React.FC<Props> = ({ selected, setSelected }) => {
  const handleOptionToggle = (
    meal: MealTypesDietForm,
    option: string,
    isSelected: boolean
  ) => {
    setSelected((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          [meal]: { ...prevState[meal], [option]: !isSelected },
        };
      } else {
        return {
          [meal]: { [option]: !isSelected },
        };
      }
    });
  };

  return (
    <ScrollView className="flex-1 p-2.5">
      <FoodElementBox
        foodChoices={foodChoices.breakfast}
        handleOptionToggle={handleOptionToggle}
        selectedOptions={selected?.breakfast}
        color="#FFA53A"
        mealType="breakfast"
      />
      <FoodElementBox
        foodChoices={foodChoices.lunch}
        handleOptionToggle={handleOptionToggle}
        selectedOptions={selected?.lunch}
        color="#F6527A"
        mealType="lunch"
        containerColor="#503140"
      />
      <FoodElementBox
        foodChoices={foodChoices.dinner}
        handleOptionToggle={handleOptionToggle}
        selectedOptions={selected?.dinner}
        color="#3AC4FF"
        mealType="dinner"
        containerColor="#314150"
      />
    </ScrollView>
  );
};

export default SelectFoodCard;
