import { View, Text, Image } from "react-native";

import { baseImageKit } from "@constants/imageKitURL";
import clsx from "clsx";
interface Props {
  imageUrl?: string;
  text?: string;
  textStyle?: string;
  imgHWStr?: string;
  fullUrl?: boolean;
}

const TaskPoints: React.FC<Props> = ({
  imageUrl,
  text,
  textStyle,
  imgHWStr,
  fullUrl,
}) => {
  const imgUrl = fullUrl ? imageUrl : `${baseImageKit}/${imageUrl}`;
  return (
    <View className="flex flex-row  py-1 items-center">
      <Image
        source={{
          uri: imgUrl,
        }}
        className={clsx(imgHWStr ? imgHWStr : "w-2 iphoneX:w-3 aspect-square ")}
        resizeMode="contain"
      />
      <Text
        className={clsx(
          "pl-1 iphoneX:pl-2  text-white",
          textStyle ? textStyle : "text-white text-xs"
        )}
        style={{ fontFamily: "Nunito-SemiBold" }}
      >
        {text}
      </Text>
    </View>
  );
};

export default TaskPoints;
