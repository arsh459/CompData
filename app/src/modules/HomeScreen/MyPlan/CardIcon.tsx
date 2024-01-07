import { Image, Text, View } from "react-native";
import { getTaskIcon, statusTypes } from "./utils";

interface Props {
  status?: statusTypes;
  text?: string;
  color: string;
}

const CardIcon: React.FC<Props> = ({ status, text, color }) => {
  const data = getTaskIcon(status);

  return data ? (
    <>
      <View
        className="absolute top-4 right-4 w-[12%] aspect-square rounded-full"
        style={{
          backgroundColor: data.bgColor,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        <Image
          source={{ uri: data.icon }}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
      {status === "live" && text ? (
        <View className="absolute top-4 right-4 w-1/4">
          <View className="w-1/2 aspect-square" />
          <Text
            style={{ color, fontFamily: "BaiJamjuree-Bold" }}
            className="text-xs iphoneX:text-sm text-right py-1"
          >
            {text}
          </Text>
        </View>
      ) : null}
    </>
  ) : null;
};

export default CardIcon;
