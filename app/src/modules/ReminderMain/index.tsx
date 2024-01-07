import { View } from "react-native";
import { useState } from "react";
import ViewSelectorV3 from "@components/ViewSelector/V3";
import TextBetween from "@components/TextBetween/TextBetween";
import { watchIconWhiteNew } from "@constants/imageKitURL";
import WorkoutReminder from "./WorkoutReminder";
import DietReminder from "./DietReminder";

const ReminderMain = () => {
  const [selectedView, setSelectedView] = useState<"Workout" | "Diet">(
    "Workout"
  );
  const reminder =
    selectedView === "Workout" ? (
      <WorkoutReminder />
    ) : selectedView === "Diet" ? (
      <DietReminder />
    ) : null;
  return (
    <View className="flex-1 bg-[#232136]">
      <View className="bg-[#343150] flex items-center">
        <TextBetween
          imgStr={watchIconWhiteNew}
          textLeft="Set Reminder"
          containerStyle="flex-row-reverse items-center"
          textLeftStyle="pl-1.5 text-2xl"
        />
        <ViewSelectorV3
          view1="Workout"
          view2="Diet"
          currView={selectedView}
          onView1={() => setSelectedView("Workout")}
          onView2={() => setSelectedView("Diet")}
          selectedViewHighlightColors={["#1A84FF", "#01A3FF"]}
          bgColor="bg-[#343150]"
        />
      </View>
      {reminder}
    </View>
  );
};

export default ReminderMain;
