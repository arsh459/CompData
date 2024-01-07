import { View } from "react-native";

import ReminderFieldComp from "./ReminderFieldComp";
import { getTaskSectionIcon } from "@modules/HomeScreen/MyPlan/utils";
import MealReminderListCard from "./MealReminderListCard";

const DietReminder = () => {
  const { icon } = getTaskSectionIcon("Breakfast");
  const arr = [
    {
      textLeft: "Pre Breakfast",
      textRight: "8:00 AM",
    },
    {
      textLeft: "Breakfast",
      textRight: "11:00 AM",
    },
    {
      textLeft: "Lunch",
      textRight: "2:00 PM",
    },
    {
      textLeft: "Evening Snack",
      textRight: "5:00 PM",
    },
    {
      textLeft: "Dinner",
      textRight: "7:00 PM",
    },
  ];
  return (
    <View>
      <ReminderFieldComp mainText="Cheat Day" text={"Saturday"} />
      <View className="p-3 m-4 rounded-xl bg-[#343150]">
        {arr.map((item) => (
          <MealReminderListCard
            icon={icon}
            textLeft={item.textLeft}
            textRight={item.textRight}
            key={item.textLeft}
          />
        ))}
      </View>
    </View>
  );
};

export default DietReminder;
