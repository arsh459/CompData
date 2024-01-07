import { View, Text, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
interface Props {
  numberString?: string;
  text?: string;
  startColor?: string;
  endColor?: string;
  children?: React.ReactNode;
}
const WinImages: React.FC<Props> = ({
  numberString,
  text,
  startColor,
  endColor,
  children,
}) => {
  return (
    <LinearGradient
      colors={[
        startColor ? startColor : "#0085E0",
        endColor ? endColor : "#3852AC",
      ]}
      start={[0, 0]}
      end={[1, 1]}
      locations={[0.2, 1]}
      className="flex  m-1   justify-center items-center rounded-3xl flex-1 aspect-[75/75]"
    >
      {children}

      <View className="flex flex-row items-center  ">
        {numberString ? (
          <>
            <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/Vector__49__nM5hx0Cb-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670056195132",
              }}
              className="h-4 w-4 mr-2"
            />

            <Text
              className="text-[10px] iphoneX:text-xs text-[#FFFFFF] "
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              // numberOfLines={1}
              // adjustsFontSizeToFit={true}
            >
              x {numberString}
            </Text>
          </>
        ) : null}
      </View>
      {text ? (
        <Text
          className="text-sm iphoneX:text-base text-[#FFFFFF] "
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          // numberOfLines={1}
          // adjustsFontSizeToFit={true}
        >
          {text}
        </Text>
      ) : null}
    </LinearGradient>
  );
};

export default WinImages;
