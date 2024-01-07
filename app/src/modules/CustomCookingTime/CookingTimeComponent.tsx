import { TouchableOpacity, View, Text } from "react-native";

import useCustomRecipe, {
  cookingTime,
} from "@providers/customRecipe/useCustomRecipe";
import { showCookingData } from "@screens/CustomRecipeCookingTime";
import SvgIcons from "@components/SvgIcons";
import { shallow } from "zustand/shallow";

interface Props {
  item: showCookingData;
  data: cookingTime[];
  index: number;
}

const CookingTimeComp: React.FC<Props> = ({ item, data, index }) => {
  const { isSelected, setTime } = useCustomRecipe(
    (state) => ({
      setTime: state.setTime,
      isSelected: state.time === data[index],
    }),
    shallow
  );
  return (
    <TouchableOpacity
      onPress={() => {
        setTime(data[index]);
      }}
    >
      <View
        className={`h-20 mb-4 flex flex-row justify-start pl-6  ${
          isSelected ? "bg-[#fff]" : "bg-[#343150]"
        }  w-full rounded-2xl `}
      >
        <View className="flex justify-center mr-6">
          <SvgIcons iconType={item.iconType} />
        </View>
        <View className=" flex justify-center">
          <Text
            className={`${
              isSelected ? "text-[#232136]" : "text-[#fff]"
            }  text-center text-sm`}
          >
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CookingTimeComp;
