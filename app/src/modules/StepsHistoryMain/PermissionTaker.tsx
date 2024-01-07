import { View, Text, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import clsx from "clsx";
interface Props {
  imgUrl: string;
  text: string;
  children?: React.ReactNode;
  imgStyleTW?: string;
  txtLayoutStyleTW?: string;
}
const PermissionTaker: React.FC<Props> = ({
  imgUrl,
  text,
  children,
  imgStyleTW,
  txtLayoutStyleTW,
}) => {
  return (
    <LinearGradient
      colors={["#00000000", "#296999A8", "#2ADCD8A8"]}
      className="flex-1 flex justify-end "
    >
      <View style={{ flex: 0.5 }} className="bg-[#00000042]" />
      <View
        style={{ flex: 2 }}
        className=" flex items-center justify-center    bg-[#00000042] "
      >
        <View className="  mx-4 rounded-2xl ">
          <Image
            source={{
              uri: imgUrl,
            }}
            className={clsx(imgStyleTW ? imgStyleTW : "w-3/5 aspect-[140/119]")}
          />
        </View>
        <View style={{ flex: 10 }} />
        <View
          className={clsx(
            "flex-1",
            txtLayoutStyleTW ? txtLayoutStyleTW : "px-2 w-4/5"
          )}
        >
          <Text
            className="py-4  text-center text-lg iphoneX:text-xl text-[#DEDEDE]"
            style={{ fontFamily: "BaiJamjuree-Medium", lineHeight: 24 }}
          >
            {text}
          </Text>
          {children}
        </View>
      </View>
    </LinearGradient>
  );
};

export default PermissionTaker;
