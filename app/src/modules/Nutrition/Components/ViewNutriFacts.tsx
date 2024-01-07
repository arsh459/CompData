import { Task } from "@models/Tasks/Task";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";

import { View } from "react-native";
import Nutrifact from "./NutriFact";

interface Props {
  setShowNutrition: React.Dispatch<React.SetStateAction<boolean>>;
  task: Task;
}

const ViewNutriFacts: React.FC<Props> = ({ setShowNutrition, task }) => {
  return (
    <View className="bg-[#FFF6E3] rounded-3xl absolute left-0 right-0 top-0 bottom-0 z-10">
      <ButtonWithIcon
        iconUrl={`https://ik.imagekit.io/socialboat/Vector__53__YWjc7HKXM9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671013468404`}
        title={"Nutritional Value"}
        textColor="text-[#14131E] "
        textStyle="pl-2 text-xs iphoneX:text-sm "
        roundedStr="rounded-full py-3  px-4 flex flex-row  justify-between flex-row-reverse"
        iconStyle="w-[21px] aspect-square "
        fontFamily="BaiJamjuree-Bold"
        layoutStyle={{
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          marginVertical: 16,
          marginHorizontal: 8,
        }}
        onPress={() => setShowNutrition((prev) => !prev)}
      />
      <View className=" flex flex-row flex-wrap py-2">
        <Nutrifact
          value={task?.nutritionFacts?.protein || 0}
          text={"protein"}
        />
        <Nutrifact value={task?.nutritionFacts?.fibre || 0} text={"fibre"} />
        <Nutrifact value={task?.nutritionFacts?.fats || 0} text={"fats"} />
        <Nutrifact value={task?.nutritionFacts?.carbs || 0} text={"carbs"} />
      </View>
    </View>
  );
};
export default ViewNutriFacts;
