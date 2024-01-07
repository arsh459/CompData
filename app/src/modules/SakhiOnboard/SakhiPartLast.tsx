import { View, Text } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import { useWindowDimensions } from "react-native";
import { SakhiPartLastAi, SakhiPartLastBottom } from "@constants/imageKitURL";
import GradientText from "@components/GradientText";

const SakhiPartLast = () => {
  const { height } = useWindowDimensions();
  return (
    <View style={{ height }}>
      <View className="flex-1 flex items-center">
        <ImageWithURL
          source={{ uri: SakhiPartLastAi }}
          className="w-full aspect-[285/181]"
          resizeMode="contain"
        />
        <GradientText
          text={"The Future of Health is here "}
          colors={["#73FFE6", "#38CFFF"]}
          end={{ x: 0, y: 1 }}
          start={{ x: 1, y: 0 }}
          textStyle={{
            lineHeight: 30,
            fontSize: 24,
            textAlign: "center",
            fontWeight: "700",
            paddingLeft: 12,
            fontFamily: "Nunito-Bold",
          }}
        />
        <Text className="text-sm text-white text-center px-4 flex-[.45] w-4/5">
          Trained on 570 Billion Parameters. Tuned by SocialBoat coaches &
          gynaecologists.
        </Text>

        <ImageWithURL
          source={{ uri: SakhiPartLastBottom }}
          className="w-full aspect-[400/252]"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SakhiPartLast;
