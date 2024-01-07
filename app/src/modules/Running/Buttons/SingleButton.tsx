import { Image, Pressable, Text, View } from "react-native";

import clsx from "clsx";
// import { getDistanceToShow } from "./utils";
interface Props {
  onPress: () => void;
  img: string;
  text?: string;
}
const SingleButton: React.FC<Props> = ({ img, text, onPress }) => {
  return (
    <View className="flex items-center pt-7">
      <Pressable onPress={onPress}>
        <Image
          source={{
            uri: img,
          }}
          resizeMode="contain"
          className={clsx(text ? "w-16" : "w-24 ", "aspect-square")}
        />
        {text ? (
          <Text
            className="text-[#FFFFFF80]  text-base pl-1 pt-1"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {text}
          </Text>
        ) : null}
      </Pressable>
    </View>
  );
};

export default SingleButton;
