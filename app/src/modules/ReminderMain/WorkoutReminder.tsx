import { View } from "react-native";
import ReminderFieldComp from "./ReminderFieldComp";
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WorkoutReminder = () => (
  <View>
    <ReminderFieldComp
      mainText="My Workout days"
      text={daysOfWeek.join(", ")}
    />
    <ReminderFieldComp
      mainText="Mark a holiday"
      text={"No Holiday"}
      textStyle="text-[#FFAF51]"
      note="We will not assign you tasks on that day. This does not pause your membership."
    />
    <ReminderFieldComp mainText="My Workout Time" text={"4 : 43 pm"} />
    <ReminderFieldComp
      mainText="Program Started On"
      text={"21st April 2023"}
      textStyle="text-[#51FF8C]"
    />
  </View>
);

export default WorkoutReminder;
