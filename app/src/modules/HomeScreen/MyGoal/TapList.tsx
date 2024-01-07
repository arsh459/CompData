import { View, Text, Image } from "react-native";

import { downIconWhite } from "@constants/imageKitURL";
interface Props {
  textString?: string;
}
const TapList: React.FC<Props> = ({ textString }) => {
  return (
    <View className="bg-[#282831] p-2 flex-1 flex flex-row my-2 items-center mx-4 rounded-[9px]">
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/Group_694_1_UQU9A4wG2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664199816520",
        }}
        className="w-12 aspect-[48/50]"
      />
      <Text
        className="flex-1 pl-1 text-[#A5DAFF] text-sm iphoneX:text-base"
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        {textString}
      </Text>
      <Image
        source={{
          uri: downIconWhite,
        }}
        className="w-4 h-4 mr-5"
        resizeMode="contain"
      />
    </View>
  );
};

export default TapList;
