import { Image, View, Text } from "react-native";
interface Props {
  firstHeading?: string;
  secondHeading?: string;
  numberOfMotivated?: number;
}
const HeadingMotivated: React.FC<Props> = ({
  firstHeading,
  numberOfMotivated,
  secondHeading,
}) => {
  return (
    <>
      <View className="text-white">
        <View className="h-px bg-[#FFFFFF33]" />
        <Text
          className="text-xl text-left   py-4 iphoneX:text-2xl font-bold px-6 text-white "
          style={{ backgroundColor: "#11101B", fontFamily: "BaiJamjuree-Bold" }}
        >
          {firstHeading}
        </Text>
      </View>
      <View className="text-white bg-white p-2 px-6 pr-10 ">
        <View className="h-px bg-[#FFFFFF33]" />
        <View className="flex flex-row justify-between ">
          <Text
            style={{ fontFamily: "BaiJamjuree-Regular" }}
            numberOfLines={1}
            className="text-xl text-center iphoneX:text-2xl font-bold text-[#11101B]"
          >
            {secondHeading}
          </Text>
          <View className=" flex flex-row items-center">
            <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/Vector__22__cJ9BxbOok.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660655773026",
              }}
              className="aspect-square w-4 iphoneX:w-5 "
              resizeMode="contain"
            />
            <Text
              className="text-xl pl-2 iphoneX:text-2xl"
              style={{ fontFamily: "BaiJamjuree-Regular" }}
            >
              {numberOfMotivated}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default HeadingMotivated;
