import { View, Text, useWindowDimensions } from "react-native";

import TextAlert from "../TextAlert";
import GradientText from "@components/GradientText";
import { iPhoneX } from "@constants/screen";
interface Props {
  counter: number;
}
const StartRunning: React.FC<Props> = ({ counter }) => {
  const { width } = useWindowDimensions();
  return (
    <TextAlert>
      {counter !== 0 ? (
        <View className="flex pl-4 justify-center items-center flex-1 pb-8">
          <View className="">
            <GradientText
              text={`Starting`}
              textStyle={{
                fontFamily: "BaiJamjuree-Medium",
                fontWeight: "700",
                color: "white",
                fontSize: width > iPhoneX ? 54 : 42,

                fontStyle: "italic",
              }}
              colors={["#1DA0FF", "#2560FF"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              fallbackColor="white"
            />
            <Text
              style={{
                fontFamily: "BaiJamjuree-Medium",
                fontWeight: "700",
                color: "#2560FF",
                fontSize: width > iPhoneX ? 54 : 42,

                fontStyle: "italic",
              }}
            >
              in {counter}...
            </Text>
          </View>
        </View>
      ) : (
        <View className="flex flex-row px-4 w-1/2 mx-auto justify-center items-center flex-1 pb-8">
          <GradientText
            text="Let’s Run!"
            textStyle={{
              fontFamily: "BaiJamjuree-Medium",
              fontWeight: "700",
              color: "white",
              fontSize: width > iPhoneX ? 66 : 56,
              fontStyle: "italic",
            }}
            colors={["#1DA0FF", "#2560FF"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            fallbackColor="white"
          />
        </View>
      )}
      <View className="h-12" />
    </TextAlert>
  );
};

export default StartRunning;
