import BatterySaverMain from "@modules/BatterySaverMain";
import Header from "@modules/Header";

import { View } from "react-native";

const BatterySaverScreen = () => {
  return (
    <View className="bg-[#232136] flex-1">
      <Header back={true} headerColor="#232136" tone="dark" />
      <BatterySaverMain />
    </View>
  );
};

export default BatterySaverScreen;
