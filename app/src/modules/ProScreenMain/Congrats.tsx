import { View, Text, Image } from "react-native";

interface Props {
  mainText?: string;
  subText?: string;
  validity?: string;
  proIcon?: string;
}
const Congrats: React.FC<Props> = ({
  mainText,
  subText,
  validity,
  proIcon,
}) => {
  return (
    <View className="p-4 pr-2 mx-4 rounded-2xl flex flex-row justify-between items-center bg-[#343150]">
      <View className="flex-1">
        <Text
          className="text-white text-base iphoneX:text-lg"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {mainText}
        </Text>
        <Text
          className="text-white/60 text-xs py-2 leading-4"
          style={{ fontFamily: "Nunito-Light" }}
        >
          {subText}
        </Text>
        {validity ? (
          <Text
            className="text-white/60 text-xs "
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            Valid Till
            <Text
              className="text-white text-xs "
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {validity}
            </Text>
          </Text>
        ) : null}
      </View>
      <View className="w-4 aspect-square" />
      <Image
        source={{
          uri: proIcon,
        }}
        className="w-16 aspect-square "
        resizeMode="contain"
      />
    </View>
  );
};

export default Congrats;
