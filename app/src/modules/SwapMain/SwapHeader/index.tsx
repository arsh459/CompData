import Header from "@modules/Header";
import { View, Text, Image } from "react-native";
import { swapIconYellowFrame20 } from "@constants/imageKitURL";

interface Props {}

const SwapHeader: React.FC<Props> = ({}) => {
  return (
    <Header
      back={true}
      tone="dark"
      headerColor="#232136"
      titleNode={
        <View className="flex flex-row items-center px-4">
          <Image
            className="w-5 aspect-square"
            source={{ uri: swapIconYellowFrame20 }}
            resizeMode="contain"
          />
          <Text
            className="text-base font-bold iphoneX:text-lg text-[#FCB750] pl-1.5"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Swap Meals
          </Text>
        </View>
      }
      centerTitle={true}
    />
  );
};

export default SwapHeader;
