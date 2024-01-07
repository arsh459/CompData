import { View } from "react-native";

import SettingHeader from "./SettingHeader";
interface Props {
  primaryString: string;
  secondaryString: string;
  children: React.ReactNode;
}
const SettingCardWrapper: React.FC<Props> = ({
  primaryString,
  secondaryString,
  children,
}) => (
  <View
    className="bg-[#6C49FF] m-4 rounded-2xl"
    // className="bg-[#6C49FF] relative z-0 aspect-[338/286] mx-4 rounded-2xl"
  >
    <SettingHeader
      primaryString={primaryString}
      secondaryString={secondaryString}
    />
    <View className="pb-2" />
    <View
      className="bg-[#343150] rounded-2xl py-0"
      //   className="absolute bg-[#343150] aspect-[338/218] flex justify-around rounded-2xl left-0 right-0 bottom-0"
    >
      {children}
    </View>
  </View>
);

export default SettingCardWrapper;
