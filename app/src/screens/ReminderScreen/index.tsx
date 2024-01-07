import Header from "@modules/Header";
import ReminderMain from "@modules/ReminderMain";
import { View } from "react-native";

const ReminderScreen = () => {
  return (
    <View className="flex-1">
      <Header back={true} headerColor="#343150" tone="dark" />
      <ReminderMain />
    </View>
  );
};

export default ReminderScreen;
