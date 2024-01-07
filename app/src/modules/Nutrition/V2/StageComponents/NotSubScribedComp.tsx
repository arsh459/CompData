import ImageWithURL from "@components/ImageWithURL";
import { View, Text } from "react-native";
const NotSubScriberComp = () => {
  return (
    <View className="mt-7 px-6">
      <View
        className="w-full flex flex-row items-center justify-between px-5  rounded-xl"
        style={{
          backgroundColor:
            "radial-gradient(103.02% 103.02% at 50% 0%, rgba(255, 185, 5, 0.20) 0%, rgba(255, 157, 41, 0.20) 54.16%, rgba(255, 123, 2, 0.20) 100%)",
        }}
      >
        <View className="mr-5 ">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Frame%201000001380_tVgPK2MZA.png?updatedAt=1701259324510",
            }}
            className={"w-9 aspect-square"}
          />
        </View>
        <View className="flex-1 ">
          <Text
            className="text-orange-300 text-sm leading-4 py-5"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            Our diet expert has received your details and will contact your
            soon.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NotSubScriberComp;
